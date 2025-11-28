'use client'

import React from 'react'

export const Logo: React.FC = () => {
  return (
    <picture>
      <source srcSet="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg" />
      <img
        alt="Payload Logo"
        height="65"
        src="https://raw.githubusercontent.com/payloadcms/payload/main/packages/ui/src/assets/payload-favicon.svg"
        width="65"
      />
    </picture>
  )
}
