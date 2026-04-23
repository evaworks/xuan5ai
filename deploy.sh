#!/bin/bash

set -e

echo "========================================="
echo "  玄武科技 - 一键部署脚本"
echo "========================================="
echo ""

DOMAIN=${1:-"xuanwu.example.com"}
EMAIL=${2:-"admin@xuanwu.example.com"}
GIT_REPO=${3:-""}
PORT=${4:-5173}

echo "[1/6] 安装必要软件..."
apt-get update -qq
apt-get install -y -qq nginx certbot python3-certbot-nginx git > /dev/null 2>&1

echo "[2/6] 创建网站目录..."
mkdir -p /var/www/xuanwu
cd /var/www/xuanwu

echo "[3/6] 拉取代码..."
if [ -n "$GIT_REPO" ]; then
    if [ -d ".git" ]; then
        git pull
    else
        git clone "$GIT_REPO" .
    fi
    npm install
    npm run build
else
    echo "  未指定仓库，请在 /var/www/xuanwu 手动放置网站代码"
fi

echo "[4/6] 配置 Nginx..."
cat > /etc/nginx/sites-available/xuanwu <<EOF
server {
    listen 80;
    server_name $DOMAIN;

    root /var/www/xuanwu/dist;
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

ln -sf /etc/nginx/sites-available/xuanwu /etc/nginx/sites-enabled/xuanwu
rm -f /etc/nginx/sites-enabled/default
nginx -t && systemctl reload nginx

echo "[5/6] 配置 HTTPS 证书..."
certbot --nginx -d "$DOMAIN" --email "$EMAIL" --agree-tos --non-interactive --redirect

echo "[6/6] 配置自动续期..."
systemctl enable certbot.timer
systemctl start certbot.timer

echo ""
echo "========================================="
echo "  部署完成！"
echo "========================================="
echo "  域名: https://$DOMAIN"
echo "  代码: /var/www/xuanwu"
echo "  证书: 自动续期"
echo ""