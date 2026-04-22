import { useEffect, useRef } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"
import type { SpaceProject } from "@/types/space"
import { projects as projectData } from "@/data/projects"

const MOVE_SPEED = 0.8
const BOOST_MULTIPLIER = 2.5
const DETECTION_RADIUS = 35

interface FlightControlsProps {
  onProjectNear: (project: SpaceProject | null) => void
  onDock: (project: SpaceProject) => void
  isDocked: boolean
}

export default function FlightControls({ onProjectNear, onDock, isDocked }: FlightControlsProps) {
  const { camera } = useThree()
  const keys = useRef<{ [key: string]: boolean }>({})
  const currentActiveId = useRef<string | null>(null)
  const eWasDown = useRef(false)

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = true
    }
    const handleKeyUp = (e: KeyboardEvent) => {
      keys.current[e.key.toLowerCase()] = false
      // Reset E-press tracking on key up
      if (e.key.toLowerCase() === "e") eWasDown.current = false
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
    if (isDocked) return

    // 1. Movement
    const direction = new THREE.Vector3()
    const z = (keys.current["s"] ? 1 : 0) - (keys.current["w"] ? 1 : 0)
    const x = (keys.current["d"] ? 1 : 0) - (keys.current["a"] ? 1 : 0)
    const y = (keys.current["shift"] ? 1 : 0) - (keys.current["control"] ? 1 : 0)

    if (x !== 0 || y !== 0 || z !== 0) {
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion)
      const right = new THREE.Vector3(1, 0, 0).applyQuaternion(camera.quaternion)
      const up = new THREE.Vector3(0, 1, 0)

      direction.add(forward.multiplyScalar(-z))
      direction.add(right.multiplyScalar(x))
      direction.add(up.multiplyScalar(y))

      const boost = keys.current["shift"] ? BOOST_MULTIPLIER : 1
      direction.normalize().multiplyScalar(MOVE_SPEED * boost)
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

    // 3. Update active planet state
    if (nearProject?.id !== currentActiveId.current) {
      currentActiveId.current = nearProject?.id || null
      eWasDown.current = false
      onProjectNear(nearProject)
    }

    // 4. E-key docking — trigger once per press
    if (keys.current["e"] && !eWasDown.current && currentActiveId.current) {
      eWasDown.current = true
      const project = projectData.find((p) => p.id === currentActiveId.current)
      if (project) onDock(project)
    }
  })

  return null
}
