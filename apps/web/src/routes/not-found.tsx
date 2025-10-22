import { Button } from "@repo/ui/components/button";
import { Icons } from "@repo/ui/composed/icons";
import { SmartLink } from "@repo/ui/composed/smart-link";
import { content } from "@repo/utils/constants/client";
import { useSmartGoBack } from "@repo/utils/hooks/use-smart-go-back";
import { motion } from "framer-motion";

import { Link } from "react-router";

export default function NotFoundRoute() {
  // const metadata = generateMetadata({ title: "Not Found" });
  const goBack = useSmartGoBack();
  return (
    <>
      {/* {metadata} */}
      <div className="flex min-h-screen flex-col items-center justify-center bg-background p-4">
        <div className="w-full max-w-md text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative mx-auto mb-8 h-48 w-48">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl font-bold text-muted-foreground">
                  404
                </div>
              </div>

              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Icons.search className="h-24 w-24 text-blue-600 dark:text-blue-500" />
                  <motion.div
                    className="absolute top-1/2 left-1/2 h-32 w-32 rounded-full border-2 border-blue-600 dark:border-blue-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.5] }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatType: "loop",
                    }}
                    style={{ x: "-50%", y: "-50%" }}
                  />
                </div>
              </div>
            </div>

            <h1 className="mb-4 text-3xl font-bold md:text-4xl">
              Page Not Found
            </h1>
            <p className="mb-8 text-muted-foreground">
              The page you&apos;re looking for doesn&apos;t exist or has been
              moved.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button
                className="flex items-center gap-2"
                onClick={() => goBack("/")}
              >
                <Icons.arrowLeft className="size-4" />
                Go Back
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                asChild
              >
                <Link to="/">
                  <Icons.home className="size-4" />
                  Back to Home
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-12 border-t border-border pt-8"
          >
            <p className="text-sm text-muted-foreground">
              Looking for something specific? Try navigating using the links
              below:
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-4">
              {content.map((link) => (
                <SmartLink
                  key={link.name}
                  to={link.path}
                  className="text-blue-600 capitalize hover:underline dark:text-blue-400"
                >
                  {link.name}
                </SmartLink>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function NavLink({ name, path }: { name: string; path: string }) {
  return (
    <Link
      to={path}
      className="text-blue-600 capitalize hover:underline dark:text-blue-400"
    >
      {name}
    </Link>
  );
}
