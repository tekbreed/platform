import { type RouteConfig, route } from "@react-router/dev/routes";

export default [
  route("signup", "routes/signup/index.tsx"),
  route("signin", "routes/signin/index.tsx"),
] satisfies RouteConfig;
