'use client'
import dynamic from 'next/dynamic'

const LakeMeadViewEstatesMap = dynamic(() => import('./LakeMeadViewEstatesMap'), { ssr: false })

export default function LakeMeadViewEstatesMapWrapper() {
  return <LakeMeadViewEstatesMap />
}
