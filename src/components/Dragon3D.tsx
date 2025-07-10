'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Sky, Stars } from '@react-three/drei'
import { Suspense } from 'react'
import Dragon from './Dragon'
import Ground from './Ground'

export default function Dragon3D() {
  return (
    <Canvas
      camera={{ position: [0, 12, 20], fov: 65 }}
      shadows
      className="w-full h-full"
    >
      {/* Étoiles */}
      <Stars 
        radius={100} 
        depth={50} 
        count={2000} 
        factor={4} 
        saturation={0.5} 
        fade 
        speed={0.5}
      />
      
      {/* Éclairage amélioré */}
      <ambientLight intensity={0.25} color="#4a6a5a" />
      
      {/* Lumière principale */}
      <directionalLight
        position={[15, 20, 10]}
        intensity={1}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        color="#fff8e1"
      />
      
      {/* Lumière d'ambiance */}
      <directionalLight
        position={[-10, 15, -8]}
        intensity={0.3}
        color="#87ceeb"
        castShadow={false}
      />
      
      {/* Lumière ponctuelle dorée */}
      <pointLight
        position={[0, 8, 0]}
        intensity={0.4}
        distance={25}
        decay={2}
        color="#ffd700"
      />
      
      {/* Ciel */}
      <Sky 
        sunPosition={[15, 8, 10]} 
        inclination={0.6}
        azimuth={0.25}
        turbidity={2}
      />
      
      {/* Contrôles de caméra */}
      <OrbitControls 
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={8}
        maxDistance={60}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 1.8}
        dampingFactor={0.05}
        enableDamping={true}
        target={[0, 4, 0]}
      />
      
      {/* Scène */}
      <Suspense fallback={null}>
        <Dragon />
        <Ground />
      </Suspense>
    </Canvas>
  )
} 