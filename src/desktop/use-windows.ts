import { useReducer } from "react";

export interface Win {
  id: string;
  x: number;
  y: number;
  /* Orden de apilado: la ventana con el z más alto es la activa. */
  z: number;
  minimized: boolean;
  maximized: boolean;
}

interface State {
  wins: Win[];
  top: number;
}

export type WinAction =
  | { type: "open"; id: string; x: number; y: number }
  | { type: "close"; id: string }
  | { type: "focus"; id: string }
  | { type: "minimize"; id: string }
  | { type: "maximize"; id: string }
  | { type: "move"; id: string; x: number; y: number };

const patch = (wins: Win[], id: string, change: Partial<Win>) =>
  wins.map((win) => (win.id === id ? { ...win, ...change } : win));

function reducer(state: State, action: WinAction): State {
  const top = state.top + 1;
  switch (action.type) {
    case "open": {
      if (state.wins.some((win) => win.id === action.id)) {
        return { top, wins: patch(state.wins, action.id, { minimized: false, z: top }) };
      }
      const win: Win = { id: action.id, x: action.x, y: action.y, z: top, minimized: false, maximized: false };
      return { top, wins: [...state.wins, win] };
    }
    case "close":
      return { ...state, wins: state.wins.filter((win) => win.id !== action.id) };
    case "focus":
      return { top, wins: patch(state.wins, action.id, { z: top }) };
    case "minimize":
      return { ...state, wins: patch(state.wins, action.id, { minimized: true }) };
    case "maximize": {
      const win = state.wins.find((item) => item.id === action.id);
      return { top, wins: patch(state.wins, action.id, { maximized: !win?.maximized, z: top }) };
    }
    case "move":
      return { ...state, wins: patch(state.wins, action.id, { x: action.x, y: action.y }) };
  }
}

export function useWindows(initial: () => Win[]) {
  const [state, dispatch] = useReducer(reducer, undefined, () => {
    const wins = initial();
    return { wins, top: wins.length };
  });
  const visible = state.wins.filter((win) => !win.minimized);
  const activeId = visible.reduce<Win | null>((best, win) => (!best || win.z > best.z ? win : best), null)?.id ?? null;
  return { wins: state.wins, activeId, dispatch };
}
