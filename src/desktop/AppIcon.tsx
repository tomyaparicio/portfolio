import { cn } from "@/lib/utils";

/* Los íconos viven en public/icons. BASE_URL los resuelve bien aunque el sitio se publique en una subcarpeta. */
export const iconUrl = (name: string) => `${import.meta.env.BASE_URL}icons/${name}.png`;

const SIZES = { lg: 32, md: 24, sm: 16 };

interface AppIconProps {
  /* Nombre del archivo en public/icons, sin extensión. */
  icon: string;
  size?: keyof typeof SIZES;
  className?: string;
}

export function AppIcon({ icon, size = "lg", className }: AppIconProps) {
  const px = SIZES[size];
  return (
    <img
      className={cn("appicon", className)}
      src={iconUrl(icon)}
      width={px}
      height={px}
      alt=""
      draggable={false}
    />
  );
}
