import { motion } from "framer-motion";
import { Container } from "./container";
import { EmptyState } from "@repo/ui/composed/empty-state";
import { Icons } from "@repo/ui/composed/icons";

export function Teams() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Container title="My Teams">
        <EmptyState
          icon={<Icons.comingSoon className="size-8" />}
          title="Coming Soon!"
          description="We are working to implement this feature."
        />
      </Container>
    </motion.div>
  );
}
