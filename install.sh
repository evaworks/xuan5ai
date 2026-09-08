#!/bin/bash

set -e

DOMAIN=${1:-"xuan5ai.com"}
EMAIL=${2:-"admin@xuan5ai.com"}
REPO=${3:-"evaworks/xuan5ai"}
VERSION=${4:-"latest"}
DOMAIN=$(echo "$DOMAIN" | sed -e 's#^https\?://##' -e 's#/.*$##')
if [[ "$DOMAIN" == www.* ]] && [[ "$(echo "$DOMAIN" | tr -cd '.' | wc -c)" -eq 2 ]]; then
    APEX="${DOMAIN#www.}"
    WWW="$DOMAIN"
elif [[ "$(echo "$DOMAIN" | tr -cd '.' | wc -c)" -eq 1 ]]; then
    APEX="$DOMAIN"
    WWW="www.$DOMAIN"
else
    APEX="$DOMAIN"
    WWW="$DOMAIN"
fi
if [ "$APEX" = "$WWW" ]; then
    SERVER_NAMES="$APEX"
    DOMAIN_ARGS="-d $APEX"
    CERT_DOMAIN="$APEX"
else
    SERVER_NAMES="$APEX $WWW"
    DOMAIN_ARGS="-d $APEX -d $WWW"
    CERT_DOMAIN="$APEX"
fi

if [ "$(id -u)" -ne 0 ]; then
   echo "请使用 sudo 或 root 运行此脚本"
   exit 1
fi

echo "========================================="
echo "  玄武科技 - 一键部署脚本"
echo "========================================="
echo ""

echo "[1/6] 安装必要软件..."
if ! command -v nginx &> /dev/null; then
    apt-get update -qq
    apt-get install -y -qq nginx certbot python3-certbot-nginx wget > /dev/null 2>&1
else
    echo "  Nginx 已安装，跳过"
fi
if ! command -v certbot &> /dev/null; then
    apt-get install -y -qq certbot python3-certbot-nginx > /dev/null 2>&1
else
    echo "  Certbot 已安装，跳过"
fi

echo "[2/6] 创建网站目录..."
mkdir -p /var/www/xuanwu
chown -R www-data:www-data /var/www/xuanwu
chmod -R 755 /var/www/xuanwu
cd /var/www/xuanwu

if [ "$VERSION" = "latest" ] || [ -z "$VERSION" ]; then
    VERSION=$(curl -sL https://api.github.com/repos/$REPO/releases/latest | grep -o '"tag_name": "[^"]*' | cut -d'"' -f4)
fi

echo "[3/6] 下载并解压 dist 文件..."
LATEST_URL="https://github.com/$REPO/releases/download/$VERSION/dist.tar.gz"
rm -rf *
wget -L -q "$LATEST_URL" -O dist.tar.gz || { echo "下载失败，请检查仓库和版本号"; exit 1; }
tar -xzf dist.tar.gz
mv dist/* .
rm -rf dist dist.tar.gz

echo "[4/6] 配置 Nginx 临时站点..."
if [ -f /etc/nginx/sites-available/xuanwu ]; then
    cp /etc/nginx/sites-available/xuanwu /etc/nginx/sites-available/xuanwu.bak.$(date +%s)
fi
rm -f /etc/nginx/sites-enabled/default
cat > /etc/nginx/sites-available/xuanwu <<EOF
server {
    listen 80;
    server_name $SERVER_NAMES;
    root /var/www/xuanwu;
    index index.html;
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/xuanwu;
        allow all;
    }
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

ln -sf /etc/nginx/sites-available/xuanwu /etc/nginx/sites-enabled/xuanwu
nginx -t && systemctl reload nginx

echo "[5/6] 配置 HTTPS 证书并更新 Nginx..."
if ! certbot certonly --webroot -w /var/www/xuanwu $DOMAIN_ARGS --cert-name "$CERT_DOMAIN" --expand --email "$EMAIL" --agree-tos --non-interactive; then
    echo "webroot 验证失败，尝试 --nginx 插件..."
    certbot --nginx $DOMAIN_ARGS --cert-name "$CERT_DOMAIN" --expand --email "$EMAIL" --agree-tos --non-interactive --redirect
fi

cat > /etc/nginx/sites-available/xuanwu <<EOF
server {
    listen 80;
    server_name $SERVER_NAMES;
    location ^~ /.well-known/acme-challenge/ {
        root /var/www/xuanwu;
        allow all;
    }
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $SERVER_NAMES;

    ssl_certificate /etc/letsencrypt/live/$CERT_DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$CERT_DOMAIN/privkey.pem;

    root /var/www/xuanwu;
    index index.html;

    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    location / {
        try_files \$uri \$uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

nginx -t && systemctl reload nginx

echo "[6/6] 配置证书自动续期..."
systemctl enable certbot.timer
systemctl start certbot.timer

echo ""
echo "========================================="
echo "  部署完成！"
echo "========================================="
echo "  域名: https://$APEX"
[ "$APEX" != "$WWW" ] && echo "  域名: https://$WWW"
echo ""