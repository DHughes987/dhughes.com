import {
  ArrowRight,
  Bot,
  ExternalLink,
  Mail,
  Sparkles,
  User,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const projects = [
  {
    title: "Studio landing page",
    description:
      "A conversion-focused marketing site with crisp motion, CMS-driven content, and strong Lighthouse scores.",
    tags: ["React", "TypeScript", "Tailwind"],
  },
  {
    title: "E-commerce refresh",
    description:
      "A modern storefront redesign focused on trust, speed, and a smoother mobile buying experience.",
    tags: ["UI/UX", "Performance", "Stripe"],
  },
  {
    title: "Internal dashboard",
    description:
      "A clean operations dashboard with reusable components, better hierarchy, and accessible interactions.",
    tags: ["Design Systems", "Charts", "Admin"],
  },
]

const skills = [
  "React",
  "TypeScript",
  "Vite",
  "shadcn/ui",
  "Tailwind",
  "Node.js",
  "Figma",
  "Accessibility",
  "Scrum Master",
  "Team Lead",
  "AWS",
  "OAuth",
  "Git",
]

export function App() {
  return (
    <div className="min-h-svh bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-chart-2/15 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-svh max-w-6xl flex-col px-6">
        <header className="sticky top-0 z-20 border-b border-border/60 bg-background/80 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between">
            <a
              href="#top"
              className="text-sm font-semibold tracking-[0.2em] uppercase"
            >
              D. Hughes
            </a>

            <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
              <a href="#projects" className="transition-colors hover:text-foreground">
                Projects
              </a>
              <a href="#about" className="transition-colors hover:text-foreground">
                About
              </a>
              <a href="#contact" className="transition-colors hover:text-foreground">
                Contact
              </a>
            </nav>
          </div>
        </header>

        <main id="top" className="flex-1 py-10 md:py-14">
          <section className="grid gap-10 py-8 md:grid-cols-[1.2fr_0.8fr] md:py-12">
            <div className="space-y-6">
              <Badge variant="outline" className="gap-2 px-3 py-1 text-xs">
                <Sparkles className="size-3.5 text-primary" />
                Available for freelance and full-time work
              </Badge>

              <div className="space-y-4">
                <p className="text-sm font-medium text-primary">
                  Designer-minded frontend developer
                </p>
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                  I build modern websites that feel fast, sharp, and memorable.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                  I create polished digital experiences with strong visual hierarchy,
                  thoughtful interactions, and a focus on performance.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                  <a href="mailto:hello@example.com">
                    Let&apos;s work together
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <a href="#projects">View projects</a>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6">
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="px-0 text-muted-foreground hover:text-foreground"
                >
                  <a href="https://github.com" target="_blank" rel="noreferrer">
                    <Bot className="size-4 text-primary" /> GitHub
                  </a>
                </Button>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="px-0 text-muted-foreground hover:text-foreground"
                >
                  <a
                    href="https://www.linkedin.com/in/dhughes765"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <User className="size-4 text-primary" /> LinkedIn
                  </a>
                </Button>
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="px-0 text-muted-foreground hover:text-foreground"
                >
                  <a href="mailto:hello@example.com">
                    <Mail className="size-4 text-primary" /> Email
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border-border/70 bg-card/80 shadow-2xl shadow-black/5 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div className="space-y-1">
                  <CardTitle>Selected focus</CardTitle>
                  <CardDescription>
                    Building cool, high-trust web experiences
                  </CardDescription>
                </div>
                <Badge>2026</Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <Card className="rounded-2xl border-border/60 bg-background/70 shadow-none">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Now</p>
                    <p className="mt-1 text-lg font-medium">
                      Frontend systems, portfolio sites, and product marketing pages
                    </p>
                  </CardContent>
                </Card>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="rounded-2xl border-border/60 shadow-none">
                    <CardContent className="p-4">
                      <p className="text-2xl font-semibold">5+</p>
                      <p className="text-sm text-muted-foreground">
                        launch-ready builds
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-2xl border-border/60 shadow-none">
                    <CardContent className="p-4">
                      <p className="text-2xl font-semibold">100%</p>
                      <p className="text-sm text-muted-foreground">
                        attention to detail
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-4" />

          <section id="projects" className="py-10 md:py-14">
            <div className="mb-6 space-y-3">
              <p className="text-sm font-medium text-primary">Projects</p>
              <h2 className="text-2xl font-semibold md:text-3xl">
                A few things I&apos;d want people to remember
              </h2>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {projects.map((project) => (
                <Card
                  key={project.title}
                  className="group overflow-hidden border-border/70 bg-card/70 transition-transform duration-200 hover:-translate-y-1"
                >
                  <div className="mx-6 mt-6 h-36 rounded-2xl bg-gradient-to-br from-primary/20 via-transparent to-chart-2/20" />
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button asChild variant="link" className="px-0">
                      <a href="#contact">
                        See more
                        <ExternalLink className="size-4" />
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <Separator className="my-4" />

          <section
            id="about"
            className="grid gap-8 py-10 md:grid-cols-[0.9fr_1.1fr] md:py-14"
          >
            <div className="space-y-3">
              <p className="text-sm font-medium text-primary">About</p>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Clean design, real usability, no fluff.
              </h2>
              <p className="text-muted-foreground">
                I enjoy turning rough ideas into interfaces that feel premium,
                readable, and easy to use across devices.
              </p>
            </div>

            <Card className="border-border/70 bg-card/70">
              <CardContent className="space-y-4 p-5">
                <p className="text-sm leading-7 text-muted-foreground">
                  My approach blends frontend engineering with product taste: fast
                  load times, consistent components, and visuals that feel modern
                  without getting in the way.
                </p>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-4" />

          <section id="contact" className="py-10 md:py-16">
            <Card className="border-border/70 bg-card/80">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary">Contact</p>
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold md:text-3xl">
                        Have a project in mind?
                      </h2>
                      <p className="mt-2 max-w-xl text-muted-foreground">
                        Let&apos;s make something that looks great and feels even better
                        to use.
                      </p>
                    </div>

                    <Button asChild size="lg">
                      <a href="mailto:hello@example.com">
                        Say hello
                        <ArrowRight className="size-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
