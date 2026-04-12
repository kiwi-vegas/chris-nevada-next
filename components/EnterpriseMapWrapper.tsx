'use client'
import dynamic from 'next/dynamic'

const EnterpriseMap = dynamic(() => import('./EnterpriseMap'), { ssr: false })

export default function EnterpriseMapWrapper() {
  return <EnterpriseMap />
}
