'use client'
import dynamic from 'next/dynamic'

const CadenceVillageParkMap = dynamic(() => import('./CadenceVillageParkMap'), { ssr: false })

export default function CadenceVillageParkMapWrapper() {
  return <CadenceVillageParkMap />
}
