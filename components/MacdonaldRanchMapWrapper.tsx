'use client'
import dynamic from 'next/dynamic'

const MacdonaldRanchMap = dynamic(() => import('./MacdonaldRanchMap'), { ssr: false })

export default function MacdonaldRanchMapWrapper() {
  return <MacdonaldRanchMap />
}
