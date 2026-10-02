import { Logo } from "./logo";


export function AuthHeader() {
  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-10">
        <Logo />
      </div>
    </header>
  );
}