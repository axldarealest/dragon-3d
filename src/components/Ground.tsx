'use client'

export default function Ground() {
  return (
    <group>
      {/* Sol principal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#4a6a3a" roughness={0.9} />
      </mesh>
      
      {/* Lac central */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-5, 0.1, -5]} receiveShadow>
        <circleGeometry args={[6, 32]} />
        <meshStandardMaterial 
          color="#2a4a6a" 
          transparent
          opacity={0.8}
          roughness={0.1}
          metalness={0.3}
        />
      </mesh>
      
      {/* Rochers décoratifs */}
      <mesh position={[8, 0.5, 8]} castShadow>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshStandardMaterial color="#555" roughness={0.9} />
      </mesh>
      
      <mesh position={[-12, 0.4, 6]} castShadow>
        <sphereGeometry args={[0.6, 8, 6]} />
        <meshStandardMaterial color="#666" roughness={0.9} />
      </mesh>
      
      <mesh position={[15, 0.6, -12]} castShadow>
        <sphereGeometry args={[0.9, 8, 6]} />
        <meshStandardMaterial color="#444" roughness={0.9} />
      </mesh>
      
      <mesh position={[-8, 0.3, -15]} castShadow>
        <sphereGeometry args={[0.5, 8, 6]} />
        <meshStandardMaterial color="#777" roughness={0.9} />
      </mesh>
      
      {/* Arbres - Chênes */}
      <group position={[12, 0, 15]}>
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.3, 2.4]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        <mesh position={[0, 2.8, 0]} castShadow>
          <sphereGeometry args={[1.4]} />
          <meshStandardMaterial color="#2d5016" />
        </mesh>
      </group>
      
      <group position={[-18, 0, 12]}>
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.25, 2]} />
          <meshStandardMaterial color="#5a4738" />
        </mesh>
        <mesh position={[0, 2.5, 0]} castShadow>
          <sphereGeometry args={[1.2]} />
          <meshStandardMaterial color="#3d6016" />
        </mesh>
      </group>
      
      <group position={[20, 0, -8]}>
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.22, 1.6]} />
          <meshStandardMaterial color="#3a2718" />
        </mesh>
        <mesh position={[0, 2, 0]} castShadow>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color="#1d4016" />
        </mesh>
      </group>
      
      {/* Pins */}
      <group position={[-15, 0, -18]}>
        <mesh position={[0, 1.5, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 3]} />
          <meshStandardMaterial color="#3a2a1a" />
        </mesh>
        <mesh position={[0, 2.5, 0]} castShadow>
          <coneGeometry args={[1, 1.5, 8]} />
          <meshStandardMaterial color="#1a3a1a" />
        </mesh>
        <mesh position={[0, 3.2, 0]} castShadow>
          <coneGeometry args={[0.8, 1.2, 8]} />
          <meshStandardMaterial color="#1a3a1a" />
        </mesh>
      </group>
      
      <group position={[25, 0, 18]}>
        <mesh position={[0, 1.8, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.28, 3.6]} />
          <meshStandardMaterial color="#4a3a2a" />
        </mesh>
        <mesh position={[0, 3, 0]} castShadow>
          <coneGeometry args={[1.2, 1.8, 8]} />
          <meshStandardMaterial color="#2a4a2a" />
        </mesh>
        <mesh position={[0, 4, 0]} castShadow>
          <coneGeometry args={[0.9, 1.4, 8]} />
          <meshStandardMaterial color="#2a4a2a" />
        </mesh>
      </group>
      
      {/* Collines lointaines */}
      <mesh position={[-35, 1.5, -30]} castShadow>
        <sphereGeometry args={[6, 16, 12]} />
        <meshStandardMaterial color="#3a5a2a" roughness={0.8} />
      </mesh>
      
      <mesh position={[40, 2, -25]} castShadow>
        <sphereGeometry args={[8, 16, 12]} />
        <meshStandardMaterial color="#4a6a3a" roughness={0.8} />
      </mesh>
      
      <mesh position={[30, 1, 35]} castShadow>
        <sphereGeometry args={[5, 16, 12]} />
        <meshStandardMaterial color="#3a5a2a" roughness={0.8} />
      </mesh>
      
      {/* Chemin */}
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 8]} position={[2, 0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 2.5]} />
        <meshStandardMaterial color="#8b7355" roughness={1.0} />
      </mesh>
      
      {/* Quelques fleurs */}
      <mesh position={[3, 0.05, 12]} castShadow>
        <sphereGeometry args={[0.05, 6, 4]} />
        <meshStandardMaterial color="#ff69b4" emissive="#ff1493" emissiveIntensity={0.2} />
      </mesh>
      
      <mesh position={[-6, 0.05, 18]} castShadow>
        <sphereGeometry args={[0.04, 6, 4]} />
        <meshStandardMaterial color="#ffff00" emissive="#ffd700" emissiveIntensity={0.2} />
      </mesh>
      
      <mesh position={[18, 0.05, -3]} castShadow>
        <sphereGeometry args={[0.06, 6, 4]} />
        <meshStandardMaterial color="#ff4500" emissive="#ff6347" emissiveIntensity={0.2} />
      </mesh>
      
      <mesh position={[-22, 0.05, -8]} castShadow>
        <sphereGeometry args={[0.05, 6, 4]} />
        <meshStandardMaterial color="#9400d3" emissive="#8a2be2" emissiveIntensity={0.2} />
      </mesh>
    </group>
  )
} 