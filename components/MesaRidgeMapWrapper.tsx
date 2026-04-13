'use client'
import dynamic from 'next/dynamic'

const MesaRidgeMap = dynamic(() => import('./MesaRidgeMap'), { ssr: false })

export default function MesaRidgeMapWrapper() {
  return <MesaRidgeMap />
}
