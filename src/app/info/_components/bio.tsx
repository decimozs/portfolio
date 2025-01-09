import Separator from "@/components/ui/separator";
import { contactItems } from "@/utils/constants";
import Image from "next/image";
import Link from "next/link";

export default function Bio() {
  return (
    <>
      <div className="px-4 text-[1.25rem] lg:text-[2rem] flex flex-col gap-6 md:grid md:grid-cols-2">
        <div className="w-full flex flex-col gap-2 md:order-last lg:h-[600px]">
          <Image
            src="/images/pfp.jpg"
            width={500}
            height={500}
            alt="Pogi"
            className="grayscale hover:grayscale-0 transition duration-300 object-center md:object-contain lg:ml-auto"
          />
          <div className="flex flex-col gap-1 mr-auto lg:mr-0 lg:ml-auto lg:mt-2 lg:gap-2">
            <Link
              href="https://www.instagram.com/decimomrtn/"
              target="_blank"
              className="text-accent text-[1rem] lg:text-[1.25rem]"
            >
              @decimomrtn
            </Link>
            <span className="block w-full h-[1px] bg-accent"></span>
          </div>
        </div>
        <div className="flex flex-col gap-6 w-full md:order-1 xl:">
          <p>
            Hello, I&apos;m Marlon Martin. I&apos;m a Manila-based Software
            Developer passionate about building innovative, scalable, and
            resilient software solutions that make a real-world impact.
          </p>
          <p>
            Currently, I&apos;m the Lead Developer at Binspire, where I focus on
            cutting-edge technologies like IoT, cloud computing, and leading the
            development of Hiraya, a Filipino-inspired programming language. My
            professional journey also includes a stint as a Full-Stack Developer
            at Faithful Threads. Now, I undertake freelance projects, helping
            clients bring their visions to life through robust and reliable
            software solutions.
          </p>
          <p>
            I&apos;m also pursuing a Bachelor of Science in Information
            Technology at the Pamantasan ng Lungsod ng Pasig, with a focus on
            software engineering and systems design. My mission is to combine
            technical expertise and creativity to develop tools that empower
            individuals and drive business success.
          </p>
          <p>
            Beyond the keyboard, I&apos;m an avid explorer of ideas and culture.
            You might find me diving into emerging technologies, representing my
            school as an esports varsity player and bringing home gold and
            bronze medals, or running through Manila&apos;s vibrant streets
            every morning or evening. I&apos;m always open to engaging in
            meaningful discussions about technology, culture, or a great cup of
            coffee!
          </p>

          <Separator />

          <p>Experience</p>

          <div className="flex flex-col text-accent">
            <div className="flex flex-row items-center gap-2 text-secondary">
              <p>Freelance </p>
              <p>—</p>
              <p>Software Developer</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>June 2024</p>
              <p>—</p>
              <p>Present</p>
            </div>

            <p>Remote</p>
          </div>

          <Separator />

          <p>Education</p>

          <div className="flex flex-col text-accent">
            <p className="text-black">Pamantasan ng Lungsod ng Pasig</p>
            <div className="flex flex-row items-center gap-2">
              <p>2022</p>
              <p>—</p>
              <p>Present</p>
            </div>
            <p>BS Information Technology</p>
            <p>Dean&apos;s Lister</p>
          </div>

          <div className="flex flex-col text-accent">
            <p className="text-black">Rizal High School</p>
            <p>Class of 2022</p>
            <div className="flex flex-row items-center gap-2">
              <p>TVL</p>
              <p>—</p>
              <p>ICT Programming</p>
            </div>
            <p>Best Research Presenter</p>
            <p>Overall Best System</p>
            <p>Best System Design</p>
            <p>Best System Functionality</p>
            <p>NC II Passer</p>
          </div>

          <Separator />

          <p>Workflow</p>

          <div className="text-accent">
            <div className="flex flex-row items-center gap-2">
              <p>Linux</p>
              <p>—</p>
              <p>Operating System</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Zsh</p>
              <p>—</p>
              <p>Shell</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Neovim</p>
              <p>—</p>
              <p>Text Editor & Code Editor</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Obsidian</p>
              <p>—</p>
              <p>Note-Taking</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>GitHub</p>
              <p>—</p>
              <p>Project Repository</p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Docker</p>
              <p>—</p>
              <p>Containerization </p>
            </div>
            <div className="flex flex-row items-center gap-2">
              <p>Figma</p>
              <p>—</p>
              <p>Design & Prototyping</p>
            </div>
          </div>

          <Separator />

          <p>Status</p>

          <div className="flex flex-col text-accent gap-2">
            <p>
              + Training for an upcoming marathon, pushing my limits every day.
            </p>
            <p>
              + Deepening my understanding of compilers and their inner
              workings.
            </p>
            <p>
              + Contributing to open-source projects to expand my skills and
              give back to the community.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-accent px-4 py-8 text-white text-[0.75rem] grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <p>Socials</p>
          <div className="flex flex-col">
            {contactItems.map((item, index) => (
              <Link href={item.href} key={index + 1}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <p>Credits</p>
          <div className="flex flex-col">
            <p>Made by Marlon Martin</p>
            <p>Copyright © 2025.</p>
            <p>Salamat sa pagbisita!</p>
          </div>
        </div>
      </div>
    </>
  );
}
