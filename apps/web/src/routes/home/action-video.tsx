import { Icons } from "@repo/ui/composed/icons";

export function ActionVideo() {
  return (
    <section className="w-full bg-muted/30 py-16">
      <div className="container mx-auto w-full">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight">
            See our AI Learning Assistant in Action
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Watch how our AI-powered platform transforms your learning
            experience
          </p>
          <div className="relative aspect-video overflow-hidden rounded-lg shadow-2xl">
            <video
              className="h-full w-full object-cover"
              controls
              poster="/placeholder.svg?height=400&width=800&text=Video+Preview"
            >
              <source src="/demo-video.mp4" type="video/mp4" />
              <source src="/demo-video.webm" type="video/webm" />
              Your browser does not support the video tag.
            </video>
            {/* Fallback for when video is not available */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
              <div className="text-center text-white">
                <Icons.play className="mx-auto mb-4 h-16 w-16 opacity-80" />
                <p className="text-lg font-medium">Demo Video Coming Soon</p>
                <p className="mt-2 text-sm opacity-70">
                  Experience our AI-powered learning platform
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
