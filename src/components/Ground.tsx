'use client'

export default function Ground() {
  return (
    <group>
      {/* Sol principal */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial color="#3d5a2c" />
      </mesh>
      
      {/* Quelques rochers décoratifs */}
      <mesh position={[5, 0.5, 5]} castShadow>
        <sphereGeometry args={[0.8, 8, 6]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      
      <mesh position={[-3, 0.3, 8]} castShadow>
        <sphereGeometry args={[0.5, 8, 6]} />
        <meshStandardMaterial color="#666" />
      </mesh>
      
      <mesh position={[8, 0.4, -6]} castShadow>
        <sphereGeometry args={[0.6, 8, 6]} />
        <meshStandardMaterial color="#444" />
      </mesh>
      
      <mesh position={[-7, 0.6, -4]} castShadow>
        <sphereGeometry args={[0.9, 8, 6]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      
      {/* Quelques arbres stylisés */}
      <group position={[10, 0, 10]}>
        {/* Tronc */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.2, 0.3, 2]} />
          <meshStandardMaterial color="#4a3728" />
        </mesh>
        {/* Feuillage */}
        <mesh position={[0, 2.5, 0]} castShadow>
          <sphereGeometry args={[1.2]} />
          <meshStandardMaterial color="#2d5016" />
        </mesh>
      </group>
      
      <group position={[-12, 0, 8]}>
        {/* Tronc */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.35, 2.4]} />
          <meshStandardMaterial color="#5a4738" />
        </mesh>
        {/* Feuillage */}
        <mesh position={[0, 3, 0]} castShadow>
          <sphereGeometry args={[1.4]} />
          <meshStandardMaterial color="#3d6016" />
        </mesh>
      </group>
      
      <group position={[6, 0, -12]}>
        {/* Tronc */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <cylinderGeometry args={[0.15, 0.25, 1.6]} />
          <meshStandardMaterial color="#3a2718" />
        </mesh>
        {/* Feuillage */}
        <mesh position={[0, 2, 0]} castShadow>
          <sphereGeometry args={[1]} />
          <meshStandardMaterial color="#1d4016" />
        </mesh>
      </group>
    </group>
  )
} 