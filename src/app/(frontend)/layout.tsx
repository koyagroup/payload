import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Koya Payload CMS service at payload.koyabank.com',
  title: 'Koya CMS | payload.koyabank.com',
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
