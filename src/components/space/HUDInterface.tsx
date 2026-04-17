import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { SpaceProject } from "@/types/space"
import { Activity, ShieldAlert, Wifi, Globe, Terminal } from "lucide-react"

interface HUDInterfaceProps {
  project: SpaceProject | null
}

export default function HUDInterface({ project }: HUDInterfaceProps) {
  return (
    <div className="w-[800px] h-[350px] flex gap-4 p-6 bg-emerald-950/20 backdrop-blur-xl border-2 border-emerald-500/50 rounded-2xl relative overflow-hidden select-none">
      {/* HUD Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,255,0,0.03),rgba(0,255,0,0.01),rgba(0,255,0,0.03))] bg-[length:100%_2px,2px_100%] z-10" />
      
      {/* Left Panel - Telemetry */}
      <div className="w-48 flex flex-col gap-3 z-20">
        <div className="p-3 bg-emerald-900/40 border border-emerald-400/30 rounded-lg space-y-1">
          <div className="flex items-center justify-between text-[10px] text-emerald-300 font-bold uppercase tracking-widest">
             <span>Signal</span>
             <Wifi className="size-3" />
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className={`h-full transition-all duration-1000 ${project ? "w-full bg-emerald-400" : "w-1/5 bg-red-400 animate-pulse"}`} />
          </div>
        </div>
        
        <div className="p-3 bg-emerald-900/40 border border-emerald-400/30 rounded-lg space-y-2">
          <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-widest">Telemetry</span>
          {[1, 2, 3].map(i => (
            <div key={i} className="flex gap-1 items-end h-8">
              {Array.from({ length: 8 }).map((_, j) => (
                <div 
                  key={j} 
                  className="w-full bg-emerald-400/50" 
                  style={{ height: `${Math.random() * 100}%` }} 
                />
              ))}
            </div>
          ))}
        </div>

        <div className="mt-auto flex items-center gap-2 text-emerald-400 font-mono text-[10px]">
          <Activity className="size-3 animate-bounce" />
          SYSTEMS_NOMINAL
        </div>
      </div>

      {/* Main Panel - Project Data */}
      <div className="flex-1 flex flex-col z-20 bg-emerald-900/10 border border-emerald-400/20 rounded-xl p-6 relative">
        {!project ? (
          <div className="size-full flex flex-col items-center justify-center text-center space-y-4">
             <ShieldAlert className="size-12 text-emerald-500/50 animate-pulse" />
             <div className="space-y-1">
                <h3 className="text-emerald-300 font-bold tracking-[0.2em] uppercase">No Link Detected</h3>
                <p className="text-xs text-emerald-400/70 font-mono">APPROACH TARGET PLANET TO COMMENCE UPLOAD</p>
             </div>
          </div>
        ) : (
          <div className="size-full flex flex-col animate-in fade-in zoom-in duration-500">
            <div className="flex justify-between items-start">
               <div className="space-y-1">
                  <span className="text-[10px] text-emerald-400 font-mono uppercase tracking-[0.3em]">Sector // Project_Node</span>
                  <h2 className="text-4xl font-black text-white tracking-tighter uppercase leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                    {project.title}
                  </h2>
               </div>
               <div className="size-12 rounded-full border-2 border-emerald-400 flex items-center justify-center">
                  <Globe className="size-6 text-emerald-400 animate-spin-slow" />
               </div>
            </div>

            <p className="mt-4 text-sm text-emerald-200 leading-relaxed font-medium line-clamp-3">
              {project.description}
            </p>

            <div className="mt-auto flex justify-between items-end">
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <Badge key={tag} className="bg-emerald-500/20 border-emerald-400/50 text-emerald-200 text-[10px] uppercase">
                    {tag}
                  </Badge>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-[10px] font-bold tracking-widest uppercase">
                  Open Uplink
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right Panel - Terminal */}
      <div className="w-48 flex flex-col gap-3 z-20">
         <div className="flex-1 p-3 bg-black/40 border border-emerald-400/30 rounded-lg font-mono text-[9px] text-emerald-400 overflow-hidden">
            <div className="flex items-center gap-2 mb-2 border-b border-emerald-400/20 pb-1">
               <Terminal className="size-3" />
               <span>LOG_FEED</span>
            </div>
            <div className="space-y-1 opacity-70">
              <p>{">"} INITIALIZING...</p>
              <p>{">"} SCANNING SECTOR X-49</p>
              <p>{">"} ENGINES: ACTIVE</p>
              {project && (
                <>
                  <p className="text-emerald-400">{">"} TARGET IDENTIFIED</p>
                  <p className="text-emerald-400">{">"} DOWNLOADING DATA...</p>
                  <p className="text-emerald-400">{">"} 100% COMPLETE</p>
                </>
              )}
              <p className="animate-pulse">{">"} _</p>
            </div>
         </div>
         
         <div className="h-12 flex items-center justify-center bg-emerald-500/20 border border-emerald-400/50 rounded-lg">
            <span className="text-[10px] font-black text-emerald-300 tracking-[0.5em] uppercase">Hughes_Exp</span>
         </div>
      </div>
    </div>
  )
}
