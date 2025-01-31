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
        engineering and system design. My goal is to blend technical expertise
        with creativity to tools that empower indviduals and drive business
        sucess.
      </p>
      <p>
        Beyond the keyboard, I&apos;m an avid explorer of ideas and culture. You
        might find me diving into emerging technologies, representing my school
        as an esports varsity player and bringing medals, or running through
        Manila&apos;s vibrant streets every morning or evening. I&apos;m always
        seeking new challenges. I&apos;m open to meaningful conversations-about
        technology, culture, or even having a great run with me.
      </p>
      <p>
        I&apos;m open to side projects. Feel free to{" "}
        <span className="relative">
          <span className="w-full h-[2px] bg-black absolute bottom-0"></span>
          <Link href="mailto:marlonadiguemartin548@gmail.com">email</Link>
        </span>{" "}
        me if you&apos;d like to start a project together.
      </p>
    </>
  );
}
