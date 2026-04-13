'use client'
import dynamic from 'next/dynamic'

const TuscanCliffsMap = dynamic(() => import('./TuscanCliffsMap'), { ssr: false })

export default function TuscanCliffsMapWrapper() {
  return <TuscanCliffsMap />
}
