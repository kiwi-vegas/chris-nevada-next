'use client'
import dynamic from 'next/dynamic'

const TournamentHillsMap = dynamic(() => import('./TournamentHillsMap'), { ssr: false })

export default function TournamentHillsMapWrapper() {
  return <TournamentHillsMap />
}
