'use client'
import dynamic from 'next/dynamic'

const SummerlinSienaMap = dynamic(() => import('./SummerlinSienaMap'), { ssr: false })

export default function SummerlinSienaMapWrapper() {
  return <SummerlinSienaMap />
}
