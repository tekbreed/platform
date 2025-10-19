import { useMobileNav } from "@repo/utils/providers/mobile-nav";

import { Button } from "@/components/button";
import { Separator } from "@/components/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/dropdown-menu";
import { Icons } from "@/composed/icons";
import { SmartLink } from "@/composed/smart-link";
import { ThemeToggle } from "@/composed/theme-toggle";

import { getModuleUrl } from "@repo/utils/constants/client";

import { getImgSrc } from "@repo/utils/misc";
import { useRedirectTo } from "@repo/utils/hooks/use-redirect-to";

export function AuthButtons() {
  // const user = useOptionalUser();
  const redirectTo = useRedirectTo();
  const { openMobileNav } = useMobileNav();

  // const image = user?.image;
  // const userIsAdmin = userHasRole(user, "ADMIN");

  const user = null;
  // const image = null;
  const userIsAdmin = false;

  return (
    <div className="flex items-center gap-4">
      <ThemeToggle />
      {!user ? (
        <Button className="hidden lg:flex" asChild>
          <SmartLink to={getModuleUrl("web", `signin?${redirectTo}`)}>
            Sign In
          </SmartLink>
        </Button>
      ) : null}
      {userIsAdmin ? (
        <Button size={"icon"} variant={"outline"} asChild>
          <SmartLink to={getModuleUrl("admin")}>
            <Icons.doorClosed />
          </SmartLink>
        </Button>
      ) : null}
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger className="hidden lg:block" asChild>
            <Avatar className="size-8 cursor-pointer border border-border">
              <AvatarImage
                src={getImgSrc({
                  // fileKey: image?.fileKey,
                  // seed: user.name,
                })}
                // alt={user.name}
              />
              <AvatarFallback className="border border-border">
                Christopher Aondona
                {/* {getInitials(user.name)} */}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem asChild>
              <SmartLink
                to={getModuleUrl("web", "profile")}
                className="font-bold"
              >
                <Icons.userPen className="mr-2 size-4" /> Profile
              </SmartLink>
            </DropdownMenuItem>
            <Separator className="my-1" />
            {/* <SignoutButton /> */}
          </DropdownMenuContent>
        </DropdownMenu>
      ) : null}

      <Button
        size={"icon"}
        variant={"ghost"}
        className="block lg:hidden"
        onClick={openMobileNav}
      >
        <Icons.menu className="size-10" />
      </Button>
    </div>
  );
}
