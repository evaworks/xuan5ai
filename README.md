# 玄武科技官网

## 一键部署

```bash
curl -sL https://raw.githubusercontent.com/evaworks/xuan5ai/main/install.sh | sudo bash
```

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

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```