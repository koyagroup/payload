import React from 'react'
import './styles.css'

export const metadata = {
  description: 'Koya Payload CMS service',
  title: 'Koya CMS',
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
