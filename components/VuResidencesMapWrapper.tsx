'use client'
import dynamic from 'next/dynamic'

const VuResidencesMap = dynamic(() => import('./VuResidencesMap'), { ssr: false })

export default function VuResidencesMapWrapper() {
  return <VuResidencesMap />
}
