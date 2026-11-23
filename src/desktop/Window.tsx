import { Minus, Square, X } from "lucide-react";
import { createContext, type PointerEvent, type ReactNode, useContext, useRef } from "react";
import { cn } from "@/lib/utils";
import type { Win } from "./use-windows";

/* Tiene que coincidir con --taskbar en index.css. */
export const TASKBAR_HEIGHT = 30;

/* Lo que el contenido de una ventana puede pedirle a su propio marco. */
interface WindowActions {
  close: () => void;
  shake: () => void;
  /* Abre otra ventana del escritorio por su id. */
  open: (id: string) => void;
}

const WindowContext = createContext<WindowActions>({ close: () => {}, shake: () => {}, open: () => {} });
export const useWindowActions = () => useContext(WindowContext);

const SHAKE = [0, -9, 8, -8, 7, -6, 5, -3, 2, 0].map((x, i) => ({ translate: `${x}px ${i % 2 ? 3 : -3}px` }));

interface WindowProps {
  win: Win;
  title: string;
  icon: ReactNode;
  width: number;
  active: boolean;
  /* flush: el contenido llega hasta el borde del marco (exploradores y diálogos). */
  flush?: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (x: number, y: number) => void;
  onOpen: (id: string) => void;
  children: ReactNode;
}

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);

export function Window({
  win,
  title,
  icon,
  width,
  active,
  flush = false,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
  onOpen,
  children,
}: WindowProps) {
  const frame = useRef<HTMLElement>(null);
  const grip = useRef<{ dx: number; dy: number } | null>(null);

  const startDrag = (event: PointerEvent<HTMLDivElement>) => {
    if (win.maximized || (event.target as HTMLElement).closest("button")) return;
    grip.current = { dx: event.clientX - win.x, dy: event.clientY - win.y };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: PointerEvent<HTMLDivElement>) => {
    if (!grip.current) return;
    // Siempre queda un tramo de la barra de título a la vista para poder volver a agarrarla.
    const x = clamp(event.clientX - grip.current.dx, 120 - width, innerWidth - 120);
    const y = clamp(event.clientY - grip.current.dy, 0, innerHeight - TASKBAR_HEIGHT - 32);
    onMove(x, y);
  };

  const endDrag = () => {
    grip.current = null;
  };

  const shake = () => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    frame.current?.animate([...SHAKE, { translate: "0 0" }], { duration: 560, easing: "linear" });
  };

  return (
    <section
      ref={frame}
      role="dialog"
      aria-label={title}
      className={cn("win", !active && "win--idle", win.minimized && "win--min", win.maximized && "win--max")}
      style={{ left: win.x, top: win.y, width, zIndex: win.z }}
      onPointerDownCapture={onFocus}
    >
      <div
        className="win__bar"
        onPointerDown={startDrag}
        onPointerMove={drag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onDoubleClick={onMaximize}
      >
        {icon}
        <h2 className="win__title">{title}</h2>
        <div className="win__caps">
          <button type="button" className="cap" aria-label="Minimizar" onClick={onMinimize}>
            <Minus size={13} strokeWidth={3.5} />
          </button>
          <button type="button" className="cap cap--max" aria-label="Maximizar" onClick={onMaximize}>
            <Square size={11} strokeWidth={3.5} />
          </button>
          <button type="button" className="cap cap--close" aria-label="Cerrar" onClick={onClose}>
            <X size={15} strokeWidth={3.5} />
          </button>
        </div>
      </div>
      <div className={cn("win__body", flush && "win__body--flush")}>
        <WindowContext.Provider value={{ close: onClose, shake, open: onOpen }}>{children}</WindowContext.Provider>
      </div>
    </section>
  );
}
