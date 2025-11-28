import React from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  description: 'Event management platform admin panel',
  title: 'IDC admin panel',
  keywords: ['event', 'management', 'admin', 'panel'],
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}
