import Separator from "@/components/ui/separator";
import PFP from "./pfp";
import Introduction from "./introduction";
import Experience from "./experience";
import Education from "./education";
import Workflow from "./workflow";
import Status from "./status";
import Socials from "./socials";
import Credits from "./credits";
import Version from "./version";

export default function Profile() {
  return (
    <>
      <div className="px-4 text-[1.25rem] lg:text-[2rem] flex flex-col gap-6 md:grid md:grid-cols-2">
        <PFP />
        <div className="flex flex-col gap-6 w-full md:order-1 xl:">
          <Introduction />
          <Separator />
          <Experience />
          <Separator />
          <Education />
          <Separator />
          <Workflow />
          <Separator />
          <Status />
        </div>
      </div>
      <div className="mt-6 bg-accent px-4 py-8 text-white text-[0.75rem] grid grid-cols-2 gap-4 md:grid-cols-3">
        <Socials />
        <Credits />
        <Version />
      </div>
    </>
  );
}
