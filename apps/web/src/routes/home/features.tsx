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
import { ArrowRight } from "lucide-react";
import { Link } from "react-router";

const features = [
  {
    icon: Icons.bot,
    title: "AI Learning Companion",
    description:
      "Your personal coding tutor available 24/7—get instant help debugging code, understanding complex concepts, and personalized guidance that adapts to how you learn best.",
  },
  {
    icon: Icons.zap,
    title: "Smart Progress Insights",
    description:
      "Track your learning journey with intelligent analytics that identify your strengths, highlight knowledge gaps, and provide actionable recommendations to accelerate your growth.",
  },
  {
    icon: Icons.code,
    title: "Interactive Learning Experience",
    description:
      "Master concepts through hands-on practice with embedded code playgrounds, interactive diagrams, and real-time experimentation—learn by doing, not just watching.",
    comingSoon: true,
  },
  {
    icon: Icons.trophy,
    title: "Monthly Coding Challenges",
    description:
      "Test your skills and compete with peers through fresh monthly challenges that push your boundaries and help you build an impressive portfolio of solved problems.",
    comingSoon: true,
  },
  {
    icon: Icons.users,
    title: "Team Collaboration",
    description:
      "Work together with your team on projects, share knowledge, and learn from each other in a collaborative environment that mirrors real workplace dynamics.",
    comingSoon: true,
  },
  {
    icon: Icons.briefcase,
    title: "Career Pathways",
    description:
      "Connect your learning directly to opportunities with curated job listings, portfolio showcasing, and industry-recognized achievements that demonstrate your capabilities.",
    comingSoon: true,
  },
];

export function Features() {
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
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader>
                <feature.icon className="mx-auto h-12 w-12 text-primary" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                {feature.comingSoon ? (
                  <Badge
                    // variant="outline"
                    className="mx-auto text-xs"
                  >
                    Coming Soon
                  </Badge>
                ) : null}
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
          <div className="col-span-full flex justify-center">
            <Button asChild>
              <Link to={"/about"}>
                Learn more <ArrowRight className="ml-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
