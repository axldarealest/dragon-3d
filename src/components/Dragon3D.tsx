'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { Suspense } from 'react'
import Dragon from './Dragon'
import Ground from './Ground'

export default function Dragon3D() {
  return (
    <Canvas
      camera={{ position: [0, 10, 20], fov: 60 }}
      shadows
      className="w-full h-full"
    >
      {/* Éclairage */}
      <ambientLight intensity={0.3} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Ciel */}
      <Sky sunPosition={[100, 20, 100]} />
      
      {/* Contrôles de caméra (optionnel pour debug) */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={10}
        maxDistance={50}
      />
      
      {/* Scène */}
      <Suspense fallback={null}>
        <Dragon />
        <Ground />
      </Suspense>
    </Canvas>
  )
} 