import { useCallback, useState } from "react";
import { Desktop } from "@/desktop/Desktop";
import { Boot, Login } from "@/desktop/Login";

type Phase = "boot" | "login" | "desktop";

/* Con ?escritorio en la URL se saltea el arranque y se entra directo. */
const firstPhase = (): Phase => (new URLSearchParams(location.search).has("escritorio") ? "desktop" : "boot");

export default function App() {
  const [phase, setPhase] = useState<Phase>(firstPhase);
  const toBoot = useCallback(() => setPhase("boot"), []);
  const toLogin = useCallback(() => setPhase("login"), []);
  const toDesktop = useCallback(() => setPhase("desktop"), []);

  if (phase === "boot") return <Boot onDone={toLogin} />;
  if (phase === "login") return <Login onDone={toDesktop} onPowerOff={toBoot} />;
  return <Desktop onLogout={toLogin} />;
}
