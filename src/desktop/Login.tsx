import { useEffect, useState } from "react";
import { hero } from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { AppIcon } from "./AppIcon";

/* Arranque: pantalla negra de carga y pantalla de bienvenida, calcadas del XP original.
   Los textos de la bienvenida son los de la versión en español de XP. */

const BOOT_MS = 3200;
const LOADING_MS = 1100;
const WELCOME_MS = 1200;
const REDUCED_MS = 350;

const reducedMotion = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

/* El nombre en el lugar de la marca. Sin logo: el de Windows no se usa. */
function Brand({ className }: { className?: string }) {
  return (
    <div className={cn("brand", className)}>
      <p className="brand__name">
        <small>Portfolio</small>
        <span>
          {hero.name}
          <sup>xp</sup>
        </span>
      </p>
    </div>
  );
}

interface BootProps {
  onDone: () => void;
}

/* Pantalla negra con la barra de tres bloques. Un clic o una tecla la saltea. */
export function Boot({ onDone }: BootProps) {
  useEffect(() => {
    const timer = setTimeout(onDone, reducedMotion() ? REDUCED_MS : BOOT_MS);
    addEventListener("keydown", onDone);
    return () => {
      clearTimeout(timer);
      removeEventListener("keydown", onDone);
    };
  }, [onDone]);

  return (
    <div className="boot" role="status" aria-label="Cargando" onClick={onDone}>
      <div className="boot__center">
        <Brand className="brand--boot" />
        <p className="boot__edition">Professional</p>
        <div className="boot__bar" aria-hidden="true">
          <div className="boot__blocks">
            <i />
            <i />
            <i />
          </div>
        </div>
      </div>
      <p className="boot__foot">
        <span>Copyright © {hero.name}</span>
        <b>{hero.location}</b>
      </p>
    </div>
  );
}

type Step = "pick" | "loading" | "welcome";

interface LoginProps {
  onDone: () => void;
  onPowerOff: () => void;
}

export function Login({ onDone, onPowerOff }: LoginProps) {
  const [step, setStep] = useState<Step>("pick");

  // El fondo del escritorio se baja mientras se ve esta pantalla, así no aparece a medio cargar.
  useEffect(() => {
    new Image().src = `${import.meta.env.BASE_URL}wallpaper.jpg`;
  }, []);

  useEffect(() => {
    if (step === "pick") return;
    const reduce = reducedMotion();
    const timer =
      step === "loading"
        ? setTimeout(() => setStep("welcome"), reduce ? REDUCED_MS : LOADING_MS)
        : setTimeout(onDone, reduce ? REDUCED_MS : WELCOME_MS);
    return () => clearTimeout(timer);
  }, [step, onDone]);

  return (
    <div className="login">
      <div className="login__band" />

      <main className="login__main">
        <div className="login__left">
          <Brand />
          {step === "pick" && <p className="login__hint">Para comenzar, haga clic en su nombre de usuario</p>}
        </div>
        <div className="login__divider" aria-hidden="true" />
        <div className="login__right">
          {step === "welcome" ? (
            <p className="login__welcome" role="status">
              Bienvenido
            </p>
          ) : (
            <button
              type="button"
              className={cn("login__user", step === "loading" && "login__user--on")}
              autoFocus
              disabled={step !== "pick"}
              onClick={() => setStep("loading")}
            >
              <AppIcon icon="about" className="login__avatar" />
              <span>
                <b>{hero.name}</b>
                <small>{step === "loading" ? "Cargando su configuración personal..." : "Software Engineer (Python)"}</small>
              </span>
            </button>
          )}
        </div>
      </main>

      <div className="login__band login__band--bottom">
        <button type="button" className="login__power" onClick={onPowerOff}>
          <AppIcon icon="power" />
          Apagar equipo
        </button>
        <p>
          Después de iniciar sesión, puede agregar o modificar cuentas.
          <br />
          Sólo tiene que ir al Panel de control y hacer clic en Cuentas de usuario.
        </p>
      </div>
    </div>
  );
}
