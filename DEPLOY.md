# 玄武科技官网部署指南

## 一键部署

在服务器上执行以下命令即可完成全部部署：

```bash
sudo bash -c "$(curl -sL https://raw.githubusercontent.com/evaworks/xuan5ai/main/install.sh)"
```

> 需要 root 权限

---

## 部署内容

- Nginx Web 服务器
- HTTPS 证书（Let's Encrypt）
- 证书自动续期
- 静态网站文件

---

## 发布新版本

1. 本地构建
```bash
npm run build
```

2. 打包
```bash
cd dist
tar -czf dist.tar.gz *
```

3. 在 GitHub Releases 页面创建新版本，上传 `dist.tar.gz`

---

## 访问

部署完成后访问：https://xuan5ai.com