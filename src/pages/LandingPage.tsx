import {
  ArrowRight,
  Bot,
  ExternalLink,
  Mail,
  Sparkles,
  User,
  Gamepad2,
} from "lucide-react"
import { Link } from "react-router-dom"

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
    title: "Bluescope Technologies",
    description:
      "Built an e-commerce website while working for Bluescope Technologies with over 40k products, focusing on scale, catalogue usability, and a smooth shopping experience.",
    tags: ["Magento 2", "LAMP", "E-commerce"],
  },
  {
    title: "Sustain.Life",
    description:
      "Worked on a sustainability emissions calculator for Sustain.Life, helping shape a product that made complex environmental data more usable and actionable.",
    tags: ["TypeScript", "Rush.js", "GraphQL"],
  },
  {
    title: "Realta",
    description:
      "Currently building an AML platform with a strong focus on clarity, maintainability, and secure user flows that handle sensitive data with care.",
    tags: ["React", "TypeScript", "Microfrontends", "shadcn/ui"],
  },
]

const skills = [
  "React",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Vite",
  "Next.js",
  "Node.js",
  "AWS",
  "OAuth",
  "Git",
  "Figma",
  "Agile / Scrum",
]

const hobbies = [
  "Magic: The Gathering",
  "Dungeons & Dragons",
  "Cooking",
  "Video Games",
]

export default function LandingPage() {
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

            <nav className="hidden items-center gap-4 md:flex">
              <Button
                asChild
                variant="link"
                size="sm"
                className="px-0 text-muted-foreground hover:text-foreground"
              >
                <Link to="/space" className="flex items-center gap-2 text-primary font-bold">
                  <Gamepad2 className="size-4" />
                  Space Explorer
                </Link>
              </Button>
              <Button
                asChild
                variant="link"
                size="sm"
                className="px-0 text-muted-foreground hover:text-foreground"
              >
                <a href="#projects">Projects</a>
              </Button>
              <Button
                asChild
                variant="link"
                size="sm"
                className="px-0 text-muted-foreground hover:text-foreground"
              >
                <a href="#about">About</a>
              </Button>
              <Button
                asChild
                variant="link"
                size="sm"
                className="px-0 text-muted-foreground hover:text-foreground"
              >
                <a href="#contact">Contact</a>
              </Button>
            </nav>
          </div>
        </header>

        <main id="top" className="flex-1 py-10 md:py-14">
          <section className="grid gap-10 py-8 md:grid-cols-[1.2fr_0.8fr] md:py-12">
            <div className="space-y-6">
              <Badge variant="outline" className="gap-2 px-3 py-1 text-xs">
                <Sparkles className="size-3.5 text-primary" />
                Open to ideas, projects, and opportunities
              </Badge>

              <div className="space-y-4">
                <p className="text-sm font-medium text-primary">Software Engineer</p>
                <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-balance md:text-6xl">
                  Hey, I&apos;m Dylan.
                </h1>
                <p className="max-w-xl text-base leading-7 text-muted-foreground md:text-lg">
                  I build fast, clean, and genuinely nice-to-use web experiences
                  with a focus on performance, security, accessibility, and UI
                  that actually makes sense.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                  <a href="mailto:dylanhughes765@gmail.com">
                    Get in touch
                    <ArrowRight className="size-4" />
                  </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2">
                  <Link to="/space">
                    <Gamepad2 className="size-4" />
                    Launch Odyssey
                  </Link>
                </Button>
              </div>

              <div className="flex flex-wrap gap-6">
                <Button
                  asChild
                  variant="link"
                  size="sm"
                  className="px-0 text-muted-foreground hover:text-foreground"
                >
                  <a href="https://github.com/DHughes987/DHughes987" target="_blank" rel="noreferrer">
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
                  <a href="mailto:dylanhughes765@gmail.com">
                    <Mail className="size-4 text-primary" /> Email
                  </a>
                </Button>
              </div>
            </div>

            <Card className="border-border/70 bg-card/80 shadow-2xl shadow-black/5 backdrop-blur-xl">
              <CardHeader className="flex flex-row items-start justify-between gap-4 space-y-0">
                <div className="space-y-1">
                  <CardTitle>Current focus</CardTitle>
                  <CardDescription>
                    Fast, polished products that feel obvious to use
                  </CardDescription>
                </div>
                <Badge>2026</Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <Card className="rounded-2xl border-border/60 bg-background/70 shadow-none">
                  <CardContent className="p-4">
                    <p className="text-xs text-muted-foreground">Now</p>
                    <p className="mt-1 text-lg font-medium">
                      Creating high-quality portfolio sites and product pages,
                      while building reusable frontend systems.
                    </p>
                  </CardContent>
                </Card>

                <div className="grid gap-3 sm:grid-cols-2">
                  <Card className="rounded-2xl border-border/60 shadow-none">
                    <CardContent className="p-4">
                      <p className="text-sm font-semibold">Simple over clever</p>
                      <p className="text-sm text-muted-foreground">
                        Clean code and maintainability matter.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="rounded-2xl border-border/60 shadow-none">
                    <CardContent className="p-4">
                      <p className="text-sm font-semibold">Bridging UI + server</p>
                      <p className="text-sm text-muted-foreground">
                        Levelling up Node.js, AWS, and OAuth.
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
              <p className="text-sm font-medium text-primary">Featured work</p>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Work Experience
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
            <div className="flex flex-col justify-center space-y-3">
              <p className="text-sm font-medium text-primary">About</p>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Good UI feels obvious.
              </h2>
              <p className="text-muted-foreground">
                I like UI that feels fast and effortless, clean code that stays
                maintainable, and simple solutions over clever ones.
              </p>
            </div>

            <Card className="border-border/70 bg-card/70">
              <CardContent className="space-y-4 p-5">
                <p className="text-sm leading-7 text-muted-foreground">
                  I&apos;m big on performance, accessibility, security, and products
                  that people actually enjoy using. Smart people admire simplicity;
                  others admire complexity.
                </p>

                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">Outside of work</p>
                  <p className="text-sm text-muted-foreground">
                    A bit nerdy in the best way, especially when it comes to card
                    games, fantasy worlds, and anything social and strategic.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {hobbies.map((hobby) => (
                      <Badge key={hobby} variant="outline" className="text-sm">
                        {hobby}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>

          <Separator className="my-4" />

          <section id="contact" className="py-10 md:py-16">
            <Card className="border-border/70 bg-card/80">
              <CardContent className="p-6 md:p-8">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-primary">Get in touch</p>
                  <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold md:text-3xl">
                        Open to chatting about ideas, projects, or opportunities.
                      </h2>
                      <p className="mt-2 max-w-xl text-muted-foreground">
                        If you like my work or want to build something thoughtful,
                        feel free to reach out.
                      </p>
                    </div>

                    <Button asChild size="lg">
                      <a href="mailto:dylanhughes765@gmail.com">
                        Email Dylan
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
