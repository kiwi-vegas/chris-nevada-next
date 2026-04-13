'use client'
import dynamic from 'next/dynamic'

const NewportLoftsMap = dynamic(() => import('./NewportLoftsMap'), { ssr: false })

export default function NewportLoftsMapWrapper() {
  return <NewportLoftsMap />
}
