'use client'
import dynamic from 'next/dynamic'

const ValleyVistaMap = dynamic(() => import('./ValleyVistaMap'), { ssr: false })

export default function ValleyVistaMapWrapper() {
  return <ValleyVistaMap />
}
