import { Suspense } from "react";
import Home from "./_components/home";

export default function App() {
  return (
    <Suspense>
      <Home />
    </Suspense>
  );
}
