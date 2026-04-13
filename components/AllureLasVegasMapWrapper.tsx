'use client'
import dynamic from 'next/dynamic'

const AllureLasVegasMap = dynamic(() => import('./AllureLasVegasMap'), { ssr: false })

export default function AllureLasVegasMapWrapper() {
  return <AllureLasVegasMap />
}
