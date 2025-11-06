export const baseUrl = "tekbreed.com";
export const slogan = "Breeding the next generation of software engineers";

export const subdomains = {
  web: "web",
  chat: "chat",
  admin: "admin",
  lms: "lms",
  classroom: "classroom",
  notes: "notes",
  challenges: "challenges",
  teams: "teams",
  board: "board",
  docs: "docs",
  localhost: "localhost",
};

/**
 * Allowed domains for safe redirects across TekBreed services
 */
export const allowedDomains = Object.keys(subdomains).map(
  (key) => `${key}.${baseUrl}`,
);

/**
 * Development ports for each service
 */
export const devPorts = {
  web: 5173,
  chat: 5174,
  admin: 5175,
  lms: 5176,
  classroom: 5177,
  notes: 5178,
  challenges: 5179,
  teams: 5180,
  board: 5181,
  store: 5182,
  docs: 5173,
} as const;

export const serviceUrls: Record<keyof typeof devPorts, string> =
  Object.fromEntries(
    Object.keys(devPorts).map((service) => {
      if (service === "web") {
        return [service, `https://${baseUrl}`];
      } else {
        const subdomain = subdomains[service as keyof typeof subdomains];
        return [service, `https://${subdomain}.${baseUrl}`];
      }
    }),
  ) as Record<keyof typeof devPorts, string>;
