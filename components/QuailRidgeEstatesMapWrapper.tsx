'use client'
import dynamic from 'next/dynamic'

const QuailRidgeEstatesMap = dynamic(() => import('./QuailRidgeEstatesMap'), { ssr: false })

export default function QuailRidgeEstatesMapWrapper() {
  return <QuailRidgeEstatesMap />
}
