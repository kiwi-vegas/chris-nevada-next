'use client'
import dynamic from 'next/dynamic'

const CalicoRidgeMap = dynamic(() => import('./CalicoRidgeMap'), { ssr: false })

export default function CalicoRidgeMapWrapper() {
  return <CalicoRidgeMap />
}
