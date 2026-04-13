'use client'
import dynamic from 'next/dynamic'

const WaldorfAstoriaLasVegasMap = dynamic(() => import('./WaldorfAstoriaLasVegasMap'), { ssr: false })

export default function WaldorfAstoriaLasVegasMapWrapper() {
  return <WaldorfAstoriaLasVegasMap />
}
