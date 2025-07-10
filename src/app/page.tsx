'use client'

import dynamic from 'next/dynamic'

// Chargement dynamique pour éviter les erreurs SSR avec Three.js
const Dragon3D = dynamic(() => import('@/components/Dragon3D'), { ssr: false })

export default function Home() {
  return (
    <main className="h-screen w-screen bg-gradient-to-b from-sky-400 via-sky-600 to-sky-800 overflow-hidden">
      <div className="absolute top-4 left-4 z-10 text-white">
        <div className="bg-black/50 p-4 rounded-lg backdrop-blur-sm">
          <h1 className="text-2xl font-bold mb-2">🐉 Dragon Contrôleur</h1>
          <div className="text-sm space-y-1">
            <p><strong>Mouvement:</strong> ZQSD ou ←↑↓→</p>
            <p><strong>Saut:</strong> Espace</p>
            <p><strong>Cracher du feu:</strong> E</p>
          </div>
        </div>
      </div>
      <Dragon3D />
    </main>
  )
}
