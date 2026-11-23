import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { contact, hero, notice } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { AppIcon } from "./AppIcon";
import { type AppDef, desktopApps } from "./apps";

/* Barra de tareas, menú de inicio y globo de notificación. */

function useNow(intervalMs: number) {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), intervalMs);
    return () => clearInterval(timer);
  }, [intervalMs]);
  return now;
}

interface TaskbarProps {
  open: AppDef[];
  activeId: string | null;
  startOpen: boolean;
  onToggleStart: () => void;
  onTask: (id: string) => void;
  onTray: () => void;
}

export function Taskbar({ open, activeId, startOpen, onToggleStart, onTask, onTray }: TaskbarProps) {
  const now = useNow(20_000);

  return (
    <footer className="taskbar">
      <button
        type="button"
        className={cn("startbtn", startOpen && "startbtn--on")}
        aria-expanded={startOpen}
        onClick={onToggleStart}
      >
        Inicio
      </button>
      <div className="taskbar__tasks">
        {open.map((app) => (
          <button
            key={app.id}
            type="button"
            className={cn("task", app.id === activeId && "task--active")}
            onClick={() => onTask(app.id)}
          >
            <AppIcon icon={app.icon} size="sm" />
            <span>{app.windowTitle ?? app.title}</span>
          </button>
        ))}
      </div>
      <div className="tray">
        <button type="button" className="tray__icon" aria-label="Mostrar aviso" onClick={onTray}>
          <AppIcon icon="msn" size="sm" />
        </button>
        <span>{now.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" })}</span>
      </div>
    </footer>
  );
}

interface BalloonProps {
  onOpen: () => void;
  onClose: () => void;
}

/* Globo amarillo que sale de la bandeja del sistema. */
export function Balloon({ onOpen, onClose }: BalloonProps) {
  return (
    <div className="balloon" role="status">
      <button type="button" className="balloon__main" onClick={onOpen}>
        <b>
          <AppIcon icon="msn" size="sm" />
          {notice.title}
        </b>
        <span>{notice.body}</span>
      </button>
      <button type="button" className="balloon__close" aria-label="Cerrar aviso" onClick={onClose}>
        <X size={10} strokeWidth={3.5} />
      </button>
    </div>
  );
}

interface StartMenuProps {
  onOpen: (id: string) => void;
  onLogout: () => void;
}

export function StartMenu({ onOpen, onLogout }: StartMenuProps) {
  return (
    <div className="start" role="menu" aria-label="Inicio">
      <p className="start__head">
        <AppIcon icon="about" className="start__avatar" />
        {hero.name}
      </p>
      <div className="start__cols">
        <ul className="start__list">
          {desktopApps.map((app) => (
            <li key={app.id}>
              <button type="button" role="menuitem" className="start__item" onClick={() => onOpen(app.id)}>
                <AppIcon icon={app.icon} size="md" />
                {app.title}
              </button>
            </li>
          ))}
        </ul>
        <div className="start__side">
          <a href={contact.github} target="_blank" rel="noopener">
            GitHub
          </a>
          <a href={`mailto:${contact.email}`}>Correo</a>
          <span>{hero.location}</span>
        </div>
      </div>
      <p className="start__foot">
        <button type="button" role="menuitem" className="start__logout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </p>
    </div>
  );
}
