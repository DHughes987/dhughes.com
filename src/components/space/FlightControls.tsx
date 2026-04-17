import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { SpaceProject } from "@/types/space"

const MOVE_SPEED = 0.8
const DETECTION_RADIUS = 35

const projectData: SpaceProject[] = [
  {
    id: "bluescope",
    title: "Bluescope Technologies",
    description: "E-commerce platform with 40k+ products.",
    tags: ["Magento 2", "PHP", "Scalability"],
    color: "#3b82f6",
    position: [0, 0, -80],
  },
  {
    id: "sustain",
    title: "Sustain.Life",
    description: "Carbon emissions calculator for enterprises.",
    tags: ["TypeScript", "GraphQL", "Sustainability"],
    color: "#10b981",
    position: [100, 20, -150],
  },
  {
    id: "realta",
    title: "Realta",
    description: "AML compliance platform for secure data handling.",
    tags: ["React", "Security", "FinTech"],
    color: "#8b5cf6",
    position: [-100, -30, -200],
  },
]

interface FlightControlsProps {
  onProjectNear: (project: SpaceProject | null) => void
}

export default function FlightControls({ onProjectNear }: FlightControlsProps) {
  const { camera } = useThree()
  const keys = useRef<{ [key: string]: boolean }>({})
  const currentActiveId = useRef<string | null>(null)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.focus()

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame(() => {
    // 1. Calculate direction vector
    const direction = new THREE.Vector3()
    
    // Z-axis: Three.js forward is -Z. So W = -1, S = +1
    const z = (keys.current["s"] ? 1 : 0) - (keys.current["w"] ? 1 : 0)
    // X-axis: A = -1, D = +1
    const x = (keys.current["d"] ? 1 : 0) - (keys.current["a"] ? 1 : 0)
    // Y-axis: Shift = +1, Ctrl = -1
    const y = (keys.current["shift"] ? 1 : 0) - (keys.current["control"] ? 1 : 0)

    if (x !== 0 || y !== 0 || z !== 0) {
      // Get camera direction
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
      const up = new THREE.Vector3(0, 1, 0) // Keep global up for vertical movement

      direction.add(forward.multiplyScalar(-z)) // -z because W makes z negative
      direction.add(right.multiplyScalar(x))
      direction.add(up.multiplyScalar(y))

      direction.normalize().multiplyScalar(MOVE_SPEED)
      camera.position.add(direction)
    }

    // 2. Proximity Detection
    let nearProject: SpaceProject | null = null
    for (const p of projectData) {
      const dist = camera.position.distanceTo(new THREE.Vector3(...p.position))
      if (dist < DETECTION_RADIUS) {
        nearProject = p
        break
      }
    }

    // 3. Update Parent State
    if (nearProject?.id !== currentActiveId.current) {
      currentActiveId.current = nearProject?.id || null
      onProjectNear(nearProject)
    }
  })

  return null
}
