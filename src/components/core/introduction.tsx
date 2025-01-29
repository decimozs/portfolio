import Link from "next/link";

export default function Introduction() {
  return (
    <>
      <p>
        Hello, I&apos;m Marlon Martin. I&apos;m a Manila-based Software
        Developer passionate about building innovative, scalable, and resilient
        software solutions that make a real-world impact.
      </p>
      <p>
        Currently, I&apos;m the Lead Developer at Binspire, where I focus on
        cutting-edge technologies like IoT, cloud computing, and leading the
        development of Hiraya, a Filipino-inspired programming language. My
        professional journey also includes a stint as a Full-Stack Developer at
        Faithful Threads. Now, I undertake freelance projects, helping clients
        bring their visions to life through robust and reliable software
        solutions.
      </p>
      <p>
        I&apos;m also pursuing a Bachelor of Science in Information Technology
        at the Pamantasan ng Lungsod ng Pasig, with a focus on software
        engineering and systems design. My mission is to combine technical
        expertise and creativity to develop tools that empower individuals and
        drive business success.
      </p>
      <p>
        Beyond the keyboard, I&apos;m an avid explorer of ideas and culture. You
        might find me diving into emerging technologies, representing my school
        as an esports varsity player and bringing medals, or running through
        Manila&apos;s vibrant streets every morning or evening. I&apos;m always
        open to engaging in meaningful discussions about technology, culture, or
        even having a great run with me!
      </p>
      <p>
        I'm currently open to side projects. Feel free to{" "}
        <span className="relative">
          <span className="w-full h-[2px] bg-black absolute bottom-0"></span>
          <Link href="mailto:marlonadiguemartin548@gmail.com">email</Link>
        </span>{" "}
        me if you'd like to start a project together.
      </p>
    </>
  );
}
