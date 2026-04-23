#!/bin/bash

set -e

DOMAIN=${1:-"xuan5ai.com"}
EMAIL=${2:-"admin@xuan5ai.com"}
REPO=${3:-"evaworks/xuan5ai"}
VERSION=${4:-"latest"}

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
cd /var/www/xuanwu

echo "[3/6] 下载并解压 dist 文件..."
LATEST_URL="https://github.com/$REPO/releases/download/$VERSION/dist.tar.gz"
wget -q "$LATEST_URL" -O dist.tar.gz
tar -xzf dist.tar.gz --strip-components=1
rm -f dist.tar.gz

echo "[4/6] 配置 Nginx 临时站点..."
cat > /etc/nginx/sites-available/xuanwu <<EOF
server {
    listen 80;
    server_name $DOMAIN;
    root /var/www/xuanwu;
    index index.html;
    location / {
        try_files \$uri \$uri/ /index.html;
    }
}
EOF

ln -sf /etc/nginx/sites-available/xuanwu /etc/nginx/sites-enabled/xuanwu
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "[5/6] 配置 HTTPS 证书并更新 Nginx..."
certbot certonly --webroot -w /var/www/xuanwu -d "$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive

cat > /etc/nginx/sites-available/xuanwu <<EOF
server {
    listen 80;
    server_name $DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;

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
echo "  域名: https://$DOMAIN"
echo ""