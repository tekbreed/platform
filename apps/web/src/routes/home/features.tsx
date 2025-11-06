import React from "react";
import type { HomePageContent } from "../utils/content/types";
import { Icons } from "@repo/ui/composed/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Await, Link } from "react-router";
import { Skeleton } from "@repo/ui/components/skeleton";

const iconMap = {
  bot: Icons.bot,
  zap: Icons.zap,
  code: Icons.code,
  trophy: Icons.trophy,
  users: Icons.users,
  briefcase: Icons.briefcase,
  video: Icons.video,
  fileCheck: Icons.fileCheck,
  notebookPen: Icons.noteBookPen,
} as const;

type IconName = keyof typeof iconMap;

export function Features({ content }: { content: Promise<HomePageContent> }) {
  return (
    <section className="w-full. mx-auto pt-12 pb-24">
      <div className="container w-full">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why Choose TekBreed?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Experience the future of software engineering education with our
            innovative features
          </p>
        </div>
        <div className="mx-auto mt-16 grid w-full max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <React.Suspense
            fallback={Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-65 w-90" />
            ))}
          >
            <Await resolve={content}>
              {({ features }) =>
                features.map((feature) => {
                  const IconComponent = iconMap[feature.icon as IconName];
                  return (
                    <Card key={feature.name} className="text-center">
                      <CardHeader>
                        <IconComponent className="mx-auto h-12 w-12 text-primary" />
                        <CardTitle className="text-xl">
                          {feature.name}
                        </CardTitle>
                        {!feature.released ? (
                          <Badge className="mx-auto text-xs">Coming Soon</Badge>
                        ) : null}
                      </CardHeader>
                      <CardContent>
                        <CardDescription>{feature.description}</CardDescription>
                      </CardContent>
                    </Card>
                  );
                })
              }
            </Await>
          </React.Suspense>

          <div className="col-span-full flex justify-center">
            <Button asChild>
              <Link prefetch="intent" to={"/about"}>
                Learn more <Icons.arrowRight className="ml-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
