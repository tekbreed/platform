import "vitest-browser-react";
import { beforeEach, afterEach, vi } from "vitest";

afterEach(() => {
  vi.restoreAllMocks();
});

beforeEach(() => {
  vi.clearAllMocks();
});
