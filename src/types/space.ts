import * as THREE from "three"

export interface SpaceProject {
  id: string
  title: string
  description: string
  longDescription: string
  role: string
  year: string
  tags: string[]
  highlights: string[]
  color: string
  position: [number, number, number]
  url?: string
}

export interface ShipState {
  position: THREE.Vector3
  rotation: THREE.Euler
  velocity: THREE.Vector3
  isLocked: boolean
}
