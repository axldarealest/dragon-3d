'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points } from 'three'
import * as THREE from 'three'

interface FireParticlesProps {
  position: [number, number, number]
  rotation: number
}

export default function FireParticles({ position, rotation }: FireParticlesProps) {
  const pointsRef = useRef<Points>(null)
  
  // Création des particules
  const particles = useMemo(() => {
    const count = 100
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const sizes = new Float32Array(count)
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      
      // Positions initiales (en forme de cône depuis la bouche du dragon)
      positions[i3] = (Math.random() - 0.5) * 0.5
      positions[i3 + 1] = Math.random() * 0.5
      positions[i3 + 2] = -Math.random() * 3
      
      // Couleurs (rouge-orange-jaune)
      const heat = Math.random()
      colors[i3] = 1 // Rouge
      colors[i3 + 1] = heat * 0.8 // Vert
      colors[i3 + 2] = heat * 0.2 // Bleu
      
      // Tailles
      sizes[i] = Math.random() * 0.3 + 0.1
    }
    
    return { positions, colors, sizes, count }
  }, [])
  
  // Animation des particules
  useFrame((state, delta) => {
    if (!pointsRef.current) return
    
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array
    const colors = pointsRef.current.geometry.attributes.color.array as Float32Array
    
    for (let i = 0; i < particles.count; i++) {
      const i3 = i * 3
      
      // Mouvement vers l'avant avec dispersion
      positions[i3] += (Math.random() - 0.5) * delta * 2
      positions[i3 + 1] += Math.random() * delta * 5
      positions[i3 + 2] -= delta * 8
      
      // Réinitialiser les particules qui sont trop loin
      if (positions[i3 + 2] < -5) {
        positions[i3] = (Math.random() - 0.5) * 0.5
        positions[i3 + 1] = Math.random() * 0.5
        positions[i3 + 2] = 0
      }
      
      // Faire disparaître les particules progressivement
      const distance = Math.abs(positions[i3 + 2])
      const alpha = Math.max(0, 1 - distance / 5)
      colors[i3] = alpha
      colors[i3 + 1] = alpha * Math.random() * 0.8
      colors[i3 + 2] = alpha * Math.random() * 0.2
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.geometry.attributes.color.needsUpdate = true
  })
  
  return (
    <points 
      ref={pointsRef} 
      position={position}
      rotation={[0, rotation, 0]}
    >
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particles.positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[particles.colors, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[particles.sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.3}
        sizeAttenuation={true}
        vertexColors={true}
        transparent={true}
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
} 