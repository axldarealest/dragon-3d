'use client'

import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import FireParticles from './FireParticles'

export default function Dragon() {
  const dragonRef = useRef<Mesh>(null)
  const { camera } = useThree()
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
        setTimeout(() => setIsBreathingFire(false), 1500)
      }
      
      // Saut avec Espace
      if (event.code === 'Space' && !isJumping) {
        setIsJumping(true)
        setVelocity(prev => new Vector3(prev.x, 10, prev.z))
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

  // Animation avec contrôles adaptatifs
  useFrame((state, delta) => {
    if (!dragonRef.current) return

    const speed = 8
    const newVelocity = new Vector3(velocity.x, velocity.y, velocity.z)
    let moved = false

    // Calcul des directions relatives à la caméra
    const cameraDirection = new Vector3()
    camera.getWorldDirection(cameraDirection)
    cameraDirection.y = 0
    cameraDirection.normalize()

    const cameraRight = new Vector3()
    cameraRight.crossVectors(cameraDirection, new Vector3(0, 1, 0))
    cameraRight.normalize()

    const movementVector = new Vector3(0, 0, 0)

    // Mouvement adaptatif selon la caméra
    if (keys['KeyW'] || keys['KeyZ'] || keys['ArrowUp']) {
      movementVector.add(cameraDirection)
      moved = true
    }
    if (keys['KeyS'] || keys['ArrowDown']) {
      movementVector.sub(cameraDirection)
      moved = true
    }
    if (keys['KeyA'] || keys['KeyQ'] || keys['ArrowLeft']) {
      movementVector.sub(cameraRight)
      moved = true
    }
    if (keys['KeyD'] || keys['ArrowRight']) {
      movementVector.add(cameraRight)
      moved = true
    }

    // Appliquer le mouvement
    if (moved) {
      movementVector.normalize()
      newVelocity.x = movementVector.x * speed
      newVelocity.z = movementVector.z * speed
      
      const targetRotation = Math.atan2(-movementVector.x, -movementVector.z)
      setRotation(targetRotation)
    } else {
      newVelocity.x = 0
      newVelocity.z = 0
    }

    // Gravité
    if (position.y > 2 || newVelocity.y > 0) {
      newVelocity.y -= 25 * delta
    } else {
      newVelocity.y = 0
      setIsJumping(false)
    }

    // Mise à jour position
    const newPosition = position.clone()
    newPosition.x += newVelocity.x * delta
    newPosition.y += newVelocity.y * delta
    newPosition.z += newVelocity.z * delta

    // Limites
    if (newPosition.y < 2) {
      newPosition.y = 2
      newVelocity.y = 0
      setIsJumping(false)
    }

    newPosition.x = Math.max(-30, Math.min(30, newPosition.x))
    newPosition.z = Math.max(-30, Math.min(30, newPosition.z))

    setPosition(newPosition)
    setVelocity(newVelocity)

    // Appliquer à l'objet 3D
    dragonRef.current.position.copy(newPosition)
    dragonRef.current.rotation.y = rotation

    // Animation de vol
    const time = state.clock.elapsedTime
    dragonRef.current.position.y += Math.sin(time * 3) * 0.1
  })

  return (
    <group>
      {/* Dragon amélioré mais stable */}
      <mesh ref={dragonRef} castShadow receiveShadow>
        <group>
          {/* Corps principal */}
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[1.2, 16, 12]} />
            <meshStandardMaterial color="#2d4a2d" roughness={0.8} />
          </mesh>
          
          {/* Tête */}
          <mesh position={[0, 0.3, -2]}>
            <sphereGeometry args={[0.8, 12, 10]} />
            <meshStandardMaterial color="#3d5a3d" roughness={0.7} />
          </mesh>
          
          {/* Yeux */}
          <mesh position={[-0.3, 0.4, -2.5]}>
            <sphereGeometry args={[0.15, 8, 6]} />
            <meshStandardMaterial color="#ff3300" emissive="#ff1100" emissiveIntensity={0.6} />
          </mesh>
          <mesh position={[0.3, 0.4, -2.5]}>
            <sphereGeometry args={[0.15, 8, 6]} />
            <meshStandardMaterial color="#ff3300" emissive="#ff1100" emissiveIntensity={0.6} />
          </mesh>
          
          {/* Ailes */}
          <mesh position={[-1.5, 0.5, 0]} rotation={[0, 0, -0.3]}>
            <planeGeometry args={[2.5, 2]} />
            <meshStandardMaterial color="#1a2a1a" transparent opacity={0.9} side={2} />
          </mesh>
          <mesh position={[1.5, 0.5, 0]} rotation={[0, 0, 0.3]}>
            <planeGeometry args={[2.5, 2]} />
            <meshStandardMaterial color="#1a2a1a" transparent opacity={0.9} side={2} />
          </mesh>
          
          {/* Queue */}
          <mesh position={[0, 0, 2.5]}>
            <cylinderGeometry args={[0.2, 0.5, 2, 8]} />
            <meshStandardMaterial color="#1d3a1d" />
          </mesh>
          
          {/* Pattes */}
          <mesh position={[-0.5, -0.8, -0.8]}>
            <cylinderGeometry args={[0.1, 0.15, 0.8, 6]} />
            <meshStandardMaterial color="#2d4a2d" />
          </mesh>
          <mesh position={[0.5, -0.8, -0.8]}>
            <cylinderGeometry args={[0.1, 0.15, 0.8, 6]} />
            <meshStandardMaterial color="#2d4a2d" />
          </mesh>
          <mesh position={[-0.5, -0.8, 0.8]}>
            <cylinderGeometry args={[0.1, 0.15, 0.8, 6]} />
            <meshStandardMaterial color="#2d4a2d" />
          </mesh>
          <mesh position={[0.5, -0.8, 0.8]}>
            <cylinderGeometry args={[0.1, 0.15, 0.8, 6]} />
            <meshStandardMaterial color="#2d4a2d" />
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