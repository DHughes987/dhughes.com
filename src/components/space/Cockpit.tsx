import { useEffect, useRef } from "react"
import { useThree } from "@react-three/fiber"
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

  useEffect(() => {
    if (!group.current) return

    // Parent cockpit to camera so POV stays stable with no movement snap.
    camera.add(group.current)

    return () => {
      camera.remove(group.current as THREE.Object3D)
    }
  }, [camera])

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

      {/* Dashboard */}
      <group position={[0, -1.15, -1.9]} rotation={[-0.42, 0, 0]}>
        {/* Main Dashboard Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[3.6, 0.7, 0.25]} />
          <meshStandardMaterial color="#0f172a" roughness={0.5} metalness={0.8} />
        </mesh>

        {/* The Holographic HUD */}
        <group position={[0, 0.22, 0.16]}>
            <Html
              transform
              distanceFactor={0.95}
              position={[0, 0, 0]}
              className="pointer-events-none"
            >
              <HUDInterface project={activeProject} />
            </Html>
        </group>
      </group>

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
