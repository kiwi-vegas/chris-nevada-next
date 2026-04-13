'use client'
import dynamic from 'next/dynamic'

const TheLakesMap = dynamic(() => import('./TheLakesMap'), { ssr: false })

export default function TheLakesMapWrapper() {
  return <TheLakesMap />
}
