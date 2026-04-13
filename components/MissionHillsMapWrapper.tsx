'use client'
import dynamic from 'next/dynamic'

const MissionHillsMap = dynamic(() => import('./MissionHillsMap'), { ssr: false })

export default function MissionHillsMapWrapper() {
  return <MissionHillsMap />
}
