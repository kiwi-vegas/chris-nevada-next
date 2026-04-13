'use client'
import dynamic from 'next/dynamic'

const MountainTrailsSummerlinMap = dynamic(() => import('./MountainTrailsSummerlinMap'), { ssr: false })

export default function MountainTrailsSummerlinMapWrapper() {
  return <MountainTrailsSummerlinMap />
}
