'use client'

import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Group } from 'three'

interface FireParticlesProps {
  position: [number, number, number]
  rotation: number
}

export default function FireParticles({ position, rotation }: FireParticlesProps) {
  const groupRef = useRef<Group>(null)
  const flame1Ref = useRef<Mesh>(null)
  const flame2Ref = useRef<Mesh>(null)
  const flame3Ref = useRef<Mesh>(null)
  const smokeRef = useRef<Mesh>(null)
  
  // Animation simple et stable
  useFrame((state) => {
    if (!groupRef.current) return
    
    const time = state.clock.elapsedTime * 3
    
    // Animation des flammes principales
    if (flame1Ref.current) {
      flame1Ref.current.scale.y = 1 + Math.sin(time) * 0.3
      flame1Ref.current.scale.x = 0.8 + Math.sin(time * 1.5) * 0.2
      flame1Ref.current.position.y = 0.5 + Math.sin(time * 2) * 0.1
    }
    
    if (flame2Ref.current) {
      flame2Ref.current.scale.y = 1 + Math.sin(time + 1) * 0.4
      flame2Ref.current.scale.x = 0.6 + Math.sin(time * 1.2 + 1) * 0.2
      flame2Ref.current.position.y = 0.8 + Math.sin(time * 2.5 + 1) * 0.1
    }
    
    if (flame3Ref.current) {
      flame3Ref.current.scale.y = 1 + Math.sin(time + 2) * 0.3
      flame3Ref.current.scale.x = 0.4 + Math.sin(time * 1.8 + 2) * 0.15
      flame3Ref.current.position.y = 1.1 + Math.sin(time * 3 + 2) * 0.08
    }
    
    // Animation de la fumée
    if (smokeRef.current) {
      smokeRef.current.scale.x = 1.2 + Math.sin(time * 0.5) * 0.3
      smokeRef.current.scale.z = 1.2 + Math.sin(time * 0.7) * 0.3
      smokeRef.current.position.y = 1.5 + Math.sin(time * 0.8) * 0.2
      smokeRef.current.rotation.y = time * 0.2
    }
    
    // Rotation générale du feu
    groupRef.current.rotation.y = Math.sin(time * 0.3) * 0.1
  })

  return (
    <group ref={groupRef} position={position} rotation={[0, rotation, 0]}>
      {/* Flamme principale - Rouge/Orange */}
      <mesh ref={flame1Ref} position={[0, 0.5, -1]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshStandardMaterial
          color="#ff4400"
          emissive="#ff2200"
          emissiveIntensity={0.8}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Flamme moyenne - Orange/Jaune */}
      <mesh ref={flame2Ref} position={[0, 0.8, -1.2]}>
        <sphereGeometry args={[0.25, 8, 8]} />
        <meshStandardMaterial
          color="#ff8800"
          emissive="#ff6600"
          emissiveIntensity={0.9}
          transparent
          opacity={0.7}
        />
      </mesh>
      
      {/* Flamme haute - Jaune */}
      <mesh ref={flame3Ref} position={[0, 1.1, -1.4]}>
        <sphereGeometry args={[0.15, 6, 6]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ff8800"
          emissiveIntensity={1}
          transparent
          opacity={0.6}
        />
      </mesh>
      
      {/* Fumée */}
      <mesh ref={smokeRef} position={[0, 1.5, -1.8]}>
        <sphereGeometry args={[0.4, 8, 6]} />
        <meshStandardMaterial
          color="#444444"
          transparent
          opacity={0.3}
        />
      </mesh>
      
      {/* Lueur centrale */}
      <mesh position={[0, 0.3, -0.8]}>
        <sphereGeometry args={[0.4, 12, 8]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff4400"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
        />
      </mesh>
      
      {/* Étincelles fixes */}
      <mesh position={[0.2, 0.8, -1.2]}>
        <sphereGeometry args={[0.02]} />
        <meshStandardMaterial
          color="#ffcc00"
          emissive="#ff9900"
          emissiveIntensity={1}
        />
      </mesh>
      
      <mesh position={[-0.15, 1.2, -1.1]}>
        <sphereGeometry args={[0.015]} />
        <meshStandardMaterial
          color="#ffaa00"
          emissive="#ff7700"
          emissiveIntensity={1}
        />
      </mesh>
      
      <mesh position={[0.1, 0.6, -0.9]}>
        <sphereGeometry args={[0.025]} />
        <meshStandardMaterial
          color="#ffdd00"
          emissive="#ffaa00"
          emissiveIntensity={1}
        />
      </mesh>
      
      {/* Chaleur distordue (effet visuel) */}
      <mesh position={[0, 0.7, -1.5]}>
        <planeGeometry args={[0.8, 1.5]} />
        <meshStandardMaterial
          color="#ff0000"
          transparent
          opacity={0.1}
          side={2}
        />
      </mesh>
    </group>
  )
} 