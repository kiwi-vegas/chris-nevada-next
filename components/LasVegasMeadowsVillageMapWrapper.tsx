'use client'
import dynamic from 'next/dynamic'

const LasVegasMeadowsVillageMap = dynamic(() => import('./LasVegasMeadowsVillageMap'), { ssr: false })

export default function LasVegasMeadowsVillageMapWrapper() {
  return <LasVegasMeadowsVillageMap />
}
