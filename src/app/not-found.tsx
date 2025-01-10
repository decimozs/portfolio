import Link from "next/link";

export default function NotFound() {
  return (
    <main className="w-full h-screen fixed top-0 left-0">
      <div className="mt-[-1.2rem] text-[8rem] flex flex-col p-4">
        <p>404</p>
        <p className="mt-[-2rem]">Page</p>
        <p className="mt-[-2rem]">Not</p>
        <p className="mt-[-2rem]">Found.</p>
      </div>
      <Link
        href="/"
        className="text-accent fixed bottom-4 left-4 hover:text-secondary transition duration-300 ease-in-out"
      >
        Return
      </Link>
    </main>
  );
}
