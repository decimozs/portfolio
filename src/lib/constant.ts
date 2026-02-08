interface NavItem {
  id: string;
  label: string;
  href: string;
}

export const navItems: NavItem[] = [
  {
    id: "index",
    label: "Index",
    href: "/",
  },
  {
    id: "works",
    label: "Work",
    href: "/works",
  },
  {
    id: "experience",
    label: "Experience",
    href: "/experience",
  },
  {
    id: "notebooks",
    label: "Notebook",
    href: "/notebooks",
  },

  {
    id: "resume",
    label: "Resume",
    href: "/resume.pdf",
  },
] as const;

interface SocialItem extends NavItem {}

export const socialItems: SocialItem[] = [
  {
    id: "email",
    label: "@email/decimomartin",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=marlonadiguemartin548@gmail.com",
  },
  {
    id: "github",
    label: "@github/decimozs",
    href: "https://github.com/decimozs",
  },
  {
    id: "LinkedIn",
    label: "@in/decimomartin",
    href: "https://www.linkedin.com/in/decimomartin/",
  },
];

export interface Highlight {
  text: string;
  href: string;
}

interface ProjectAward {
  place: string;
  event: string;
  date: string;
  role: string;
}

interface ProjectItem {
  title: string;
  description: string;
  link: string;
  category: string[];
  highlights?: Highlight[];
  awards?: ProjectAward[];
}

export const projectItems: ProjectItem[] = [
  {
    title: "Vantage",
    description:
      'A local-first, high-precision resume intelligence engine engineered to uncover the "why" behind career performance, analyzes skill density and industry alignment providing data-driven insights without sensitive data ever leaving your local environment.',
    link: "https://github.com/decimozs/vantage-cv",
    category: [
      "Automation",
      "Agentic AI",
      "Retrieval-Augmented Generation",
      "N8N",
      "Ollama",
      "Gemini",
    ],
  },
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
    awards: [
      {
        event: "14th IT Skills Olympics - IoT Category",
        role: "Lead Software Engineer & Team Leader",
        place: "1st Runner-Up",
        date: "November 2025",
      },
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

export interface ExperienceItem {
  title: string;
  company: string;
  startDate: Date;
  endDate?: Date;
  description: string[];
}

export const experienceItems: ExperienceItem[] = [
  {
    title: "Freelance",
    company: "Software Engineer (Backend Engineer)",
    startDate: new Date(2024, 5),
    endDate: new Date(2026, 1),
    description: [
      "Built a robust lending infrastructure using Domain-Driven Design (DDD) principles and patterns featuring idempotent transaction processing and an automated interest engine. Implemented a state-machine audit system ensuring 100% lifecycle traceability and high concurrency through a decoupled Service-Repository architecture.",
      "Engineered a secure, test-driven API infrastructure utilizing atomic transactions and a hybrid RBAC/PBAC security model, ensuring granular access control and system reliability through an automated testing suite for complex financial logic.",
      "Architected and automated CI/CD workflows using GitHub Actions and Turborepo, implementing remote caching to eliminate redundant build tasks. Optimized the global build-to-deployment pipeline from 41 minutes to under 5 minutes (an 87% reduction), ensuring zero-downtime releases to Cloudflare Workers and significantly reducing CI/CD compute overhead.",
      "Architected and deployed a specialized crochet e-commerce platform using TypeScript, Next.js, and Supabase, migrating the business from fragmented social media sales to a centralized, high-performance web solution.",
      "Built a disaster management system for a local Barangay, featuring centralized incident logging and optimized data workflows to ensure high availability and rapid information dispatch during disaster scenarios.",
    ],
  },

  {
    title: "Binspire",
    company: "Founder & Lead Software Engineer",
    startDate: new Date(2023, 9),
    endDate: new Date(2026, 1),
    description: [
      "Engineered an IoT-enabled waste management system for Arcovia City featuring real-time monitoring, GPS tracking, and object detection via Raspberry Pi, optimized collection routes and reduced operational costs using MQTT and WebSockets.",
      "Reduced IoT module startup time by 90% (from several minutes to <10 seconds) by restructuring the boot sequence with async/await and threaded execution, significantly improving system uptime and hardware reliability.",
      "Architected a custom MCP (Model Context Protocol) Server that exposes Binspire API data as executable tools for LLMs, enabling automated auditing, issue resolution, and historical tracking.",
      "Integrated Binspire AI Agent with multi-model orchestration capabilities, leveraging the MCP server to perform autonomous data analysis and data-driven decision-making for waste management logistics.",
      "Implemented QR-code verification for collection logs, ensuring 100% accountability in waste retrieval activities through a secure, sensor-driven validation pipeline.",
    ],
  },
  {
    title: "Open Source Software Developer",
    company: "Contributor & Maintainer",
    startDate: new Date(2023, 0),
    description: [
      "Contributed to the Model Context Protocol (MCP) specifications within the LangChain ecosystem, specifically defining HTTP transport mechanisms for server-side weather integrations to ensure predictable request-response cycles.",
      "Engineered a controlled data flow pattern for search systems, implementing URL-persisted state using nuqs. This ensured strict synchronization between the client-side state and backend query parameters, improving the reliability of filtered data fetching.",
      "Developed centralized utility layers in TypeScript to standardize data transformation and category formatting. This reduced technical debt by abstracting business logic away from the presentation layer and ensuring data consistency across multiple services.",
      "Diagnosed and resolved synchronization conflicts between third-party geospatial libraries and application state. Improved system stability by managing event propagation and removing redundant control logic.",
      "Authored and refined technical documentation for core AI orchestration frameworks, focusing on clarifying server-to-server communication headers and setup procedures for global developers.",
    ],
  },
  {
    title: "Hello World!",
    company: "Student",
    startDate: new Date(2019, 11),
    description: ["Wrote my first line of code."],
  },
];

export interface NotebookItem {
  title: string;
  description: string;
  link: {
    label: string;
    href: string;
  }[];
  category: string[];
  date: Date;
}

export const notebookItems: NotebookItem[] = [
  {
    title: "Agentic Design Patterns",
    description:
      "Exploring the frontier of AI autonomy. Inspired by Antonio Gulli, this notebook synthesizes the architectural patterns required to move beyond simple prompts toward multi-agent coordination and ethical autonomous frameworks.",
    link: [
      {
        label: "@github.com/decimozs/agentic-design-patterns-notebook",
        href: "https://github.com/decimozs/agentic-design-patterns-notebook",
      },
      {
        label: "@github.com/sarwarbeing-ai/Agentic_Design_Patterns",
        href: "https://github.com/sarwarbeing-ai/Agentic_Design_Patterns",
      },
    ],
    category: [
      "Artificial Intelligence",
      "Architecture",
      "Agents",
      "Retrieval-Augmented Generation",
    ],
    date: new Date(2025, 8),
  },
  {
    title: "Competitive Programming",
    description:
      "A deep dive into algorithmic efficiency. This entry chronicles my journey through complex problem-solving, documenting the evolution of my logic from academic machine problems to optimized competitive solutions.",
    link: [
      {
        label: "@github.com/decimozs/arsenals",
        href: "https://github.com/decimozs/arsenals",
      },
      {
        label: "@github.com/decimozs/leetcode-arsenals",
        href: "https://github.com/decimozs/leetcode-arsenals",
      },
      {
        label: "@github.com/decimozs/hacker-rank-arsenals",
        href: "https://github.com/decimozs/hacker-rank-arsenals",
      },
      {
        label: "@github.com/decimozs/practice-plp-itskills-problemsets",
        href: "https://github.com/decimozs/practice-plp-itskills-problemsets",
      },
    ],
    category: [
      "Algorithms",
      "Problem Solving",
      "Data Structures",
      "Big O Notation",
    ],
    date: new Date(2023, 6),
  },
  {
    title: "SWE Principles",
    description:
      "The blueprint of quality code. I’ve consolidated my self-guided study of fundamental engineering principles here, creating a central knowledge base for the patterns and practices that separate 'coding' from 'engineering'.",
    link: [
      {
        label: "@github.com/decimozs/swe-notebook",
        href: "https://github.com/decimozs/swe-notebook",
      },
    ],
    category: ["Software Engineering", "Fundamentals"],
    date: new Date(2023, 6),
  },
  {
    title: "Coding Interview University",
    description:
      "My personal translation of John Washam’s famous roadmap. This isn't just a checklist; it's a rigorous documentation of my transition from a student to an interview-ready engineer, focusing on Computer Science depth.",
    link: [
      {
        label: "@github.com/decimozs/software-engineering-notebook",
        href: "https://github.com/decimozs/software-engineering-notebook",
      },
      {
        label: "@github.com/jwasham/coding-interview-university",
        href: "https://github.com/jwasham/coding-interview-university",
      },
      {
        label: "@github.com/decimozs/software-engineering-roadmap",
        href: "https://github.com/decimozs/software-engineering-roadmap",
      },
    ],
    category: ["Computer Science", "Career Growth"],
    date: new Date(2023, 2),
  },
];
