import { ThemeToggle } from "@graftwork/ui";

/** A sticky header. The scroll-padding tokens keep focused elements clear of it. */
export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-default bg-surface-raised">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-4 px-4 py-3">
        <p className="text-lg font-semibold">Graftwork app</p>
        <ThemeToggle />
      </div>
    </header>
  );
}
