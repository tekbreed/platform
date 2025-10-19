export const baseUrl = "tekbreed.com";
export const slogan = "Breeding the next generation of software engineers";

export const subdomains = {
  web: "web",
  chat: "chat",
  admin: "admin",
  programs: "programs",
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
  programs: 5176,
  challenges: 5177,
  teams: 5178,
  board: 5179,
  store: 5180,
  docs: 5181,
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
