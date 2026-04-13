'use client'
import dynamic from 'next/dynamic'

const JuhlMap = dynamic(() => import('./JuhlMap'), { ssr: false })

export default function JuhlMapWrapper() {
  return <JuhlMap />
}
