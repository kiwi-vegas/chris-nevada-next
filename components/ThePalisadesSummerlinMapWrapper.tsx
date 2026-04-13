'use client'
import dynamic from 'next/dynamic'

const ThePalisadesSummerlinMap = dynamic(() => import('./ThePalisadesSummerlinMap'), { ssr: false })

export default function ThePalisadesSummerlinMapWrapper() {
  return <ThePalisadesSummerlinMap />
}
