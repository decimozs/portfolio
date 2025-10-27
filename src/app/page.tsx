import Navlinks from "@/components/nav-links";
import Projects from "@/components/projects";
import SquareText from "@/components/square-text";

export default function App() {
  return (
    <main className="w-full flex justify-center p-4 relative overflow-hidden">
      <div className="w-full flex flex-col gap-8 max-w-screen-sm md:pt-[5rem]">
        <div className="flex flex-col gap-4">
          <div className="flex flex-row items-center justify-between">
            <h1 className="font-semibold lg:text-xl">Marlon Martin</h1>
            <SquareText className="bg-indigo-400/20 text-indigo-500">
              v4
            </SquareText>
          </div>
          <p>
            Hey, I’m Marlon Martin a Software Developer based in Manila. I love
            building things that actually make a difference from scalable
            backend systems to creative side projects. I’m also an open-source
            contributor who enjoys sharing what I learn and collaborating with
            the dev community.
          </p>
          <Navlinks />
        </div>
        <Projects />
      </div>
    </main>
  );
}
