import type { MouseEvent, ReactNode } from "react";
import { motion, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  range?: number;
  strength?: number;
  className?: string;
  onClick?: () => void;
  /* Con href se renderiza como enlace; `external` lo abre en otra pestaña y `download` lo baja con ese nombre. */
  href?: string;
  external?: boolean;
  download?: string;
}

const SPRING = { stiffness: 150, damping: 15, mass: 0.6 };

const BASE =
  "relative inline-flex cursor-pointer items-center justify-center rounded-[3px] border border-[#003c74] " +
  "bg-linear-to-b from-white to-[#e3dfd0] px-4 py-1 text-[12px] leading-5 text-ink select-none " +
  "shadow-[inset_-1px_-1px_0_#cfc9b9] hover:shadow-[inset_0_0_0_2px_#f8b636] " +
  "focus-visible:outline-1 focus-visible:outline-offset-[-4px] focus-visible:outline-dotted focus-visible:outline-black";

export function MagneticButton({
  children,
  range = 45,
  strength = 0.35,
  className,
  onClick,
  href,
  external = false,
  download,
}: MagneticButtonProps) {
  const reduce = useReducedMotion();
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    if (reduce) return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const offsetX = event.clientX - (left + width / 2);
    const offsetY = event.clientY - (top + height / 2);
    const inRange = Math.hypot(offsetX, offsetY) < range;
    x.set(inRange ? offsetX * strength : 0);
    y.set(inRange ? offsetY * strength : 0);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const shared = {
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick,
    style: { x, y },
    className: cn(BASE, className),
  };
  const label = <span className="pointer-events-none relative z-10 block">{children}</span>;

  if (href) {
    return (
      <motion.a
        href={href}
        download={download}
        {...(external ? { target: "_blank", rel: "noopener" } : {})}
        {...shared}
      >
        {label}
      </motion.a>
    );
  }
  return (
    <motion.button type="button" {...shared}>
      {label}
    </motion.button>
  );
}
