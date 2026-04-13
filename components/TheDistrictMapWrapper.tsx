'use client'
import dynamic from 'next/dynamic'

const TheDistrictMap = dynamic(() => import('./TheDistrictMap'), { ssr: false })

export default function TheDistrictMapWrapper() {
  return <TheDistrictMap />
}
