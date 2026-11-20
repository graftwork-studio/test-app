import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";

/** Pages with the site header and a centred column. Full-screen tools such as /chat sit outside this group. */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main id="main" className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-8">
        {children}
      </main>
    </>
  );
}
