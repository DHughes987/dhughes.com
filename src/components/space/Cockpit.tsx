import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { Html } from "@react-three/drei"
import HUDInterface from "./HUDInterface"
import type { SpaceProject } from "@/types/space"

interface CockpitProps {
  activeProject: SpaceProject | null
}

export default function Cockpit({ activeProject }: CockpitProps) {
  const group = useRef<THREE.Group>(null)
  const { camera } = useThree()

  useFrame(() => {
    if (group.current) {
      // Sync cockpit position to camera
      group.current.position.copy(camera.position)
      group.current.quaternion.copy(camera.quaternion)
    }
  })

  return (
    <group ref={group}>
      {/* 
          Internal Cockpit Lighting 
      */}
      <pointLight position={[0, 1, -1]} intensity={10} color="#10b981" distance={15} />
      <spotLight 
        position={[0, 5, 2]} 
        angle={0.6} 
        penumbra={1} 
        intensity={5} 
        color="#ffffff" 
        target-position={[0, 0, -5]} 
      />

      {/* Cockpit Frame / Window Structure */}
      {/* Upper Frame */}
      <mesh position={[0, 2.5, -2]}>
        <boxGeometry args={[10, 0.5, 1]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Dashboard - Moving it way closer and up so it's impossible to miss */}
      <group position={[0, -0.8, -1.2]} rotation={[-0.5, 0, 0]}>
        {/* Main Dashboard Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[4.5, 1.2, 0.4]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.8} />
        </mesh>

        {/* The Holographic HUD */}
        <group position={[0, 0.3, 0.25]}>
            <Html
              transform
              distanceFactor={1.5}
              position={[0, 0, 0]}
              className="pointer-events-none"
            >
              <HUDInterface project={activeProject} />
            </Html>
        </group>
      </group>

      {/* Floor / Lower Frame */}
      <mesh position={[0, -2, -1]}>
        <boxGeometry args={[8, 0.5, 4]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Window Tint/Glass */}
      <mesh position={[0, 0, -3]}>
        <planeGeometry args={[20, 20]} />
        <meshPhysicalMaterial 
          transparent 
          opacity={0.05} 
          roughness={0} 
          transmission={0.9} 
          color="#3b82f6"
        />
      </mesh>
    </group>
  )
}
