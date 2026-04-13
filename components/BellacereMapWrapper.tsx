'use client'
import dynamic from 'next/dynamic'

const BellacereMap = dynamic(() => import('./BellacereMap'), { ssr: false })

export default function BellacereMapWrapper() {
  return <BellacereMap />
}
