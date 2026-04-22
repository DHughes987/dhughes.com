import { useEffect } from "react"
import { X, ExternalLink, Calendar, User, Zap } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import type { SpaceProject } from "@/types/space"

interface ProjectModalProps {
  project: SpaceProject | null
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onClose])

  if (!project) return null

  return (
    <div
      className="absolute inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl mx-6 animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300"
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <div
          className="bg-slate-950/95 border-2 rounded-2xl overflow-hidden shadow-2xl"
          style={{ borderColor: project.color + "55" }}
        >
          {/* Top accent bar */}
          <div className="h-[3px] w-full" style={{ backgroundColor: project.color }} />

          {/* Header */}
          <div className="p-8 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="size-2.5 rounded-full animate-pulse"
                    style={{ backgroundColor: project.color }}
                  />
                  <span
                    className="text-[10px] font-mono tracking-[0.35em] uppercase"
                    style={{ color: project.color }}
                  >
                    DOCKED // PROJECT_NODE
                  </span>
                </div>
                <h2 className="text-4xl font-black tracking-tighter text-white leading-none">
                  {project.title}
                </h2>
              </div>
              <Button
                size="icon"
                variant="ghost"
                onClick={onClose}
                className="shrink-0 size-9 text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="size-4" />
              </Button>
            </div>

            <div className="flex gap-6 mt-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <User className="size-3" />
                {project.role}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                <Calendar className="size-3" />
                {project.year}
              </div>
            </div>
          </div>

          <Separator className="bg-slate-800" />

          {/* Body */}
          <div className="p-8 space-y-6">
            <p className="text-slate-300 leading-relaxed text-sm">{project.longDescription}</p>

            {/* Mission Highlights */}
            <div className="space-y-3">
              <h3
                className="text-[10px] font-bold tracking-[0.35em] uppercase"
                style={{ color: project.color }}
              >
                Mission Highlights
              </h3>
              <ul className="space-y-2.5">
                {project.highlights.map((highlight, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                    <Zap className="size-3 mt-0.5 shrink-0" style={{ color: project.color }} />
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-slate-700 text-slate-400 text-[10px] uppercase tracking-wider"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 pb-8 flex items-center justify-between gap-4">
            <p className="text-[10px] text-slate-600 font-mono">ESC or click outside to disengage</p>
            {project.url && (
              <Button
                size="sm"
                asChild
                className="font-bold tracking-widest uppercase text-[10px] text-white"
                style={{ backgroundColor: project.color }}
              >
                <a href={project.url} target="_blank" rel="noreferrer">
                  <ExternalLink data-icon="inline-start" className="size-3" />
                  Visit Project
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
