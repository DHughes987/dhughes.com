import { useFrame, useThree } from "@react-three/fiber"
import * as THREE from "three"

interface ShipTrackerProps {
  posRef: React.MutableRefObject<THREE.Vector3>
  quatRef: React.MutableRefObject<THREE.Quaternion>
}

export default function ShipTracker({ posRef, quatRef }: ShipTrackerProps) {
  const { camera } = useThree()

  useFrame(() => {
    posRef.current.copy(camera.position)
    quatRef.current.copy(camera.quaternion)
  })

  return null
}
