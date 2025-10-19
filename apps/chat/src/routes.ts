import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("chat/chatId", "routes/details/index.tsx"),
] satisfies RouteConfig;
