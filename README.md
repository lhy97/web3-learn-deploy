# React + Cloudflare Pages

这是一个最小可部署的 React + Vite 工程。

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建产物在 `dist/`。

## 部署到 Cloudflare Pages

### 方式 1：控制台导入 Git 仓库

在 Cloudflare Pages 新建项目时填写：

- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`

### 方式 2：本地构建后用 Wrangler 发布

```bash
npm install
npm run build
npm install -D wrangler
npx wrangler pages deploy dist
```

## SPA 路由说明

`public/_redirects` 已包含：

```text
/* /index.html 200
```

这会让 Cloudflare Pages 在前端路由场景下回退到 `index.html`。
