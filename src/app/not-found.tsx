import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full h-screen flex items-center justify-center flex-col gap-2">
      <p className="text-[2rem]">Page Not Found</p>
      <Link href="/" className="text-[1.25rem] underline">
        Return Index
      </Link>
    </main>
  );
}
