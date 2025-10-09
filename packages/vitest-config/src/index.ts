export const sharedConfig = {
  browser: {
    globals: true,
    setupFiles: ["./src/test/setup-env.ts"],
    // Other shared configuration
  },
  node: {
    globals: true,
    setupFiles: ["./src/test/setup-env.ts"],
    // Other shared configuration
  },
};
