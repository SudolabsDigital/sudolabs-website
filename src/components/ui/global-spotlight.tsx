import { cn } from "@/lib/utils";
import { Aurora } from "@/components/ui/design-system/aurora";

export const GlobalSpotlight = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-0 overflow-hidden",
        className
      )}
    >
      {/* Grid Pattern Fijo */}
      <div className="absolute inset-0 bg-grid-black/5 dark:bg-grid-white/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />

      {/* Aurora ambiental: mismo distintivo de marca en todas las páginas */}
      <Aurora variant="ambient" />
    </div>
  );
};
