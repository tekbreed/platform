import { useNonce } from "@repo/utils/providers/nonce";
import { GeneralErrorBoundary } from "@repo/ui/composed/error-boundary";
import { ThemedApp } from "./themed-app.js";
import { Document } from "./document.js";

export function RootErrorBoundary() {
  const nonce = useNonce();
  return (
    <ThemedApp theme={null}>
      <Document nonce={nonce}>
        <GeneralErrorBoundary />
      </Document>
    </ThemedApp>
  );
}
