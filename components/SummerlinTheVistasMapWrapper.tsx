'use client'
import dynamic from 'next/dynamic'

const SummerlinTheVistasMap = dynamic(() => import('./SummerlinTheVistasMap'), { ssr: false })

export default function SummerlinTheVistasMapWrapper() {
  return <SummerlinTheVistasMap />
}
