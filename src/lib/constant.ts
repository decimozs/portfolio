export interface Highlight {
  text: string;
  href: string;
}

interface NavItem {
  id: string;
  linkText: string;
  href: string;
  svgPath: string;
}

export const navItems: NavItem[] = [
  {
    id: "resume",
    linkText: "Resume",
    href: "/resume.pdf",
    svgPath:
      "M41.70703,13.79297l-11.5,-11.5c-0.1875,-0.1875 -0.44141,-0.29297 -0.70703,-0.29297h-18.00781c-1.92578,0 -3.49219,1.5625 -3.49219,3.48047v38.42188c0,2.25781 1.84375,4.09766 4.11328,4.09766h25.77344c2.26953,0 4.11328,-1.83984 4.11328,-4.09766v-29.40234c0,-0.26562 -0.10547,-0.51953 -0.29297,-0.70703zM26,38h-9v-2h9zM33,34h-16v-2h16zM33,30h-16v-2h16zM33,26h-16v-2h16zM31.66797,14c-0.92187,0 -1.66797,-0.74609 -1.66797,-1.66797v-7.41797l9.08594,9.08594z",
  },
  {
    id: "linkedin",
    linkText: "LinkedIn",
    href: "https://www.linkedin.com/in/decimomartin/",
    svgPath:
      "M41,4h-32c-2.76,0 -5,2.24 -5,5v32c0,2.76 2.24,5 5,5h32c2.76,0 5,-2.24 5,-5v-32c0,-2.76 -2.24,-5 -5,-5zM17,20v19h-6v-19zM11,14.47c0,-1.4 1.2,-2.47 3,-2.47c1.8,0 2.93,1.07 3,2.47c0,1.4 -1.12,2.53 -3,2.53c-1.8,0 -3,-1.13 -3,-2.53zM39,39h-6c0,0 0,-9.26 0,-10c0,-2 -1,-4 -3.5,-4.04h-0.08c-2.42,0 -3.42,2.06 -3.42,4.04c0,0.91 0,10 0,10h-6v-19h6v2.56c0,0 1.93,-2.56 5.81,-2.56c3.97,0 7.19,2.73 7.19,8.26z",
  },
  {
    id: "github",
    linkText: "Github",
    href: "https://github.com/decimozs",
    svgPath:
      "M17.791,46.836c0.711,-0.306 1.209,-1.013 1.209,-1.836v-5.4c0,-0.197 0.016,-0.402 0.041,-0.61c-0.014,0.004 -0.027,0.007 -0.041,0.01c0,0 -3,0 -3.6,0c-1.5,0 -2.8,-0.6 -3.4,-1.8c-0.7,-1.3 -1,-3.5 -2.8,-4.7c-0.3,-0.2 -0.1,-0.5 0.5,-0.5c0.6,0.1 1.9,0.9 2.7,2c0.9,1.1 1.8,2 3.4,2c2.487,0 3.82,-0.125 4.622,-0.555c0.934,-1.389 2.227,-2.445 3.578,-2.445v-0.025c-5.668,-0.182 -9.289,-2.066 -10.975,-4.975c-3.665,0.042 -6.856,0.405 -8.677,0.707c-0.058,-0.327 -0.108,-0.656 -0.151,-0.987c1.797,-0.296 4.843,-0.647 8.345,-0.714c-0.112,-0.276 -0.209,-0.559 -0.291,-0.849c-3.511,-0.178 -6.541,-0.039 -8.187,0.097c-0.02,-0.332 -0.047,-0.663 -0.051,-0.999c1.649,-0.135 4.597,-0.27 8.018,-0.111c-0.079,-0.5 -0.13,-1.011 -0.13,-1.543c0,-1.7 0.6,-3.5 1.7,-5c-0.5,-1.7 -1.2,-5.3 0.2,-6.6c2.7,0 4.6,1.3 5.5,2.1c1.699,-0.701 3.599,-1.101 5.699,-1.101c2.1,0 4,0.4 5.6,1.1c0.9,-0.8 2.8,-2.1 5.5,-2.1c1.5,1.4 0.7,5 0.2,6.6c1.1,1.5 1.7,3.2 1.6,5c0,0.484 -0.045,0.951 -0.11,1.409c3.499,-0.172 6.527,-0.034 8.204,0.102c-0.002,0.337 -0.033,0.666 -0.051,0.999c-1.671,-0.138 -4.775,-0.28 -8.359,-0.089c-0.089,0.336 -0.197,0.663 -0.325,0.98c3.546,0.046 6.665,0.389 8.548,0.689c-0.043,0.332 -0.093,0.661 -0.151,0.987c-1.912,-0.306 -5.171,-0.664 -8.879,-0.682c-1.665,2.878 -5.22,4.755 -10.777,4.974v0.031c2.6,0 5,3.9 5,6.6v5.4c0,0.823 0.498,1.53 1.209,1.836c9.161,-3.032 15.791,-11.672 15.791,-21.836c0,-12.682 -10.317,-23 -23,-23c-12.683,0 -23,10.318 -23,23c0,10.164 6.63,18.804 15.791,21.836z",
  },
] as const;

interface ProjectItem {
  title: string;
  description: string;
  link: string;
  category: string[];
  highlights?: Highlight[];
}

export const projectItems: ProjectItem[] = [
  {
    title: "Base",
    description:
      "An opinionated, Full-Stack Monorepo @create-base-stack designed for high-performance applications. It leverages a strictly type-safe architecture to streamline development workflows and ensure end-to-end type integrity across the entire stack.",
    link: "https://github.com/decimozs/base",
    category: [
      "Framework",
      "Boilerplate",
      "Starter",
      "Monorepo",
      "Bun",
      "TypeScript",
    ],
    highlights: [
      {
        text: "@create-base-stack",
        href: "https://www.npmjs.com/package/create-base-stack",
      },
    ],
  },
  {
    title: "Haribon",
    description:
      "An autonomous BetterGov.ph agent that automates data gathering and delivers essential civic information for the citizen portal.",
    link: "https://github.com/decimozs/haribon",
    category: [
      "Agentic AI",
      "Deep Agents",
      "LangGraph",
      "MCP",
      "Retrieval-Augmented Generation",
    ],
    highlights: [
      {
        text: "BetterGov.ph",
        href: "https://bettergov.ph/",
      },
    ],
  },
  {
    title: "Binspire",
    description:
      "A Smart Waste Management System (SWMS) powered by real-time agents to make waste collection more efficient, sustainable, and transparent.",
    link: "https://www.binspire.space/",
    category: [
      "IoT",
      "HiveMQ",
      "Nginx",
      "Hono",
      "AWS",
      "MCP",
      "Azure AI",
      "LangGraph",
    ],
  },
  {
    title: "Hiraya",
    description:
      "A Filipino-inspired programming language to explore language design, syntax parsing, and compiler construction, demonstrating solid expertise in compiler architecture, abstract machine design, and programming language theory.",
    link: "https://github.com/decimozs/hiraya",
    category: [
      "Lexical Analysis",
      "Parsing",
      "Abstract Syntax Tree",
      "Code Generation",
      "Compiler Design",
    ],
  },

  {
    title: "Predicting Carbon Monoxide Levels",
    description:
      "A machine learning powered CO prediction system that analyzes environmental sensor data to forecast carbon monoxide levels with high accuracy, enabling improved real-time air quality monitoring and supporting data-driven public.",
    link: "https://github.com/decimozs/predicting-carbon-monoxide-levels",
    category: [
      "UCI",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
    ],
  },
  {
    title: "ART",
    description:
      "A execution time measurement, profiling and efficiency analysis to evaluate algorithmic complexity in practice.",
    link: "https://github.com/decimozs/art-cli",
    category: [
      "Data Structures & Algorithms",
      "Big O Notation",
      "Benchmarking",
      "CLI",
    ],
  },
];

interface SocialItem {
  social: string;
  label: string;
  link: string;
}

export const socialItems: SocialItem[] = [
  {
    social: "Github",
    label: "@github/decimozs",
    link: "https://github.com/decimozs",
  },
  {
    social: "LinkedIn",
    label: "@in/decimomartin",
    link: "https://www.linkedin.com/in/decimomartin/",
  },
  {
    social: "CodeWars",
    label: "@codewars/decimozs",
    link: "https://www.codewars.com/users/Decimoz",
  },
  {
    social: "LeetCode",
    label: "@leetcode/decimozs",
    link: "https://leetcode.com/u/dezwrld/",
  },
];
