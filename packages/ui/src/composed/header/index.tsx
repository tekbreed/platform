import React from "react";
import { MainNav } from "./main-nav";
import { AuthButtons } from "./auth-buttons";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <nav className="flex items-center">
            {/* {social.map((item) => {
              const Icon = Icons[item.icon as keyof typeof Icons];
              return (
                <Button key={item.name} variant="ghost" size="sm" asChild>
                  <Link to={item.path} target="_blank" rel="noreferrer">
                    <Icon className="size-4" aria-hidden />
                    <VisuallyHidden>{item.name}</VisuallyHidden>
                  </Link>
                </Button>
              );
            })} */}
            <AuthButtons />
          </nav>
        </div>
      </div>
    </header>
  );
}
