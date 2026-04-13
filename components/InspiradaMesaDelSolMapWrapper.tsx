'use client'
import dynamic from 'next/dynamic'

const InspiradaMesaDelSolMap = dynamic(() => import('./InspiradaMesaDelSolMap'), { ssr: false })

export default function InspiradaMesaDelSolMapWrapper() {
  return <InspiradaMesaDelSolMap />
}
