import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { Float, Text, MeshDistortMaterial } from "@react-three/drei"
import type { SpaceProject } from "@/types/space"

interface ProjectPlanetProps {
  project: SpaceProject
}

export default function ProjectPlanet({ project }: ProjectPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.z += 0.005
    }
  })

  return (
    <group position={project.position}>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        {/* Core Planet */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[10, 64, 64]} />
          <MeshDistortMaterial
            color={project.color}
            speed={3}
            distort={0.4}
            radius={1}
            emissive={project.color}
            emissiveIntensity={4}
            roughness={0.1}
            metalness={0.9}
          />
        </mesh>

        {/* Outer Glow */}
        <mesh scale={[1.4, 1.4, 1.4]}>
          <sphereGeometry args={[10, 32, 32]} />
          <meshBasicMaterial
            color={project.color}
            transparent
            opacity={0.1}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Decorative Rings */}
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[16, 0.2, 16, 100]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.4} />
        </mesh>

        {/* Project Title - billboarded text */}
        <Text
          position={[0, 15, 0]}
          fontSize={4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.3}
          outlineColor={project.color}
        >
          {project.title.toUpperCase()}
        </Text>
      </Float>

      {/* Strong Light Source */}
      <pointLight color={project.color} intensity={50} distance={150} />
      
      {/* Absolute Beacon */}
      <mesh position={[0,0,0]}>
          <sphereGeometry args={[1, 16, 16]} />
          <meshBasicMaterial color="white" />
      </mesh>
    </group>
  )
}
