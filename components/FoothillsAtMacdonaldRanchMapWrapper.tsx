'use client'
import dynamic from 'next/dynamic'

const FoothillsAtMacdonaldRanchMap = dynamic(() => import('./FoothillsAtMacdonaldRanchMap'), { ssr: false })

export default function FoothillsAtMacdonaldRanchMapWrapper() {
  return <FoothillsAtMacdonaldRanchMap />
}
