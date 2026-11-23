import { type PointerEvent, useRef, useState } from "react";

export interface Box {
  left: number;
  top: number;
  width: number;
  height: number;
}

/* Solo se empieza a marcar sobre el fondo: nunca sobre íconos, ventanas, barra de tareas o menús. */
const NOT_BACKGROUND = "button, a, .win, .taskbar, .start, .balloon";

/* Recuadro de selección del escritorio: clic y arrastrar sobre el fondo marca los íconos que toca.
   Los íconos se reconocen por su atributo data-icon. */
export function useMarquee() {
  const origin = useRef<{ x: number; y: number } | null>(null);
  const [box, setBox] = useState<Box | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const onPointerDown = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType === "touch" || event.button !== 0) return;
    if ((event.target as HTMLElement).closest(NOT_BACKGROUND)) return;
    origin.current = { x: event.clientX, y: event.clientY };
    setSelected([]);
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (!origin.current) return;
    const { x, y } = origin.current;
    const next: Box = {
      left: Math.min(x, event.clientX),
      top: Math.min(y, event.clientY),
      width: Math.abs(event.clientX - x),
      height: Math.abs(event.clientY - y),
    };
    setBox(next);

    const touched = Array.from(event.currentTarget.querySelectorAll<HTMLElement>("[data-icon]"))
      .filter((icon) => {
        const rect = icon.getBoundingClientRect();
        return (
          rect.left < next.left + next.width &&
          rect.right > next.left &&
          rect.top < next.top + next.height &&
          rect.bottom > next.top
        );
      })
      .map((icon) => icon.dataset.icon!);
    setSelected(touched);
  };

  const end = () => {
    origin.current = null;
    setBox(null);
  };

  return { box, selected, handlers: { onPointerDown, onPointerMove, onPointerUp: end, onPointerCancel: end } };
}
