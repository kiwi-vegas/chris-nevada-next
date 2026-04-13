'use client'
import dynamic from 'next/dynamic'

const LasVegasChinatownMap = dynamic(() => import('./LasVegasChinatownMap'), { ssr: false })

export default function LasVegasChinatownMapWrapper() {
  return <LasVegasChinatownMap />
}
