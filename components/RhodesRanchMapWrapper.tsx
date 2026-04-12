'use client'
import dynamic from 'next/dynamic'

const RhodesRanchMap = dynamic(() => import('./RhodesRanchMap'), { ssr: false })

export default function RhodesRanchMapWrapper() {
  return <RhodesRanchMap />
}
