import React from "react";
import { contactItems } from "@/utils/constants";
import Link from "next/link";

export default function Socials() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <p>Socials</p>
        <div className="flex flex-col">
          {contactItems.map((item, index) => (
            <Link
              href={item.href}
              key={index + 1}
              target={item.label === "Email" ? "_self" : "_blank"}
              rel="noreferrer"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
