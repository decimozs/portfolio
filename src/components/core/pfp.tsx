import Link from "next/link";
import Image from "next/image";

export default function PFP() {
  return (
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
  );
}
