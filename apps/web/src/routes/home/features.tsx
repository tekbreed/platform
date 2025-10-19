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

const features = [
  {
    icon: Icons.bot,
    title: "AI-Powered Learning",
    description:
      "Get personalized guidance from our advanced AI assistant that adapts to your learning style and provides contextual help.",
  },
  {
    icon: Icons.zap,
    title: "RAG Technology",
    description:
      "Experience cutting-edge Retrieval-Augmented Generation that provides accurate, up-to-date information tailored to your needs.",
  },
  {
    icon: Icons.sparkles,
    title: "Monthly Challenges",
    description:
      "Participate in exciting coding challenges that test your skills and help you grow as a developer.",
    comingSoon: true,
  },
  {
    icon: Icons.checkCircle,
    title: "Verified Certificates",
    description:
      "Earn industry-recognized certificates that showcase your skills to potential employers.",
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
            Experience the future of programming education with our innovative
            features
          </p>
        </div>
        <div className="mx-auto mt-16 grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title} className="text-center">
              <CardHeader className="mx-auto w-full">
                <feature.icon className="mx-auto h-12 w-12 text-primary" />
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                {feature.comingSoon ? (
                  <Badge
                    variant="secondary"
                    className="flex justify-center text-center text-xs"
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
            <Button>
              Learn more <ArrowRight className="ml-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
