'use client'
import dynamic from 'next/dynamic'

const HendersonCadenceParkMap = dynamic(() => import('./HendersonCadenceParkMap'), { ssr: false })

export default function HendersonCadenceParkMapWrapper() {
  return <HendersonCadenceParkMap />
}
