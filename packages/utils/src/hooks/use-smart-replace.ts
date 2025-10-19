import {
  useSmartNavigate,
  type SmartNavigateOptions,
} from "./use-smart-navigate";

/**
 * Smart replace hook that forces navigation to replace current history entry
 * @returns A function that navigates to the given URL replacing the current entry
 */
export function useSmartReplace() {
  const smartNavigate = useSmartNavigate();
  return (to: string, options?: Omit<SmartNavigateOptions, "replace">) => {
    smartNavigate(to, { ...options, replace: true });
  };
}
