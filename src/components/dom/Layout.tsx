'use client'

import { useRef } from 'react'

const Layout = ({ children, }: {
    children: React.ReactNode;
  }) => {
  const ref = useRef()

  return (
    <div
      style={{
        position: 'relative',
        width: ' 100%',
        height: '100%',
        overflow: 'visible',
        touchAction: 'auto',
        backgroundColor: 'fff2ab',
        
      }}
    >
      {children}
    </div>
  )
}

export { Layout }