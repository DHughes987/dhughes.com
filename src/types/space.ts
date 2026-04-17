import * as THREE from "three"

export interface SpaceProject {
  id: string
  title: string
  description: string
  tags: string[]
  color: string
  position: [number, number, number]
  details?: string
}

export interface ShipState {
  position: THREE.Vector3
  rotation: THREE.Euler
  velocity: THREE.Vector3
  isLocked: boolean
}
