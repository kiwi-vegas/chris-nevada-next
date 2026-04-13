'use client'
import dynamic from 'next/dynamic'

const OlympiaRidgeMap = dynamic(() => import('./OlympiaRidgeMap'), { ssr: false })

export default function OlympiaRidgeMapWrapper() {
  return <OlympiaRidgeMap />
}
