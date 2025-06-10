import Navlinks from "@/components/nav-links";
import Projects from "@/components/projects";
import SquareText from "@/components/square-text";

export default function App() {
  return (
    <main className="w-full flex justify-center p-4 relative overflow-hidden">
      <div className="w-full flex flex-col gap-8 max-w-screen-sm md:pt-[5rem]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-semibold">Marlon Martin</h1>
            <SquareText className="bg-indigo-400/20 text-indigo-500">
              v4
            </SquareText>
          </div>
          <p>
            Hello, I&apos;m Marlon Martin. I&apos;m a Manila-based Software
            Developer passionate about building innovative, scalable, and
            resilient software solutions that make a real-world impact
            specializing in backend development.
          </p>
          <Navlinks />
        </div>
        <Projects />
      </div>
    </main>
  );
}
