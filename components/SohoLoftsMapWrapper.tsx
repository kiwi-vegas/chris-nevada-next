'use client'
import dynamic from 'next/dynamic'

const SohoLoftsMap = dynamic(() => import('./SohoLoftsMap'), { ssr: false })

export default function SohoLoftsMapWrapper() {
  return <SohoLoftsMap />
}
