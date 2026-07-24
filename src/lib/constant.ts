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
    id: "blog",
    label: "Blog",
    href: "/blog",
  },

  {
    id: "resume",
    label: "Resume",
    href: "/resume.pdf",
  },
] as const;

interface SocialItem extends NavItem {
  platform?: string;
}

export const socialItems: SocialItem[] = [
  {
    id: "email",
    label: "@email/decimomartin",
    href: "https://mail.google.com/mail/?view=cm&fs=1&to=marlonadiguemartin548@gmail.com",
  },
  {
    id: "github",
    label: "@gh/decimozs",
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

export const starterPrompts: string[] = [
  "Decode Marlon's AI engineering playbook",
  "Show the architecture principles behind his work",
  "How does he keep agents grounded and safe?",
  "Connect his experiments to shipped systems",
  "What makes Marlon effective in AI systems?",
];
