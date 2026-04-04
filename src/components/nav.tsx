"use client";

import { navItems, socialItems } from "@/lib/constant";

export default function Nav({ pathname }: { pathname: string }) {
  return (
    <nav className="hidden xl:flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className={`w-fit text-lg transition-colors duration-200 ${
                pathname === item.href
                  ? "text-black cursor-default"
                  : "text-muted-foreground hover:text-black"
              }`}
              target={item.id === "resume" ? "_blank" : undefined}
              rel={item.id === "resume" ? "noopener noreferrer" : undefined}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-1">
          {socialItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="text-lg text-muted-foreground hover:text-black transition-colors duration-200 w-fit"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                // biome-ignore lint/suspicious/noExplicitAny: PostHog loaded via inline snippet
                (window as any).posthog?.capture("social_link_clicked", {
                  platform: item.id,
                  label: item.label,
                  source: "nav",
                });
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
