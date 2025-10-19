import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import { Link } from "react-router";
import { ArrowBigRight } from "lucide-react";
import { HeroBackground } from "./hero-background";
import { Features } from "./features";

export default function Home() {
  return (
    <div className="mx-auto flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-screen overflow-hidden py-24 lg:py-32">
        <HeroBackground />
        <div className="relative z-10 container mx-auto">
          <div className="mx-auto w-full max-w-4xl text-center">
            <Badge variant="secondary" className="mb-8">
              🚀 New: AI-Powered Code Reviews
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Transform your coding skills with{" "}
              <span className="bg-gradient-to-r from-slate-400 to-slate-700 bg-clip-text text-transparent">
                AI-powered learning
              </span>
            </h1>
            <p className="mx-auto mt-12 max-w-2xl text-lg leading-8 text-muted-foreground">
              Transform your programming skills with our intelligent learning
              platform. Get personalized guidance, real-time feedback, and
              contextually-aware assistance powered by advanced RAG technology.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild>
                <Link to="/courses">Start Learning</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link to="/about" className="flex items-center">
                  Learn More
                  <ArrowBigRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Features />
    </div>
  );
}
