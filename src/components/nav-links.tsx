import { navItems } from "@/lib/constant";
import Link from "next/link";

export default function Navlinks() {
  return (
    <nav className="flex flex-row gap-4 font-light">
      {navItems.map((item) => (
        <div key={item.id} className="flex flex-row gap-2 items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="20"
            height="20"
            viewBox="0,0,256,256"
          >
            <g
              fill="#ffffff"
              fillRule="nonzero"
              stroke="none"
              strokeWidth="1"
              strokeLinecap="butt"
              strokeLinejoin="miter"
              strokeMiterlimit="10"
              strokeDasharray=""
              strokeDashoffset="0"
              fontFamily="none"
              fontWeight="none"
              fontSize="none"
              textAnchor="none"
              style={{ mixBlendMode: "normal" }} // Corrected for inline style object
            >
              <g transform="scale(5.12,5.12)">
                <path d={item.svgPath}></path> {/* Dynamic SVG path */}
              </g>
            </g>
          </svg>
          <Link href={item.href} target="_blank" rel="noreferrer">
            {item.linkText}
          </Link>{" "}
        </div>
      ))}
    </nav>
  );
}
