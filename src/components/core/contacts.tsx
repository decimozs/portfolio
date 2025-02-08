import { contactItems } from "@/utils/constants";
import { LinkType } from "@/utils/types";
import Link from "next/link";
import React from "react";

const ContactLink = ({ href, label }: LinkType) => {
  return (
    <Link
      href={href}
      target={label === "Email" ? "_self" : "_blank"}
      rel="noreferrer"
      className="text-accent hover:text-secondary transition duration-300 ease-in-out flex flex-row items-center gap-1"
    >
      {label}
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="lucide lucide-arrow-up-right"
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </Link>
  );
};

const ContactItem = () => {
  return (
    <>
      {contactItems.map((item, index) => (
        <ContactLink href={item.href} key={index + 1} label={item.label} />
      ))}
    </>
  );
};

export default function Contacts() {
  return (
    <div className="flex flex-row gap-4">
      <ContactItem />
    </div>
  );
}
