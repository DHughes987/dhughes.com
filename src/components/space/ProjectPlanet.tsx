import { useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import { Float, Text, MeshDistortMaterial, Html } from "@react-three/drei"
import type { SpaceProject } from "@/types/space"

interface ProjectPlanetProps {
  project: SpaceProject
}

const APPROACH_RADIUS = 65

export default function ProjectPlanet({ project }: ProjectPlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const distRef = useRef<HTMLSpanElement>(null)
  const { camera } = useThree()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      meshRef.current.rotation.z += 0.005
    }

    const dist = camera.position.distanceTo(new THREE.Vector3(...project.position))

    // Update distance label via direct DOM (no re-render)
    if (distRef.current) {
      distRef.current.textContent = `${Math.round(dist)}u`
    }

    // Animate approach ring
    if (ringRef.current) {
      const inRange = dist < APPROACH_RADIUS
      ringRef.current.visible = inRange
      if (inRange) {
        const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.06
        ringRef.current.scale.setScalar(pulse)
        const mat = ringRef.current.material as THREE.MeshBasicMaterial
        mat.opacity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.2
      }
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
          <meshBasicMaterial color={project.color} transparent opacity={0.1} side={THREE.BackSide} />
        </mesh>

        {/* Decorative Ring */}
        <mesh rotation={[Math.PI / 3, 0.2, 0]}>
          <torusGeometry args={[16, 0.2, 16, 100]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.4} />
        </mesh>

        {/* Approach / Dock Ring — pulsing outer ring when in range */}
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]} visible={false}>
          <torusGeometry args={[22, 0.15, 12, 100]} />
          <meshBasicMaterial color={project.color} transparent opacity={0.4} />
        </mesh>

        {/* Project Title */}
        <Text
          position={[0, 17, 0]}
          fontSize={4}
          color="white"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.3}
          outlineColor={project.color}
        >
          {project.title.toUpperCase()}
        </Text>

        {/* Distance Label */}
        <Html position={[0, 13, 0]} center>
          <span
            ref={distRef}
            style={{
              fontFamily: "monospace",
              fontSize: "11px",
              color: project.color,
              opacity: 0.8,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              pointerEvents: "none",
              userSelect: "none",
            }}
          />
        </Html>
      </Float>

      {/* Strong Light Source */}
      <pointLight color={project.color} intensity={50} distance={150} />

      {/* Beacon */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[1, 16, 16]} />
        <meshBasicMaterial color="white" />
      </mesh>
    </group>
  )
}
