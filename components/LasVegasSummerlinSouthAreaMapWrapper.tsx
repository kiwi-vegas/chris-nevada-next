'use client'
import dynamic from 'next/dynamic'

const LasVegasSummerlinSouthAreaMap = dynamic(() => import('./LasVegasSummerlinSouthAreaMap'), { ssr: false })

export default function LasVegasSummerlinSouthAreaMapWrapper() {
  return <LasVegasSummerlinSouthAreaMap />
}
