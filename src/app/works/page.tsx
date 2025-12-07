import Link from "next/link";

export default function Works() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Link
          href="https://github.com/decimozs/haribon"
          target="_blank"
          referrerPolicy="no-referrer"
          className="w-fit underline"
        >
          Haribon
        </Link>
        <p>
          An autonomous{" "}
          <Link
            href="https://bettergov.ph/"
            className="italic text-muted-foreground"
          >
            BetterGov.ph
          </Link>{" "}
          agent that automates data gathering and delivers essential civic
          information for the citizen portal.
        </p>
        <div className="text-sm flex flex-row gap-2 flex-wrap">
          <p className="px-4 py-2 border border-black">Agentic AI</p>
          <p className="px-4 py-2 border border-black">Deep Agents</p>
          <p className="px-4 py-2 border border-black">LangGraph</p>
          <p className="px-4 py-2 border border-black">MCP</p>
          <p className="px-4 py-2 border border-black">
            Retrieval-Augmented Generation
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="https://www.binspire.space/"
          target="_blank"
          referrerPolicy="no-referrer"
          className="w-fit underline"
        >
          Binspire
        </Link>
        <p>
          A Smart Waste Management System (SWMS) designed for{" "}
          <Link
            href="https://arcoviacity.com.ph/"
            className="text-muted-foreground italic"
          >
            Arcovia City
          </Link>
          , that focus on improving the efficiency and transparency of waste
          collection.
        </p>
        <div className="text-sm flex flex-row gap-2 flex-wrap">
          <p className="px-4 py-2 border border-black">IoT</p>
          <p className="px-4 py-2 border border-black">HiveMQ</p>
          <p className="px-4 py-2 border border-black">Nginx</p>
          <p className="px-4 py-2 border border-black">Hono</p>
          <p className="px-4 py-2 border border-black">AWS</p>
          <p className="px-4 py-2 border border-black">MCP</p>
          <p className="px-4 py-2 border border-black">Azure AI</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="https://github.com/decimozs/hiraya"
          target="_blank"
          referrerPolicy="no-referrer"
          className="w-fit underline"
        >
          Hiraya
        </Link>
        <p>
          A Filipino-inspired programming language to explore language design,
          syntax parsing, and compiler construction, demonstrating solid
          expertise in compiler architecture, abstract machine design, and
          programming language theory.
        </p>
        <div className="text-sm flex flex-row gap-2 flex-wrap">
          <p className="px-4 py-2 border border-black">Lexical Analysis</p>
          <p className="px-4 py-2 border border-black">Abstract Syntax Tree</p>
          <p className="px-4 py-2 border border-black">Parsing</p>
          <p className="px-4 py-2 border border-black">Compiler Design</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="https://github.com/decimozs/predicting-carbon-monoxide-levels"
          target="_blank"
          referrerPolicy="no-referrer"
          className="w-fit underline"
        >
          Predicting Carbon Monoxide Levels
        </Link>
        <p>
          A machine learning powered CO prediction system that analyzes
          environmental sensor data to forecast carbon monoxide levels with high
          accuracy, enabling improved real-time air quality monitoring and
          supporting data-driven public
        </p>
        <div className="text-sm flex flex-row gap-2 flex-wrap">
          <p className="px-4 py-2 border border-black">UCI</p>
          <p className="px-4 py-2 border border-black">Pandas</p>
          <p className="px-4 py-2 border border-black">NumPy</p>
          <p className="px-4 py-2 border border-black">Matplotlib</p>
          <p className="px-4 py-2 border border-black">Seaborn</p>
          <p className="px-4 py-2 border border-black">Scikit-learn</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <Link
          href="https://github.com/decimozs/art-cli"
          target="_blank"
          referrerPolicy="no-referrer"
          className="w-fit underline"
        >
          ART
        </Link>
        <p>
          A execution time measurement, profiling and efficiency analysis to
          evaluate algorithmic complexity in practice.
        </p>
        <div className="text-sm flex flex-row gap-2 flex-wrap">
          <p className="px-4 py-2 border border-black">
            Data Structures & Algorithms
          </p>
          <p className="px-4 py-2 border border-black">Big O Notation</p>
          <p className="px-4 py-2 border border-black">Benchmarking</p>
          <p className="px-4 py-2 border border-black">CLI</p>
        </div>
      </div>

      <div>
        <Link
          href="https://github.com/decimozs?tab=repositories"
          target="_blank"
          referrerPolicy="no-referrer"
          className="underline w-fit"
        >
          View More on GitHub
        </Link>
      </div>
    </div>
  );
}
