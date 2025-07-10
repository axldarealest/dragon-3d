'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import FireParticles from './FireParticles'

export default function Dragon() {
  const dragonRef = useRef<Mesh>(null)
  const [position, setPosition] = useState(new Vector3(0, 2, 0))
  const [rotation, setRotation] = useState(0)
  const [isJumping, setIsJumping] = useState(false)
  const [isBreathingFire, setIsBreathingFire] = useState(false)
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0))
  const [keys, setKeys] = useState<{ [key: string]: boolean }>({})

  // Gestion des événements clavier
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [event.code]: true }))
      
      // Cracher du feu avec E
      if (event.code === 'KeyE') {
        setIsBreathingFire(true)
        setTimeout(() => setIsBreathingFire(false), 1000) // 1 seconde de feu
      }
      
      // Saut avec Espace
      if (event.code === 'Space' && !isJumping) {
        setIsJumping(true)
        setVelocity(prev => new Vector3(prev.x, 8, prev.z))
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      setKeys(prev => ({ ...prev, [event.code]: false }))
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [isJumping])

  // Animation et physique
  useFrame((state, delta) => {
    if (!dragonRef.current) return

    const speed = 5
    const newVelocity = new Vector3(velocity.x, velocity.y, velocity.z)
    let newRotation = rotation
    let moved = false

    // Mouvement horizontal (ZQSD et flèches)
    if (keys['KeyW'] || keys['KeyZ'] || keys['ArrowUp']) {
      newVelocity.z = -speed
      newRotation = 0
      moved = true
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      newVelocity.z = speed
      newRotation = Math.PI
      moved = true
    }
    if (keys['KeyA'] || keys['KeyQ'] || keys['ArrowLeft']) {
      newVelocity.x = -speed
      newRotation = Math.PI / 2
      moved = true
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      newVelocity.x = speed
      newRotation = -Math.PI / 2
      moved = true
    }

    // Mouvements diagonaux
    if ((keys['KeyW'] || keys['KeyZ'] || keys['ArrowUp']) && (keys['KeyA'] || keys['KeyQ'] || keys['ArrowLeft'])) {
      newRotation = Math.PI / 4
    }
    if ((keys['KeyW'] || keys['KeyZ'] || keys['ArrowUp']) && (keys['KeyD'] || keys['ArrowRight'])) {
      newRotation = -Math.PI / 4
    }
    if ((keys['KeyS'] || keys['ArrowDown']) && (keys['KeyA'] || keys['KeyQ'] || keys['ArrowLeft'])) {
      newRotation = 3 * Math.PI / 4
    }
    if ((keys['KeyS'] || keys['ArrowDown']) && (keys['KeyD'] || keys['ArrowRight'])) {
      newRotation = -3 * Math.PI / 4
    }

    // Si aucun mouvement horizontal, arrêter
    if (!moved) {
      newVelocity.x = 0
      newVelocity.z = 0
    }

    // Gravité
    if (position.y > 2 || newVelocity.y > 0) {
      newVelocity.y -= 20 * delta // gravité
    } else {
      newVelocity.y = 0
      setIsJumping(false)
    }

    // Mise à jour position
    const newPosition = position.clone()
    newPosition.x += newVelocity.x * delta
    newPosition.y += newVelocity.y * delta
    newPosition.z += newVelocity.z * delta

    // Limites du sol
    if (newPosition.y < 2) {
      newPosition.y = 2
      newVelocity.y = 0
      setIsJumping(false)
    }

    // Limites de la carte
    newPosition.x = Math.max(-20, Math.min(20, newPosition.x))
    newPosition.z = Math.max(-20, Math.min(20, newPosition.z))

    // Appliquer les changements
    setPosition(newPosition)
    setVelocity(newVelocity)
    setRotation(newRotation)

    // Appliquer à l'objet 3D
    dragonRef.current.position.copy(newPosition)
    dragonRef.current.rotation.y = newRotation

    // Animation de vol
    dragonRef.current.position.y += Math.sin(state.clock.elapsedTime * 2) * 0.1
  })

  return (
    <group>
      {/* Corps du dragon */}
      <mesh ref={dragonRef} castShadow receiveShadow>
        {/* Corps principal */}
        <group>
          {/* Corps */}
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 1, 3]} />
            <meshStandardMaterial color="#4a5c4a" />
          </mesh>
          
          {/* Tête */}
          <mesh position={[0, 0.5, -2]}>
            <boxGeometry args={[1.2, 1.2, 1.5]} />
            <meshStandardMaterial color="#5a6c5a" />
          </mesh>
          
          {/* Yeux */}
          <mesh position={[-0.3, 0.7, -2.5]}>
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0.3, 0.7, -2.5]}>
            <sphereGeometry args={[0.15]} />
            <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={0.5} />
          </mesh>
          
          {/* Queue */}
          <mesh position={[0, 0, 2]}>
            <boxGeometry args={[0.8, 0.8, 2]} />
            <meshStandardMaterial color="#3a4c3a" />
          </mesh>
          
          {/* Ailes */}
          <mesh position={[-1.5, 0.5, 0]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[2, 0.1, 2]} />
            <meshStandardMaterial color="#2a3c2a" />
          </mesh>
          <mesh position={[1.5, 0.5, 0]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[2, 0.1, 2]} />
            <meshStandardMaterial color="#2a3c2a" />
          </mesh>
          
          {/* Pattes */}
          <mesh position={[-0.5, -0.8, -1]}>
            <boxGeometry args={[0.3, 0.8, 0.3]} />
            <meshStandardMaterial color="#3a4c3a" />
          </mesh>
          <mesh position={[0.5, -0.8, -1]}>
            <boxGeometry args={[0.3, 0.8, 0.3]} />
            <meshStandardMaterial color="#3a4c3a" />
          </mesh>
          <mesh position={[-0.5, -0.8, 1]}>
            <boxGeometry args={[0.3, 0.8, 0.3]} />
            <meshStandardMaterial color="#3a4c3a" />
          </mesh>
          <mesh position={[0.5, -0.8, 1]}>
            <boxGeometry args={[0.3, 0.8, 0.3]} />
            <meshStandardMaterial color="#3a4c3a" />
          </mesh>
        </group>
      </mesh>
      
      {/* Particules de feu */}
      {isBreathingFire && (
        <FireParticles 
          position={[position.x, position.y + 0.5, position.z - 2.5]} 
          rotation={rotation}
        />
      )}
    </group>
  )
} 