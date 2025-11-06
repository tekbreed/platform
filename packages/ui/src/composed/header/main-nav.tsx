"use client";

import { learning, services, platform } from "@repo/utils/constants/client";
import { Logo } from "@/composed/logo";
import { Icons } from "@/composed/icons";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/dropdown-menu";
import { SmartLink } from "../smart-link";

export function MainNav() {
  return (
    <div className="flex gap-6">
      <Logo />
      <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
        <div className="hidden items-center gap-6 lg:flex">
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden items-center gap-1 px-2 py-1 font-semibold focus:border-none lg:flex">
              Learning
              <Icons.chevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {learning.map((link) => {
                const Icon = link.icon;
                return (
                  <DropdownMenuItem key={link.name} asChild>
                    <SmartLink
                      to={link.path}
                      className="flex items-center gap-2 font-bold capitalize"
                    >
                      {Icon ? <Icon className="size-4" aria-hidden /> : null}
                      {link.name}
                    </SmartLink>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger className="hidden items-center gap-1 px-2 py-1 font-semibold focus:border-none lg:flex">
              Services
              <Icons.chevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-48">
              {services.map((link) => {
                // const Icon = link.icon;
                return (
                  <DropdownMenuItem key={link.name} asChild>
                    <SmartLink
                      to={link.path}
                      className="flex items-center gap-2 font-bold capitalize"
                    >
                      {/* {Icon ? <Icon className="size-4" aria-hidden /> : null} */}
                      {link.name}
                    </SmartLink>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </DropdownMenu>
          {platform.map((link) => (
            <SmartLink
              key={link.name}
              to={link.path}
              className="font-semibold capitalize"
            >
              {link.name}
            </SmartLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
