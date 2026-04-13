'use client'
import dynamic from 'next/dynamic'

const SummerlinLaMadrePeaksMap = dynamic(() => import('./SummerlinLaMadrePeaksMap'), { ssr: false })

export default function SummerlinLaMadrePeaksMapWrapper() {
  return <SummerlinLaMadrePeaksMap />
}
