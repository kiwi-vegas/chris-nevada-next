'use client'
import dynamic from 'next/dynamic'

const CoronadoRanchMap = dynamic(() => import('./CoronadoRanchMap'), { ssr: false })

export default function CoronadoRanchMapWrapper() {
  return <CoronadoRanchMap />
}
