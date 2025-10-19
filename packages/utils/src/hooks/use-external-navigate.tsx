import {
  useSmartNavigate,
  type SmartNavigateOptions,
} from "./use-smart-navigate";

/**
 * External navigate hook that forces navigation to be external (full page reload)
 * @returns A function that navigates to the given URL externally
 */
export function useExternalNavigate() {
  const smartNavigate = useSmartNavigate();
  return (to: string, options?: Omit<SmartNavigateOptions, "external">) => {
    smartNavigate(to, { ...options, external: true });
  };
}
