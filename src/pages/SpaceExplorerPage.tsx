import { Suspense, useRef, useState } from "react"
import { Canvas } from "@react-three/fiber"
import { Stars, PerspectiveCamera, Environment, PointerLockControls, Sparkles, Html } from "@react-three/drei"
import { Link } from "react-router-dom"
import { ArrowLeft, Zap } from "lucide-react"
import * as THREE from "three"

import { Button } from "@/components/ui/button"
import Cockpit from "@/components/space/Cockpit"
import ProjectPlanet from "@/components/space/ProjectPlanet"
import FlightControls from "@/components/space/FlightControls"
import ShipTracker from "@/components/space/ShipTracker"
import NavigationRadar from "@/components/space/NavigationRadar"
import ProjectModal from "@/components/space/ProjectModal"
import { projects } from "@/data/projects"
import type { SpaceProject } from "@/types/space"

export default function SpaceExplorerPage() {
  const [activeProject, setActiveProject] = useState<SpaceProject | null>(null)
  const [dockedProject, setDockedProject] = useState<SpaceProject | null>(null)
  const [launchInitiated, setLaunchInitiated] = useState(false)

  const shipPosRef = useRef(new THREE.Vector3())
  const shipQuatRef = useRef(new THREE.Quaternion())

  return (
    <div className="relative h-svh w-full bg-[#020617] overflow-hidden">
      {/* Abort Mission — always visible */}
      <div className="absolute top-6 left-6 z-10">
        <Button
          asChild
          variant="outline"
          className="gap-2 bg-slate-900/50 backdrop-blur-md border-slate-700 text-slate-200 hover:bg-slate-800"
        >
          <Link to="/">
            <ArrowLeft className="size-4" />
            Abort Mission
          </Link>
        </Button>
      </div>

      {!launchInitiated ? (
        /* ── Mission Briefing ── */
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black pointer-events-auto">
          <div className="max-w-md p-8 bg-slate-900 border-2 border-slate-800 rounded-2xl text-center space-y-6 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
            <div className="mx-auto size-16 bg-primary rounded-full flex items-center justify-center shadow-[0_0_20px_hsl(var(--primary)/0.4)] animate-pulse">
              <Zap className="size-8 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
                Mission Briefing
              </h2>
              <p className="text-slate-400 text-sm leading-relaxed">
                Navigate the Hughes Explorer through the starfield. Fly near a planet to establish a
                data uplink, then press{" "}
                <kbd className="px-1.5 py-0.5 bg-slate-800 border border-slate-600 rounded text-slate-200 font-mono text-xs">
                  E
                </kbd>{" "}
                to dock and retrieve full project intel.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Thrusters</span>
                <p className="text-white font-mono text-xs mt-1">
                  W / A / S / D
                  <br />
                  SHIFT (boost) / CTRL
                </p>
              </div>
              <div className="p-3 bg-slate-800/50 border border-slate-700 rounded-lg">
                <span className="text-[10px] text-primary font-bold uppercase tracking-widest">Guidance</span>
                <p className="text-white font-mono text-xs mt-1">
                  Mouse to Steer
                  <br />
                  E to Dock · ESC to Unlock
                </p>
              </div>
            </div>
            {/* Planet directory */}
            <div className="space-y-2 text-left">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                Sector Targets
              </span>
              <div className="space-y-1.5">
                {projects.map((p) => (
                  <div key={p.id} className="flex items-center gap-2.5">
                    <div className="size-2 rounded-full shrink-0" style={{ backgroundColor: p.color }} />
                    <span className="text-xs text-slate-300 font-mono">{p.title}</span>
                    <span className="text-[10px] text-slate-600 ml-auto font-mono">{p.year}</span>
                  </div>
                ))}
              </div>
            </div>
            <Button
              size="lg"
              className="w-full font-bold tracking-[0.2em] uppercase h-14 active:border-b-0 active:translate-y-1 transition-all"
              onClick={() => setLaunchInitiated(true)}
            >
              Initiate Launch Sequence
            </Button>
          </div>
        </div>
      ) : (
        <>
          {/* ── 3D Scene ── */}
          <div className="size-full">
            <Canvas shadows dpr={[1, 2]} gl={{ antialias: true }}>
              <PerspectiveCamera makeDefault position={[0, 0, 0]} fov={65} />
              <ambientLight intensity={1.5} />
              <pointLight position={[10, 10, 10]} intensity={2} />

              <Suspense
                fallback={
                  <Html center>
                    <div className="text-white font-mono uppercase tracking-[0.5em] animate-pulse">
                      Initializing_Sectors...
                    </div>
                  </Html>
                }
              >
                <Stars radius={400} depth={100} count={30000} factor={10} saturation={1} fade speed={1.5} />
                <Sparkles count={300} scale={200} size={3} speed={0.5} color="#10b981" />

                <ShipTracker posRef={shipPosRef} quatRef={shipQuatRef} />
                <FlightControls
                  onProjectNear={setActiveProject}
                  onDock={setDockedProject}
                  isDocked={dockedProject !== null}
                />
                <Cockpit activeProject={activeProject} />

                {projects.map((project) => (
                  <ProjectPlanet key={project.id} project={project} />
                ))}

                <Environment preset="night" />
              </Suspense>

              <PointerLockControls />
            </Canvas>
          </div>

          {/* ── Status Bar ── */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none z-10 w-full flex flex-col items-center gap-4">
            <div className="px-6 py-2 bg-slate-900/60 backdrop-blur-md border border-primary/30 rounded-full shadow-[0_0_20px_hsl(var(--primary)/0.1)]">
              <p className="text-[10px] font-mono text-primary tracking-[0.4em] uppercase">
                {activeProject
                  ? `DATA_LINK_ACTIVE // ${activeProject.title.toUpperCase()} — PRESS [E] TO DOCK`
                  : "SCANNING_FOR_SIGNALS..."}
              </p>
            </div>
          </div>

          {/* ── Navigation Radar ── */}
          <NavigationRadar projects={projects} shipPosRef={shipPosRef} shipQuatRef={shipQuatRef} />

          {/* ── Project Detail Modal ── */}
          <ProjectModal project={dockedProject} onClose={() => setDockedProject(null)} />
        </>
      )}
    </div>
  )
}