import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { MagneticButton } from "@/components/amicro/magnetic-button";
import { WordReveal } from "@/components/amicro/word-reveal";
import {
  contact,
  cv,
  type Entry,
  hero,
  profile,
  shots,
  type Site,
  sites,
  type Spec,
  stack,
  system,
} from "@/content/portfolio";
import { cn } from "@/lib/utils";
import { AppIcon } from "./AppIcon";
import { useWindowActions } from "./Window";

/* Contenido de cada ventana. */

function Specs({ specs }: { specs: Spec[] }) {
  return (
    <dl className="specs">
      {specs.map((spec) => (
        <div key={spec.label}>
          <dt>{spec.label}</dt>
          <dd>{spec.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function ProfileWindow() {
  return (
    <article className="doc">
      <p className="doc__kicker">{hero.tag}</p>
      <h3 className="doc__title">{hero.name}</h3>
      <WordReveal text={profile.statement} className="doc__lead" staggerDelay={0.02} />
      <p>{profile.copy}</p>
      <Specs specs={[...profile.specs, { label: "Ubicación", value: hero.location }]} />
    </article>
  );
}

export const siteAppId = (key: string) => `web:${key}`;
const shotUrl = (file: string) => `${import.meta.env.BASE_URL}shots/${file}`;

export function EntryWindow({ entry }: { entry: Entry }) {
  const { open } = useWindowActions();
  const site = entry.site ? sites[entry.site] : undefined;
  const shot = shots.find((item) => item.entry === entry.id);

  return (
    <article className="doc">
      <p className="doc__kicker">{entry.tag}</p>
      <h3 className="doc__title">{entry.title}</h3>
      {entry.role && <p className="doc__role">{entry.role}</p>}
      {shot && (
        <figure className="doc__shot">
          <img src={shotUrl(shot.file)} alt={shot.caption} loading="lazy" />
          <figcaption>{shot.caption}</figcaption>
        </figure>
      )}
      {entry.copy && <p>{entry.copy}</p>}
      {entry.bullets && (
        <ul className="doc__list">
          {entry.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      )}
      <Specs specs={entry.specs} />
      {entry.site && site && (
        <p className="doc__actions">
          <MagneticButton onClick={() => open(siteAppId(entry.site!))} range={80} strength={0.2}>
            <span className="flex items-center gap-1.5">
              <AppIcon icon="web" size="sm" />
              {site.action}
            </span>
          </MagneticButton>
        </p>
      )}
    </article>
  );
}

/* Mis imágenes en vista de tira: una captura grande, flechas y las miniaturas abajo. */
export function GalleryWindow() {
  const { open } = useWindowActions();
  const [index, setIndex] = useState(0);
  const shot = shots[index];
  const step = (delta: number) => setIndex((current) => (current + delta + shots.length) % shots.length);

  return (
    <div className="gallery">
      <p className="explorer__path">
        Tomás <ChevronRight size={12} aria-hidden="true" /> Mis imágenes
      </p>

      <div className="gallery__view">
        <img key={shot.file} src={shotUrl(shot.file)} alt={shot.caption} />
      </div>

      <div className="gallery__bar">
        <MagneticButton onClick={() => step(-1)} range={50} strength={0.2}>
          ◀ Anterior
        </MagneticButton>
        <p className="gallery__caption">
          <b>{shot.title}</b>
          {shot.caption}
        </p>
        <MagneticButton onClick={() => step(1)} range={50} strength={0.2}>
          Siguiente ▶
        </MagneticButton>
      </div>

      <ul className="gallery__strip">
        {shots.map((item, i) => (
          <li key={item.file}>
            <button
              type="button"
              className={cn("thumb", i === index && "thumb--on")}
              aria-pressed={i === index}
              onClick={() => setIndex(i)}
            >
              <img src={shotUrl(item.file)} alt="" loading="lazy" />
              {item.file}
            </button>
          </li>
        ))}
      </ul>

      <p className="gallery__status">
        <span>
          {shots.length} objetos · {index + 1} de {shots.length}
        </span>
        <button type="button" className="gallery__link" onClick={() => open(shot.entry)}>
          Ver la ficha del proyecto
        </button>
      </p>
    </div>
  );
}

/* Navegador del escritorio: muestra el sitio adentro de la ventana si el sitio lo permite. */
export function BrowserWindow({ site }: { site: Site }) {
  const host = new URL(site.url).host;

  return (
    <div className="web">
      <p className="web__bar">
        <span className="web__label">Dirección</span>
        <span className="web__url">
          <AppIcon icon="web" size="sm" />
          {site.url}
        </span>
        <MagneticButton href={site.url} external range={60} strength={0.2}>
          Abrir en otra pestaña ↗
        </MagneticButton>
      </p>

      {site.embed ? (
        <iframe
          className="web__frame"
          src={site.url}
          title={site.title}
          loading="lazy"
          referrerPolicy="no-referrer"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
        />
      ) : (
        <div className="web__error">
          <h3>No se puede mostrar la página</h3>
          <p>
            {host} no permite abrirse dentro de otra página, así que no puede verse en esta ventana.
          </p>
          <hr />
          <p>Probá lo siguiente:</p>
          <ul>
            <li>
              Abrila en una pestaña nueva con el botón <b>Abrir en otra pestaña</b>.
            </li>
          </ul>
        </div>
      )}

      <p className="web__status">{site.embed ? "Listo" : "Listo, con errores"}</p>
    </div>
  );
}

export interface FolderItem {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
}

interface FolderWindowProps {
  path: string;
  items: FolderItem[];
  onOpen: (id: string) => void;
}

export function FolderWindow({ path, items, onOpen }: FolderWindowProps) {
  return (
    <div className="explorer">
      <p className="explorer__path">
        Tomás <ChevronRight size={12} aria-hidden="true" /> {path}
      </p>
      <ul className="explorer__files">
        {items.map((item) => (
          <li key={item.id}>
            <button type="button" className="file" onClick={() => onOpen(item.id)}>
              <AppIcon icon={item.icon} />
              <span>
                <b>{item.title}</b>
                <small>{item.subtitle}</small>
              </span>
            </button>
          </li>
        ))}
      </ul>
      <p className="explorer__status">{items.length} elementos</p>
    </div>
  );
}

const SYSTEM_TABS = ["General", "Stack"] as const;

/* Propiedades del sistema: el perfil como ficha de una PC, más el stack completo en otra pestaña. */
export function SystemWindow() {
  const { close } = useWindowActions();
  const [tab, setTab] = useState<(typeof SYSTEM_TABS)[number]>("General");

  return (
    <div className="sys">
      <div className="sys__tabs" role="tablist">
        {SYSTEM_TABS.map((name) => (
          <button
            key={name}
            type="button"
            role="tab"
            aria-selected={tab === name}
            className={cn("sys__tab", tab === name && "sys__tab--on")}
            onClick={() => setTab(name)}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="sys__panel" role="tabpanel">
        {tab === "General" ? (
          <div className="sys__general">
            <AppIcon icon="stack" className="sys__pc" />
            <div>
              <section className="sys__group">
                <h3>Sistema:</h3>
                {system.sistema.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </section>
              <section className="sys__group">
                <h3>Registrado a nombre de:</h3>
                {system.registrado.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </section>
              <section className="sys__group">
                <h3>Equipo:</h3>
                {system.equipo.map((part) => (
                  <p key={part.label}>
                    {part.label}: {part.value}
                  </p>
                ))}
              </section>
            </div>
          </div>
        ) : (
          <Specs specs={stack} />
        )}
      </div>

      <p className="sys__actions">
        <MagneticButton onClick={close} range={60} strength={0.2} className="min-w-[75px]">
          Aceptar
        </MagneticButton>
      </p>
    </div>
  );
}

const CV_FILE = "Tomas_Aparicio_CV.pdf";
const CV_URL = `${import.meta.env.BASE_URL}${CV_FILE}`;

const CV_MENU = ["Archivo", "Edición", "Ver", "Insertar", "Formato", "Ayuda"];

/* El CV como documento en un procesador de texto: hoja blanca sobre fondo gris. El PDF queda para descargar. */
export function CvWindow() {
  return (
    <div className="cv">
      <p className="cv__menu" aria-hidden="true">
        {CV_MENU.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </p>
      <p className="cv__bar">
        <MagneticButton href={CV_URL} download={CV_FILE} range={70} strength={0.2}>
          Descargar PDF
        </MagneticButton>
        <MagneticButton href={CV_URL} external range={70} strength={0.2}>
          Abrir PDF ↗
        </MagneticButton>
      </p>

      <div className="cv__desk">
        <article className="page">
          <header className="page__head">
            <h3>{cv.name}</h3>
            <p className="page__headline">{cv.headline}</p>
            <p className="page__contact">{cv.contact.join(" • ")}</p>
          </header>

          <section>
            <h4>Perfil</h4>
            <p>{cv.perfil}</p>
          </section>

          <section>
            <h4>Habilidades técnicas</h4>
            <dl className="page__skills">
              {cv.habilidades.map((skill) => (
                <div key={skill.label}>
                  <dt>{skill.label}</dt>
                  <dd>{skill.value}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section>
            <h4>Experiencia profesional</h4>
            {cv.experiencia.map((job) => (
              <div key={job.org} className="page__job">
                <p className="page__role">
                  {job.role} — {job.org}
                </p>
                <p className="page__when">
                  {job.period} | {job.place}
                </p>
                <ul>
                  {job.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          <section>
            <h4>Proyectos</h4>
            <ul>
              {cv.proyectos.map((project) => (
                <li key={project.title}>
                  <b>{project.title}:</b> {project.text}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4>Educación</h4>
            <p className="page__role">{cv.educacion.title}</p>
            <p className="page__when">{cv.educacion.detail}</p>
          </section>

          <section>
            <h4>Idiomas</h4>
            <p>{cv.idiomas}</p>
          </section>
        </article>
      </div>
    </div>
  );
}

export function ContactWindow() {
  const { shake } = useWindowActions();
  const [nudges, setNudges] = useState(0);

  const nudge = () => {
    shake();
    setNudges((count) => count + 1);
  };

  return (
    <article className="doc">
      <p className="doc__kicker">{hero.location}</p>
      <h3 className="doc__title">Hablemos</h3>
      <p>Escribime por mail o mirá mi código en GitHub.</p>
      <p>
        <a className="doc__mail" href={`mailto:${contact.email}`}>
          {contact.email}
        </a>
      </p>
      <p className="doc__actions">
        <MagneticButton href={`mailto:${contact.email}`} range={80} strength={0.2}>
          Enviar correo
        </MagneticButton>
        <MagneticButton href={contact.github} external range={80} strength={0.2}>
          GitHub ↗
        </MagneticButton>
        <MagneticButton onClick={nudge} range={80} strength={0.2}>
          <span className="flex items-center gap-1.5">
            <AppIcon icon="msn" size="sm" />
            Enviar zumbido
          </span>
        </MagneticButton>
      </p>
      {nudges > 0 && (
        <p className="doc__note" role="status">
          {nudges === 1 ? "Le enviaste un zumbido a Tomás." : `Le enviaste ${nudges} zumbidos a Tomás.`} Por mail
          contesta más rápido.
        </p>
      )}
    </article>
  );
}
