# 玄武科技官网

## 一键部署

```bash
curl -sL https://raw.githubusercontent.com/evaworks/xuan5ai/main/install.sh | sudo bash -s -- 域名
# 示例
curl -sL https://raw.githubusercontent.com/evaworks/xuan5ai/main/install.sh | sudo bash -s -- www.xuan5ai.com
```

支持自动获取最新版本。

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

3. 提交并打 tag
```bash
git add dist dist.tar.gz
git commit -m "v1.0.0"
git tag v1.0.0
git push && git push --tag
```

4. 在 GitHub Releases 页面创建新版本，上传 `dist.tar.gz`

## 开发

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```