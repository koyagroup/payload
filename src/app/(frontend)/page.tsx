export default function HomePage() {
  return (
    <div className="home">
      <div className="content">
        <h1>Koya Payload CMS</h1>
        <p>
          This service hosts Koya marketing content and editorial workflows at{' '}
          <a href="https://payload.koyabank.com">payload.koyabank.com</a>.
        </p>
        <a className="admin" href="/admin">
          Open Admin
        </a>
      </div>
    </div>
  )
}
