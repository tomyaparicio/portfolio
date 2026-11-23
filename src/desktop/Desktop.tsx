import { useCallback, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AppIcon } from "./AppIcon";
import { apps, desktopApps } from "./apps";
import { Balloon, StartMenu, Taskbar } from "./Shell";
import { useMarquee } from "./use-marquee";
import { useWindows } from "./use-windows";
import { TASKBAR_HEIGHT, Window } from "./Window";

/* Posición de una ventana nueva: en cascada, sin tapar la columna de íconos ni salirse de la pantalla. */
function spot(count: number, width: number) {
  const step = count % 6;
  return {
    x: Math.max(8, Math.min(140 + step * 34, innerWidth - width - 24)),
    y: Math.min(24 + step * 30, Math.max(0, innerHeight - TASKBAR_HEIGHT - 200)),
  };
}

const WELCOME = "perfil";
const CONTACT = "contacto";
const FULLSCREEN_BELOW = 720;
const BALLOON_DELAY_MS = 2500;

/* En pantallas chicas las ventanas ocupan todo: se arranca con el escritorio a la vista. */
const initialWindows = () =>
  innerWidth <= FULLSCREEN_BELOW
    ? []
    : [{ id: WELCOME, ...spot(0, apps[WELCOME].width), z: 1, minimized: false, maximized: false }];

interface DesktopProps {
  onLogout: () => void;
}

export function Desktop({ onLogout }: DesktopProps) {
  const [startOpen, setStartOpen] = useState(false);
  const [balloonOpen, setBalloonOpen] = useState(false);
  const { wins, activeId, dispatch } = useWindows(initialWindows);
  const marquee = useMarquee();

  useEffect(() => {
    const timer = setTimeout(() => setBalloonOpen(true), BALLOON_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setStartOpen(false);
    };
    addEventListener("keydown", onKeyDown);
    return () => removeEventListener("keydown", onKeyDown);
  }, []);

  const count = wins.length;
  const open = useCallback(
    (id: string) => {
      setStartOpen(false);
      dispatch({ type: "open", id, ...spot(count, apps[id].width) });
    },
    [count, dispatch],
  );

  const onTask = (id: string) => {
    const win = wins.find((item) => item.id === id);
    if (win && !win.minimized && id === activeId) dispatch({ type: "minimize", id });
    else open(id);
  };

  return (
    <div
      className="desktop"
      {...marquee.handlers}
      onPointerDown={(event) => {
        setStartOpen(false);
        marquee.handlers.onPointerDown(event);
      }}
    >
      <nav className="icons" aria-label="Escritorio">
        {desktopApps.map((app) => (
          <button
            key={app.id}
            type="button"
            data-icon={app.id}
            className={cn("icon", marquee.selected.includes(app.id) && "icon--selected")}
            onClick={() => open(app.id)}
          >
            <AppIcon icon={app.icon} />
            <span>{app.title}</span>
          </button>
        ))}
      </nav>

      {marquee.box && <div className="marquee" style={marquee.box} aria-hidden="true" />}

      <main>
        {wins.map((win) => {
          const app = apps[win.id];
          return (
            <Window
              key={win.id}
              win={win}
              title={app.windowTitle ?? app.title}
              icon={<AppIcon icon={app.icon} size="sm" />}
              width={app.width}
              flush={app.flush}
              active={win.id === activeId}
              onFocus={() => win.id !== activeId && dispatch({ type: "focus", id: win.id })}
              onClose={() => dispatch({ type: "close", id: win.id })}
              onMinimize={() => dispatch({ type: "minimize", id: win.id })}
              onMaximize={() => dispatch({ type: "maximize", id: win.id })}
              onMove={(x, y) => dispatch({ type: "move", id: win.id, x, y })}
              onOpen={open}
            >
              {app.render(open)}
            </Window>
          );
        })}
      </main>

      <div onPointerDown={(event) => event.stopPropagation()}>
        {startOpen && <StartMenu onOpen={open} onLogout={onLogout} />}
        {balloonOpen && (
          <Balloon
            onOpen={() => {
              setBalloonOpen(false);
              open(CONTACT);
            }}
            onClose={() => setBalloonOpen(false)}
          />
        )}
        <Taskbar
          open={wins.map((win) => apps[win.id])}
          activeId={activeId}
          startOpen={startOpen}
          onToggleStart={() => setStartOpen((value) => !value)}
          onTask={onTask}
          onTray={() => setBalloonOpen((value) => !value)}
        />
      </div>
    </div>
  );
}
