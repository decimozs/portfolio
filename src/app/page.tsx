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
        {`Right now, I’m really into building backend pipelines with agentic AI, MCP servers, exploring the latest LLM architectures and working as an backend engineer remotely. Outside of my workflow i enjoy running and currently preparing for my upcoming marathon.`}
      </p>
      <p className="my-4">
        To learn more about my background and professional experience, you can
        view my{" "}
        <span>
          <Link
            href="/resume.pdf"
            className="italic text-muted-foreground hover:text-black hover:underline"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            resume
          </Link>
        </span>
        . Additionally, to see my work in action, feel free to browse my{" "}
        <span>
          {" "}
          <Link
            href="/works"
            className="italic text-muted-foreground hover:text-black hover:underline"
          >
            works
          </Link>
        </span>
        , explore my contributions on{" "}
        <span>
          {" "}
          <Link
            href="https://github.com/decimozs"
            className="italic text-muted-foreground hover:text-black hover:underline"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            @github.com/decimozs
          </Link>
        </span>
        , or connect with me on
        <span>
          {" "}
          <Link
            href="https://www.linkedin.com/in/decimomartin/"
            className="italic text-muted-foreground hover:text-black hover:underline"
            target="_blank"
            referrerPolicy="no-referrer"
          >
            @in/decimomartin
          </Link>
        </span>
        .
      </p>
    </>
  );
}
