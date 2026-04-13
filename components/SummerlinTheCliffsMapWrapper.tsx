'use client'
import dynamic from 'next/dynamic'

const SummerlinTheCliffsMap = dynamic(() => import('./SummerlinTheCliffsMap'), { ssr: false })

export default function SummerlinTheCliffsMapWrapper() {
  return <SummerlinTheCliffsMap />
}
