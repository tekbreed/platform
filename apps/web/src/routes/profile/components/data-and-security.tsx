import type { Route } from "../+types/index";
import { z } from "zod/v4";
import { Link, useFetcher, useLoaderData, useSubmit } from "react-router";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogFooter,
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button";
import { Container } from "./container";
import { cn } from "@repo/ui/lib/utils";
import { Icons } from "@repo/ui/composed/icons";

export const SIGNOUT_SESSIONS_INTENT = "signout-other-sessions";
export const DELETE_USER_INTENT = "delete-user";

export const SessionSchema = z.object({ userId: z.string() });
export const DeleteUserSchema = z.object({ userId: z.string() });

export function DataAndSecurity() {
  const submit = useSubmit();
  const fetcher = useFetcher();
  const loaderData = useLoaderData() as Route.ComponentProps["loaderData"];

  const user = loaderData.user;
  const otherSessionsCount = user._count.sessions - 1;

  return (
    <Container title="Data and Security">
      <Item
        title="Change Email"
        description={
          <>
            Change your email from{" "}
            <span className="font-bold">{user.email}</span>
          </>
        }
      >
        <Button variant="outline" asChild>
          <Link to={"/profile/change-email"}>
            <Icons.mail className="mr-1 size-4" />
            Change
          </Link>
        </Button>
      </Item>
      {user.password ? (
        <Item
          title="Update Password"
          description="Update your password to a new, secure one"
          className="mt-4"
        >
          <Button variant="outline" asChild>
            <Link to={"/profile/password"}>
              <Icons.rectangleEllipsis className="mr-1 size-4" />
              Update
            </Link>
          </Button>
        </Item>
      ) : (
        <Item
          title="Create a Password"
          description="Create a secure password to protect your account"
          className="mt-4"
        >
          <Button variant="outline" asChild>
            <Link to={"/profile/password/create"}>
              <Icons.lockKeyhole className="mr-1 size-4" />
              Create
            </Link>
          </Button>
        </Item>
      )}

      <Item
        title="Download Your Data"
        description="Get a copy of all your data stored in your account"
        className="mt-4"
      >
        <Button variant="outline" asChild>
          <a
            href="/download-user-data"
            download="tekbreed-data"
            className="flex items-center"
          >
            <Icons.download className="mr-2 size-4" />
            Download
          </a>
        </Button>
      </Item>

      <Item
        title="Active Sessions"
        description={
          otherSessionsCount
            ? "Sign out from all other devices where you're signed in"
            : "This is your only session"
        }
        className="mt-4"
      >
        {otherSessionsCount ? (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="outline">
                <Icons.users className="mr-2 size-4" />
                Sign Out {otherSessionsCount} Other Sessions
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Sign out from other devices?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This will sign you out from all other devices where
                  you&apos;re currently logged in. You&apos;ll remain signed in
                  on this device. This is useful if you&apos;ve forgotten to
                  sign out on another device or if you suspect unauthorized
                  access.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>No</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() =>
                    fetcher.submit(
                      { intent: SIGNOUT_SESSIONS_INTENT, userId: user.id },
                      { method: "post" },
                    )
                  }
                >
                  Yes
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        ) : null}
      </Item>

      <div className="pt-4">
        <h3 className="mb-1 text-lg font-medium text-red-500 dark:text-red-400">
          Danger Zone
        </h3>
        <p className="mb-4 text-muted-foreground">
          Once you delete your account, there is no going back. This action
          cannot be undone.
        </p>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"outline"}
              className="border-red-300 text-red-500 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950/30"
            >
              <Icons.alertTriangle className="mr-2 size-4" />
              Delete Account
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete your account?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. All your data including your
                profile, courses, certificates, and subscription information
                will be permanently deleted. You will lose access to all
                purchased content and will need to create a new account if you
                wish to return.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>No</AlertDialogCancel>
              <AlertDialogAction
                onClick={() =>
                  submit(
                    { intent: DELETE_USER_INTENT, userId: user.id },
                    { method: "post" },
                  )
                }
              >
                Yes
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Container>
  );
}

function Item({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description: string | React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between border-b border-border pb-4",
        className,
      )}
    >
      <div>
        <h3 className="mb-1 text-lg font-medium">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  );
}
