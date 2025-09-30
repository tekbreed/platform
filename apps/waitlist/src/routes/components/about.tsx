import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@repo/ui/components/card";
import {
  Target,
  Users,
  Lightbulb,
  Code,
  Heart,
  Zap,
  Shield,
  Globe,
} from "lucide-react";

const missionPoints = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "Empower developers with accessible, structured learning experiences that bridge the gap between theory and real-world application.",
  },
  {
    icon: Users,
    title: "Who We Serve",
    description:
      "From complete beginners taking their first steps in programming to experienced engineers looking to master new technologies and advance their careers.",
  },
  {
    icon: Lightbulb,
    title: "Learning Philosophy",
    description:
      "Practical-first approach with hands-on projects, real-world scenarios, and immediate application of concepts to build lasting understanding.",
  },
  {
    icon: Code,
    title: "Technology Focus",
    description:
      "Built with TypeScript and React, featuring rich MDX content authoring, progress tracking, and seamless integration with modern development workflows.",
  },
];

const coreValues = [
  {
    icon: Heart,
    title: "Community-Powered",
    description:
      "Learning is enhanced through peer interaction, mentorship, and collaborative problem-solving in our vibrant developer community.",
  },
  {
    icon: Zap,
    title: "Quality-Focused",
    description:
      "Every piece of content is carefully curated, reviewed by industry experts, and continuously updated to reflect current best practices.",
  },
  {
    icon: Shield,
    title: "Accessible Design",
    description:
      "Built with accessibility in mind, ensuring that learning opportunities are available to developers of all backgrounds and abilities.",
  },
  {
    icon: Globe,
    title: "Open Roadmap",
    description:
      "Our development roadmap is transparent and community-driven, with regular updates and opportunities for user feedback and feature requests.",
  },
];

export function AboutSection() {
  return (
    <section id="learn-more" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-base leading-7 font-semibold text-primary">
            About TekBreed
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-balance text-foreground sm:text-4xl">
            Breeding the next generation of software engineers
          </p>
          <p className="mt-6 text-lg leading-8 text-pretty text-muted-foreground">
            TekBreed is more than just a learning platform—it&apos;s a
            comprehensive ecosystem designed to nurture and develop software
            engineering talent through innovative AI-powered education.
          </p>
        </div>

        {/* Mission and Vision */}
        <div className="mx-auto mt-16 max-w-3xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {missionPoints.map((point, index) => (
              <Card key={index} className="backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <point.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {point.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {point.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Core Values */}
        <div className="mx-auto mt-20 max-w-3xl lg:max-w-none">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Our Core Values
            </h3>
            <p className="mt-4 text-lg text-muted-foreground">
              The principles that guide everything we build and every decision
              we make
            </p>
          </div>

          <div className="grid max-w-xl grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-2">
            {coreValues.map((value, index) => (
              <Card key={index} className="backdrop-blur-sm">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl font-semibold text-foreground">
                      {value.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed text-muted-foreground">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Platform Features */}
        <div className="mx-auto mt-20 max-w-4xl">
          <div className="mb-12 text-center">
            <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              What Makes TekBreed Different
            </h3>
          </div>

          <div className="space-y-6">
            <Card className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  AI-Powered Personalization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Our advanced AI assistant learns from your progress,
                  identifies knowledge gaps, and provides personalized learning
                  recommendations. It adapts to your learning style and pace,
                  ensuring optimal knowledge retention and skill development.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Rich Interactive Content
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Experience learning through rich MDX content that combines
                  text, interactive code examples, embedded videos, and hands-on
                  exercises. Our content is designed to engage multiple learning
                  styles and provide immediate practical application.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">
                  Community-Driven Learning
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base leading-relaxed text-muted-foreground">
                  Join a vibrant community of learners and mentors. Participate
                  in discussions, collaborate on projects, get help when
                  you&apos;re stuck, and contribute to others&apos; learning
                  journeys. Our Discord integration ensures you&apos;re never
                  learning alone.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
