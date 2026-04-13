'use client'
import dynamic from 'next/dynamic'

const SevenHillsTerracinaMap = dynamic(() => import('./SevenHillsTerracinaMap'), { ssr: false })

export default function SevenHillsTerracinaMapWrapper() {
  return <SevenHillsTerracinaMap />
}
