import { Card, CardContent } from "@repo/ui/components/card";
import { Calendar, Clock, Users, Rocket } from "lucide-react";

export function LaunchDateSection() {
  return (
    <div className="bg-background py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-balance text-primary sm:text-4xl">
            Official Platform Launch
          </h2>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">
            Mark your calendar for the full TekBreed experience
          </p>
        </div>

        <div className="mt-12">
          <Card className="mx-auto max-w-2xl border-border bg-card shadow-lg">
            <CardContent className="p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-muted p-4">
                  <Rocket className="h-8 w-8 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-primary">
                  February 1st, 2026
                </h3>
                <p className="text-muted-foreground">First Modules Launch</p>
              </div>

              <div className="mt-6 border-t border-border pt-6">
                <p className="text-sm text-muted-foreground">
                  Launch includes Articles, Tutorials, and AI Learning Assistant
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Launch Details Grid */}
          <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-border bg-card">
              <CardContent className="p-6 text-center">
                <Calendar className="mx-auto mb-3 h-6 w-6 text-primary" />
                <h4 className="mb-2 font-semibold text-primary">
                  Launch Timeline
                </h4>
                <p className="text-sm text-muted-foreground">
                  First modules launch on February 1st, 2026
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6 text-center">
                <Users className="mx-auto mb-3 h-6 w-6 text-primary" />
                <h4 className="mb-2 font-semibold text-primary">
                  Early Access
                </h4>
                <p className="text-sm text-muted-foreground">
                  Waitlist members get priority access to beta features
                </p>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardContent className="p-6 text-center">
                <Clock className="mx-auto mb-3 h-6 w-6 text-primary" />
                <h4 className="mb-2 font-semibold text-primary">
                  Stay Updated
                </h4>
                <p className="text-sm text-muted-foreground">
                  Regular updates on development progress and feature releases
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
