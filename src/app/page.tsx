import Link from "next/link";

export default function App() {
  return (
    <>
      <p>
        {`Based in Manila. I love building things that actually make a difference from scalable backend systems to creative side projects. I’m also an open-source contributor who enjoys sharing what I learn and collaborating with the dev community.`}
      </p>
      <p className="my-4">
        I started coding at 15 writing HTML, CSS, and JavaScript on my phone.
        That early curiosity pushed me beyond the web and into low-level
        projects like building compilers and even creating my own programming
        language{" "}
        <Link
          className="italic text-muted-foreground hover:text-black hover:underline"
          href="https://github.com/decimozs/hiraya"
          target="_blank"
          referrerPolicy="no-referrer"
        >
          @Hiraya
        </Link>
        . Along the way, I discovered my love for backend engineering and for
        building systems that solve real problems.
      </p>
      <p>
        {`Right now, I’m really into building backend pipelines with agentic AI and MCP servers. It’s exciting seeing traditional backend engineering evolve into something more intelligent and dynamic.`}
      </p>
      <div className="flex flex-col gap-2 mt-4 lg:hidden">
        <Link href="/works" className="underline w-fit">
          Works
        </Link>
        <Link
          href="/resume.pdf"
          target="_blank"
          referrerPolicy="no-referrer"
          className="underline w-fit"
        >
          Resume
        </Link>
        <Link
          href="https://www.linkedin.com/in/decimomartin/"
          target="_blank"
          referrerPolicy="no-referrer"
          className="underline w-fit"
        >
          LinkedIn
        </Link>
        <Link
          href="https://github.com/decimozs"
          target="_blank"
          referrerPolicy="no-referrer"
          className="underline w-fit"
        >
          GitHub
        </Link>
      </div>
    </>
  );
}
