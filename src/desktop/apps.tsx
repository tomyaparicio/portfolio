import type { ReactNode } from "react";
import { entries, type EntryId, sites } from "@/content/portfolio";
import {
  BrowserWindow,
  ContactWindow,
  CvWindow,
  EntryWindow,
  type FolderItem,
  FolderWindow,
  GalleryWindow,
  ProfileWindow,
  siteAppId,
  SystemWindow,
} from "./contents";

export interface AppDef {
  id: string;
  title: string;
  /* Título de la ventana cuando no coincide con el nombre del ícono. */
  windowTitle?: string;
  /* Nombre del ícono en public/icons, sin extensión. */
  icon: string;
  width: number;
  flush?: boolean;
  render: (open: (id: string) => void) => ReactNode;
}

const EXPERIENCE: EntryId[] = ["municipalidad", "policia"];
const PROJECTS: EntryId[] = ["erp", "llamadas", "rag", "whisper", "jobs"];

/* Cada experiencia o proyecto usa el ícono que lleva su mismo id. */
const entryApps: AppDef[] = entries.map((entry) => ({
  id: entry.id,
  title: entry.title,
  icon: entry.id,
  width: 540,
  render: () => <EntryWindow entry={entry} />,
}));

const folderItems = (ids: EntryId[]): FolderItem[] =>
  entries
    .filter((entry) => ids.includes(entry.id))
    .map((entry) => ({ id: entry.id, title: entry.title, subtitle: entry.tag, icon: entry.id }));

/* Íconos del escritorio, en orden. */
export const desktopApps: AppDef[] = [
  { id: "perfil", title: "Sobre mí", icon: "about", width: 520, render: () => <ProfileWindow /> },
  {
    id: "experiencia",
    title: "Experiencia",
    icon: "experience",
    width: 520,
    flush: true,
    render: (open) => <FolderWindow path="Experiencia" items={folderItems(EXPERIENCE)} onOpen={open} />,
  },
  {
    id: "proyectos",
    title: "Proyectos",
    icon: "projects",
    width: 520,
    flush: true,
    render: (open) => <FolderWindow path="Proyectos" items={folderItems(PROJECTS)} onOpen={open} />,
  },
  {
    id: "imagenes",
    title: "Mis imágenes",
    icon: "pictures",
    width: 700,
    flush: true,
    render: () => <GalleryWindow />,
  },
  {
    id: "stack",
    title: "Stack",
    windowTitle: "Propiedades del sistema",
    icon: "stack",
    width: 430,
    flush: true,
    render: () => <SystemWindow />,
  },
  { id: "cv", title: "Mi CV", icon: "cv", width: 700, flush: true, render: () => <CvWindow /> },
  { id: "contacto", title: "Contacto", icon: "contact", width: 440, render: () => <ContactWindow /> },
];

/* Una ventana de navegador por cada sitio registrado en el contenido. */
const siteApps: AppDef[] = Object.entries(sites).map(([key, site]) => ({
  id: siteAppId(key),
  title: site.title,
  icon: "web",
  width: site.width ?? 780,
  flush: true,
  render: () => <BrowserWindow site={site} />,
}));

export const apps: Record<string, AppDef> = Object.fromEntries(
  [...desktopApps, ...entryApps, ...siteApps].map((app) => [app.id, app]),
);
