import { Logo } from "./logo";
import { useLocation } from "react-router";
import { useOptionalUser } from "@repo/utils/hooks/user";
import { cn } from "@/lib/utils";
import { SubscriptionForm } from "./subscription-forms";
import { slogan } from "@repo/utils/constants/config";
import {
  content,
  learning,
  legal,
  platform,
  social,
} from "@repo/utils/constants/client";
import { SmartLink } from "./smart-link";

export function Footer() {
  const pathsToHideSubForm = [
    "signup",
    "signin",
    "forgot-password",
    "verify",
    "reset-password",
  ];

  const location = useLocation();
  const user = useOptionalUser();
  const hideSubForm = pathsToHideSubForm.some((path) =>
    location.pathname.includes(path),
  );

  const hideFooter = location.pathname.includes("chat");

  return (
    <div
      className={cn("pt-4", {
        "p hidden": hideFooter,
      })}
    >
      <section
        className={cn("relative overflow-hidden bg-background py-24", {
          "p hidden": user || hideSubForm,
        })}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-background" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <SubscriptionForm />
          </div>
        </div>
      </section>
      <footer className={cn("border-t border-border py-12")}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-start justify-between md:flex-row">
            <section className="mb-6 md:mb-0">
              <Logo />
              <p className="mt-2 text-muted-foreground">{slogan}</p>
            </section>

            <section className="grid grid-cols-2 gap-8 md:grid-cols-4 md:gap-12">
              <div>
                <h3 className="mb-3 font-medium text-foreground">Learning</h3>
                <ul className="space-y-2">
                  {learning.map((item) => (
                    <li key={item.name}>
                      <SmartLink
                        to={item.path}
                        className="text-sm text-muted-foreground capitalize"
                      >
                        {item.name}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-medium text-foreground">Platform</h3>
                <ul className="space-y-2">
                  {[...content, ...platform].map((item) => (
                    <li key={item.name}>
                      <SmartLink
                        to={item.path}
                        className="text-sm text-muted-foreground capitalize"
                      >
                        {item.name}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-medium text-foreground">Legal</h3>
                <ul className="space-y-2">
                  {legal.map((item) => (
                    <li key={item.name}>
                      <SmartLink
                        to={item.path}
                        className="text-sm text-muted-foreground capitalize"
                      >
                        {item.name}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-3 font-medium text-foreground">Social</h3>
                <ul className="space-y-2">
                  {social.map((item) => (
                    <li key={item.name}>
                      <SmartLink
                        to={item.path}
                        className="text-sm text-muted-foreground capitalize"
                      >
                        {item.name}
                      </SmartLink>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
            © 2025 - present TekBreed. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
