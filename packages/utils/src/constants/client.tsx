import { FileText, Play, GraduationCap, Target, Trophy } from "lucide-react";
import { devPorts, baseUrl } from "./config";

type ModuleName = keyof typeof devPorts;

export const isDevelopment =
  process.env.NODE_ENV === "development" ||
  (typeof window !== "undefined" && window.location.hostname === "localhost");

const buildUrl = (subdomain?: ModuleName, path: string = ""): string => {
  if (path && !path.startsWith("/")) {
    path = `/${path}`;
  }

  if (isDevelopment) {
    const port = subdomain ? devPorts[subdomain] : devPorts.web;
    if (subdomain) {
      return `http://localhost:${port}${path}`;
    }
    return path;
  }

  const protocol = isDevelopment ? "http://" : "https://";

  if (subdomain) {
    return `${protocol}${subdomain}.${baseUrl}${path}`;
  }
  // return `${protocol}${baseUrl}${path}`;
  return path;
};

export const learningIcons = {
  articles: FileText,
  tutorials: Play,
  courses: GraduationCap,
  programs: Target,
  challenges: Trophy,
};

export const learning = [
  {
    name: "articles",
    prefix: undefined,
    path: buildUrl(undefined, "articles"),
    icon: learningIcons.articles,
  },
  {
    name: "tutorials",
    prefix: undefined,
    path: buildUrl(undefined, "tutorials"),
    icon: learningIcons.tutorials,
  },
  {
    name: "courses",
    prefix: "programs",
    path: buildUrl("programs", "courses"),
    icon: learningIcons.courses,
  },
  {
    name: "programs",
    prefix: "programs",
    path: buildUrl("programs", "programs"),
    icon: learningIcons.programs,
  },
  {
    name: "challenges",
    path: buildUrl("challenges"),
    icon: learningIcons.challenges,
  },
];

export const content = [
  { name: "chat", path: buildUrl("chat") },
  { name: "job board", path: buildUrl("board") },
  { name: "store", path: buildUrl("store") },
  { name: "roadmap", path: buildUrl(undefined, "roadmap") },
];

export const platform = [
  { name: "about", path: buildUrl(undefined, "about") },
  { name: "support", path: buildUrl(undefined, "support") },
  { name: "FAQs", path: buildUrl(undefined, "faqs") },
  { name: "sitemap", path: buildUrl(undefined, "sitemap.xml") },
];

export const legal = [
  { name: "terms", path: buildUrl(undefined, "legal/terms-of-use") },
  { name: "privacy", path: buildUrl(undefined, "legal/privacy-policy") },
];

export const social = [
  { name: "X", path: "https://x.com/tekbreed", icon: "twitter" },
  {
    name: "LinkedIn",
    path: "https://www.linkedin.com/company/tekbreed/",
    icon: "linkedIn",
  },
  {
    name: "YouTube",
    path: "https://www.youtube.com/channel/UCYWjNbfB8ygT_7hElaa0B9Q",
    icon: "youtube",
  },
  { name: "Discord", path: "https://discord.gg/7uZ6PWf4Xv", icon: "discord" },
  { name: "Github", path: "https://github.com/tekbreed", icon: "github" },
];

export const getModuleUrl = (module: ModuleName, path: string = ""): string => {
  return buildUrl(module === "web" ? undefined : module, path);
};
