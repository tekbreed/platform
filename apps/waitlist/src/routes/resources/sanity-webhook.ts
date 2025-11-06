import { redirect } from "react-router";
import type { Route } from "./+types/sanity-webhook";

export const loader = () => redirect("/");

export async function action({ request }: Route.ActionArgs) {
  console.log(await request);
  return {};
}
