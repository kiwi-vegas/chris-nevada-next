'use client'
import dynamic from 'next/dynamic'

const LasVegasTheLakesSouthMap = dynamic(() => import('./LasVegasTheLakesSouthMap'), { ssr: false })

export default function LasVegasTheLakesSouthMapWrapper() {
  return <LasVegasTheLakesSouthMap />
}
