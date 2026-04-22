import { useEffect, useRef } from "react"
import * as THREE from "three"
import type { SpaceProject } from "@/types/space"

interface NavigationRadarProps {
  projects: SpaceProject[]
  shipPosRef: React.MutableRefObject<THREE.Vector3>
  shipQuatRef: React.MutableRefObject<THREE.Quaternion>
}

const WORLD_RANGE = 350

export default function NavigationRadar({ projects, shipPosRef, shipQuatRef }: NavigationRadarProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const SIZE = canvas.width   // 160
    const CENTER = SIZE / 2     // 80
    const RADIUS = CENTER - 6   // 74

    function draw() {
      ctx!.clearRect(0, 0, SIZE, SIZE)

      // Clip to circle
      ctx!.save()
      ctx!.beginPath()
      ctx!.arc(CENTER, CENTER, RADIUS, 0, Math.PI * 2)
      ctx!.clip()
      ctx!.fillStyle = "rgba(2, 10, 6, 0.88)"
      ctx!.fillRect(0, 0, SIZE, SIZE)

      // Concentric grid rings
      ctx!.strokeStyle = "rgba(16, 185, 129, 0.1)"
      ctx!.lineWidth = 1
      for (const r of [0.33, 0.66, 1]) {
        ctx!.beginPath()
        ctx!.arc(CENTER, CENTER, RADIUS * r, 0, Math.PI * 2)
        ctx!.stroke()
      }

      // Crosshairs
      ctx!.strokeStyle = "rgba(16, 185, 129, 0.1)"
      ctx!.lineWidth = 0.5
      ctx!.beginPath()
      ctx!.moveTo(CENTER - RADIUS, CENTER)
      ctx!.lineTo(CENTER + RADIUS, CENTER)
      ctx!.moveTo(CENTER, CENTER - RADIUS)
      ctx!.lineTo(CENTER, CENTER + RADIUS)
      ctx!.stroke()
      ctx!.restore()

      // Outer border
      ctx!.strokeStyle = "rgba(16, 185, 129, 0.5)"
      ctx!.lineWidth = 1.5
      ctx!.beginPath()
      ctx!.arc(CENTER, CENTER, RADIUS, 0, Math.PI * 2)
      ctx!.stroke()

      const shipPos = shipPosRef.current
      const forward = new THREE.Vector3(0, 0, -1).applyQuaternion(shipQuatRef.current)
      const yaw = Math.atan2(forward.x, forward.z)

      // Draw planets
      for (const p of projects) {
        const pPos = new THREE.Vector3(...p.position)
        const relX = pPos.x - shipPos.x
        const relZ = pPos.z - shipPos.z

        // Rotate to ship heading
        const cosY = Math.cos(-yaw)
        const sinY = Math.sin(-yaw)
        const rotX = relX * cosY - relZ * sinY
        const rotZ = relX * sinY + relZ * cosY

        let radarX = CENTER + (rotX / WORLD_RANGE) * RADIUS
        let radarY = CENTER + (rotZ / WORLD_RANGE) * RADIUS

        const dx = radarX - CENTER
        const dy = radarY - CENTER
        const radDist = Math.sqrt(dx * dx + dy * dy)
        const onEdge = radDist > RADIUS - 8

        if (onEdge) {
          const angle = Math.atan2(dy, dx)
          radarX = CENTER + Math.cos(angle) * (RADIUS - 8)
          radarY = CENTER + Math.sin(angle) * (RADIUS - 8)
        }

        ctx!.save()
        ctx!.beginPath()
        ctx!.arc(CENTER, CENTER, RADIUS, 0, Math.PI * 2)
        ctx!.clip()

        if (!onEdge) {
          const gradient = ctx!.createRadialGradient(radarX, radarY, 0, radarX, radarY, 9)
          gradient.addColorStop(0, p.color + "70")
          gradient.addColorStop(1, "transparent")
          ctx!.fillStyle = gradient
          ctx!.beginPath()
          ctx!.arc(radarX, radarY, 9, 0, Math.PI * 2)
          ctx!.fill()
        }

        ctx!.fillStyle = onEdge ? p.color + "90" : p.color
        ctx!.beginPath()
        ctx!.arc(radarX, radarY, onEdge ? 2 : 3, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.restore()
      }

      // Ship indicator — white triangle pointing up (forward)
      ctx!.fillStyle = "#ffffff"
      ctx!.beginPath()
      ctx!.moveTo(CENTER, CENTER - 6)
      ctx!.lineTo(CENTER - 4, CENTER + 4)
      ctx!.lineTo(CENTER + 4, CENTER + 4)
      ctx!.closePath()
      ctx!.fill()

      rafRef.current = requestAnimationFrame(draw)
    }

    draw()
    return () => cancelAnimationFrame(rafRef.current)
  }, [projects, shipPosRef, shipQuatRef])

  return (
    <div className="absolute bottom-28 right-6 flex flex-col items-center gap-1.5 pointer-events-none">
      <canvas
        ref={canvasRef}
        width={160}
        height={160}
        className="rounded-full"
        style={{ width: 80, height: 80 }}
      />
      <span className="text-[8px] font-mono text-emerald-400/50 tracking-[0.35em] uppercase">Nav Radar</span>
    </div>
  )
}
