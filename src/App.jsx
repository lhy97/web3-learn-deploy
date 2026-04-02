export default function App() {
  return (
    <main className="page">
      <section className="card">
        <p className="eyebrow">Cloudflare Pages</p>
        <h1>简单 React 工程已就绪</h1>
        <p className="description">
          这是一个使用 Vite 构建的最小 React 项目，构建产物输出到
          <code>dist</code>，可以直接部署到 Cloudflare Pages。
        </p>
        <div className="actions">
          <a href="https://pages.cloudflare.com/" target="_blank" rel="noreferrer">
            打开 Pages 控制台
          </a>
          <a href="https://developers.cloudflare.com/pages/" target="_blank" rel="noreferrer">
            查看文档
          </a>
        </div>
      </section>
    </main>
  )
}
