'use client'
import dynamic from 'next/dynamic'

const Scotch80sMap = dynamic(() => import('./Scotch80sMap'), { ssr: false })

export default function Scotch80sMapWrapper() {
  return <Scotch80sMap />
}
