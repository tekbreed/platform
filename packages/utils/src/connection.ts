import { z } from "zod/v4";

// GITHUB
export const GITHUB_PROVIDER_NAME = "github";

export const providerNames = [GITHUB_PROVIDER_NAME] as const;
export const ProviderNameSchema = z.enum(providerNames);
export type ProviderName = z.infer<typeof ProviderNameSchema>;
