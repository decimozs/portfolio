import { useCallback, useEffect, useState } from "react";
import { navItems, socialItems } from "@/lib/constant";

function NavLink({
  item,
  pathname,
  onClick,
  className,
}: {
  item: { id: string; label: string; href: string };
  pathname: string;
  onClick?: () => void;
  className?: string;
}) {
  const isActive = pathname === item.href;
  const isResume = item.id === "resume";

  return (
    <a
      href={item.href}
      key={item.id}
      className={`w-fit transition-all duration-300 ease-in-out ${className ?? ""} ${
        isActive
          ? "cursor-default"
          : "text-muted-foreground cursor-pointer hover:text-black"
      }`}
      target={isResume ? "_blank" : undefined}
      rel={isResume ? "noopener noreferrer" : undefined}
      onClick={onClick}
    >
      {item.label}
    </a>
  );
}

function SocialLink({
  item,
  className,
}: {
  item: { id: string; label: string; href: string };
  className?: string;
}) {
  return (
    <a
      href={item.href}
      key={item.id}
      className={`text-muted-foreground w-fit transition-all duration-300 ease-in-out hover:text-black ${className ?? ""}`}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => {
        // biome-ignore lint/suspicious/noExplicitAny: PostHog loaded via inline snippet
        (window as any).posthog?.capture("social_link_clicked", {
          platform: item.id,
          label: item.label,
          source: "hamburger",
        });
      }}
    >
      {item.label}
    </a>
  );
}

export default function Hamburger({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => {
      if (!prev) {
        // biome-ignore lint/suspicious/noExplicitAny: PostHog loaded via inline snippet
        (window as any).posthog?.capture("hamburger_menu_opened");
      }
      return !prev;
    });
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".hamburger-menu") &&
        !target.closest(".hamburger-button")
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [open]);

  return (
    <>
      <div className="fixed top-6 right-6 z-50 xl:hidden">
        <button
          type="button"
          className="flex flex-col gap-1 p-4 bg-accent hamburger-button"
          onClick={toggleMenu}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-5 bg-black" />
          <span className="block h-0.5 w-5 bg-black" />
        </button>
      </div>

      {open && (
        <div className="fixed top-0 left-0 w-full h-screen z-40 bg-white p-6 text-2xl xl:hidden hamburger-menu">
          <div className="flex flex-col gap-6 mt-1">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.id}
                  item={item}
                  pathname={pathname}
                  onClick={toggleMenu}
                />
              ))}
            </div>
            <div className="flex flex-col gap-1">
              {socialItems.map((item) => (
                <SocialLink key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
