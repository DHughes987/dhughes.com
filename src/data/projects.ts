import type { SpaceProject } from "@/types/space"

export const projects: SpaceProject[] = [
  {
    id: "bluescope",
    title: "Bluescope Technologies",
    description: "High-scale e-commerce with 40k+ products.",
    longDescription:
      "Built and maintained a high-scale e-commerce platform for Bluescope Technologies, handling a catalogue of over 40,000 products. The focus was on performance, catalogue usability, and a smooth shopping experience for both desktop and mobile customers across the Asia-Pacific region.",
    role: "Full Stack Developer",
    year: "2020 – 2022",
    tags: ["Magento 2", "PHP", "MySQL", "JavaScript", "E-commerce"],
    color: "#3b82f6",
    position: [0, 0, -80],
    highlights: [
      "Managed 40,000+ product catalogue with custom Elasticsearch indexing",
      "Improved page load times by 40% through aggressive caching strategies",
      "Built a custom B2B checkout flow handling complex pricing rules",
    ],
  },
  {
    id: "sustain",
    title: "Sustain.Life",
    description: "Carbon emissions calculator for enterprises.",
    longDescription:
      "Worked on a sustainability emissions calculator for Sustain.Life, helping shape a product that made complex environmental data accessible and actionable for enterprise customers. Built scalable data visualisation and reporting pipelines across a monorepo architecture managed with Rush.js.",
    role: "Frontend Developer",
    year: "2022 – 2024",
    tags: ["TypeScript", "Rush.js", "GraphQL", "React", "Data Viz"],
    color: "#10b981",
    position: [100, 20, -150],
    highlights: [
      "Built carbon footprint visualisation dashboards from scratch",
      "Integrated GraphQL APIs for real-time emissions data pipelines",
      "Maintained monorepo with Rush.js across 12+ independently deployable packages",
    ],
  },
  {
    id: "realta",
    title: "Realta",
    description: "AML compliance platform for secure data handling.",
    longDescription:
      "Currently building a next-generation Anti-Money Laundering compliance platform at Realta. The system handles highly sensitive financial data and serves compliance officers who need to make critical decisions rapidly. Strong focus on secure user flows, data clarity, and a maintainable micro-frontend architecture.",
    role: "Senior Frontend Developer",
    year: "2024 – Present",
    tags: ["React", "TypeScript", "Microfrontends", "shadcn/ui", "Security"],
    color: "#8b5cf6",
    position: [-100, -30, -200],
    highlights: [
      "Architected a micro-frontend system enabling true team-level autonomy",
      "Built auditable, secure user flows for AML case management",
      "Led company-wide UI design system adoption using shadcn/ui",
    ],
  },
]
