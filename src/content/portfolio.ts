export interface Spec {
  label: string;
  value: string;
}

export type EntryId = "municipalidad" | "policia" | "erp" | "llamadas" | "rag" | "whisper" | "jobs";

export interface Entry {
  id: EntryId;
  tag: string;
  title: string;
  role?: string;
  copy?: string;
  bullets?: string[];
  specs: Spec[];
  /* Sitio del proyecto, para abrirlo en el navegador del escritorio. Clave de `sites`. */
  site?: string;
}

export interface Site {
  title: string;
  url: string;
  /* true si el sitio se deja mostrar dentro de otra página. Muchos lo prohíben (GitHub, por ejemplo):
     antes de marcarlo, revisar que no mande X-Frame-Options ni CSP frame-ancestors. */
  embed: boolean;
  /* Texto del botón que lo abre desde la ficha. */
  action: string;
  /* Ancho de la ventana; angosto para apps pensadas para el celular. */
  width?: number;
}

/* Sitios que se abren en una ventana de navegador dentro del escritorio. */
export const sites: Record<string, Site> = {
  estacionamiento: {
    title: "Pago Estacionamiento Córdoba",
    url: "https://estacionamiento.cordoba.gob.ar/pago",
    embed: true,
    action: "Ver la app de estacionamiento",
  },
};

export const hero = {
  tag: "Software Engineer (Python) · AI Engineer · Full Stack",
  name: "Tomás Aparicio",
  lead: "Desarrollador full stack con más de 3 años de experiencia profesional y backend en Python en producción, con foco en IA aplicada.",
  location: "Córdoba, Argentina",
};

export const profile = {
  statement:
    "Trabajo en la Secretaría de Ciudad Inteligente de la Municipalidad de Córdoba, en un equipo de diez desarrolladores, y mantengo por mi cuenta un ERP industrial en producción.",
  copy: "Mi foco es la IA aplicada: pipelines de procesamiento documental con OCR y agentes, salidas estructuradas con LLM, RAG y visión por computadora. Vengo de dos años de .NET/C#, así que me muevo bien entre Python y .NET.",
  specs: [
    { label: "Formación", value: "Ingeniería en Software, Universidad Siglo 21. Estudiante avanzado" },
    { label: "Idiomas", value: "Español nativo · Inglés B1, técnico fluido" },
  ] satisfies Spec[],
};

export const entries: Entry[] = [
  {
    id: "municipalidad",
    tag: "Experiencia · Oct 2025 – Actualidad",
    title: "Municipalidad de Córdoba",
    role: "Full Stack Developer · Secretaría de Ciudad Inteligente",
    bullets: [
      "Control de estacionamiento por visión por computadora y validación documental de trámites con un LLM de visión, con guardrails anti-alucinación y score de confianza, integrado a Mi Docta.",
      "Pipeline documental que encadena OCR y agentes especializados hasta una salida estructurada y validada.",
      "Interfaz de voz sobre Gemini y asistente RAG sobre documentos.",
      "Backoffice geoespacial con mapas de calor coropléticos y dashboards de KPIs.",
      "PWA de pagos de estacionamiento: flujo en cuatro pasos, DoctaPay y geolocalización en tiempo real.",
    ],
    specs: [
      { label: "Stack", value: "Python · FastAPI · Pydantic AI · Gemini · PostgreSQL / PostGIS · Vue 3 · Quasar · React" },
      { label: "Equipo", value: "10 desarrolladores · Scrum · code review · CI" },
    ],
    site: "estacionamiento",
  },
  {
    id: "policia",
    tag: "Experiencia · Jun 2023 – Oct 2025",
    title: "Policía de Córdoba",
    role: "Desarrollador de Software",
    copy: "Desarrollo full stack de sistemas internos de gestión institucional en producción.",
    bullets: [
      "Evaluación para ascensos: revisión de legajos y elegibilidad.",
      "Postulaciones de ingreso, de la inscripción a la evaluación.",
      "Credenciales, registro de detenidos y resguardo de armas y equipamiento.",
    ],
    specs: [{ label: "Stack", value: "Vue.js · Vuetify · .NET / C#" }],
  },
  {
    id: "erp",
    tag: "Proyecto propio · En producción",
    title: "ERP industrial",
    copy: "Un ERP industrial que desarrollo y mantengo por mi cuenta, corriendo en producción.",
    specs: [
      { label: "API", value: "87 endpoints REST" },
      { label: "Tests", value: "107 automatizados con pytest" },
      { label: "Stack", value: "Next.js · FastAPI · PostgreSQL · Docker Compose · GitHub Actions" },
    ],
  },
  {
    id: "llamadas",
    tag: "Trabajo final de grado · En curso",
    title: "Análisis automático de llamadas",
    copy: "Analiza el 100% de las llamadas de un centro de atención, no una muestra manual. Combina transcripción y NLP con rasgos acústicos de la voz para detectar tensión y escalamientos temprano, y generar indicadores objetivos de calidad.",
    specs: [
      { label: "Stack", value: "Vue 3 · TypeScript · FastAPI · PostgreSQL · Docker" },
      { label: "Marco", value: "Universidad Siglo 21" },
    ],
  },
  {
    id: "rag",
    tag: "Proyecto personal · IA aplicada",
    title: "RAG como grafo",
    copy: "Retrieval-Augmented Generation con LangChain para las piezas y LangGraph para el flujo. Al estar modelado como grafo se le suman nodos (reformular, verificar, memoria) sin reescribir nada: la base para agentes. Con chat web y modo consola.",
    specs: [{ label: "Stack", value: "Python · LangChain · LangGraph · FastAPI" }],
  },
  {
    id: "whisper",
    tag: "Proyecto personal · IA en el navegador",
    title: "Transcripción 100% local",
    copy: "Extensión de Chrome y app web que pasan audio a texto en vivo con Whisper corriendo en la propia máquina: el audio nunca sale del dispositivo. Usa WebGPU si está disponible y cae a WASM si no.",
    specs: [{ label: "Stack", value: "Transformers.js · Web Audio · Chrome Manifest V3" }],
  },
  {
    id: "jobs",
    tag: "Proyecto personal · Automatización",
    title: "Job Hunter",
    copy: "Agregador de ofertas de desarrollo sin scraping: consume cuatro APIs públicas y pasa cada oferta por un pipeline de filtros (rol, especialización, seniority, ubicación, afinidad técnica) ordenado para descartar lo antes posible. Cero dependencias.",
    specs: [{ label: "Stack", value: "Node.js · APIs públicas" }],
  },
];

export const stack: Spec[] = [
  { label: "Backend", value: "Python · FastAPI (async) · SQLAlchemy · Alembic · Pydantic · pytest" },
  { label: "IA / LLM", value: "Pydantic AI · LangChain · LangGraph · Gemini · RAG · OCR · visión por computadora" },
  { label: "Datos", value: "PostgreSQL · PostGIS · modelado y migraciones" },
  { label: "Frontend", value: "Vue 3 · Quasar · TypeScript · React · Next.js · PWA · Leaflet" },
  { label: "DevOps", value: "Docker · Docker Compose · GitHub Actions · Git" },
  { label: "Otros", value: "C# / .NET · Claude Code, Cursor, Copilot" },
];

/* Pestaña "General" de Propiedades del sistema: el perfil contado como ficha de una PC. */
export const system = {
  sistema: [hero.name, "Software Engineer (Python) · AI Engineer", "Versión 2026 · Service Pack 3"],
  registrado: ["Municipalidad de Córdoba", "Secretaría de Ciudad Inteligente"],
  equipo: [
    { label: "Procesador", value: "Python · FastAPI (async)" },
    { label: "Coprocesador de IA", value: "Pydantic AI · LangChain · LangGraph" },
    { label: "Memoria", value: "Más de 3 años de experiencia profesional" },
    { label: "Disco", value: "PostgreSQL · PostGIS" },
    { label: "Pantalla", value: "Vue 3 · React · TypeScript" },
  ] satisfies Spec[],
};

export interface Shot {
  /* Archivo en public/shots. */
  file: string;
  title: string;
  caption: string;
  /* Proyecto o experiencia al que pertenece. */
  entry: EntryId;
}

/* Capturas reales de los proyectos, sacadas de la app corriendo. No sumar maquetas ni plantillas. */
export const shots: Shot[] = [
  {
    file: "estacionamiento.png",
    title: "Estacionamiento",
    caption: "App de pagos de estacionamiento de la Municipalidad de Córdoba, en producción.",
    entry: "municipalidad",
  },
  {
    file: "whisper.png",
    title: "Transcripción local",
    caption: "App web que pasa audio a texto con Whisper corriendo en el navegador.",
    entry: "whisper",
  },
  {
    file: "rag.png",
    title: "RAG",
    caption: "Chat del RAG con LangGraph, en su pantalla inicial.",
    entry: "rag",
  },
];

/* El CV completo, tal como está en el PDF (public/Tomas_Aparicio_CV.pdf). Si cambia el PDF, actualizar acá. */
export const cv = {
  name: "Tomás Aparicio",
  headline: "Software Engineer (Python) | AI Engineer | Full Stack",
  contact: ["Córdoba, Argentina", "tomyaparicio99@gmail.com"],
  perfil:
    "Desarrollador full stack con más de 3 años de experiencia profesional y backend en Python (FastAPI) en producción, con foco en IA aplicada: pipelines de procesamiento documental con OCR y agentes, salidas estructuradas con LLM, RAG y visión por computadora. Trabajo hoy en la Secretaría de Ciudad Inteligente de la Municipalidad de Córdoba, en un equipo de diez desarrolladores con pull requests, code review y CI, y mantengo por mi cuenta un ERP industrial en producción. Vengo de dos años de desarrollo en .NET/C#, por lo que me muevo bien entre Python y ecosistemas .NET. Uso agentes de IA para programar (Claude Code, Cursor, Copilot) todos los días. Estudiante avanzado de Ingeniería en Software.",
  habilidades: [
    { label: "Python y backend", value: "Python, FastAPI (async), SQLAlchemy, Alembic, Pydantic, pytest, APIs REST, procesamiento asíncrono" },
    { label: "IA / LLM", value: "Pydantic AI, LangChain, LangGraph, Gemini, RAG, salidas estructuradas, guardrails anti-alucinación, agentes especializados, OCR, visión por computadora, validación con LLM de visión" },
    { label: "Datos", value: "PostgreSQL, PostGIS (datos geoespaciales), modelado y migraciones, exportación a Excel y PDF" },
    { label: "Frontend", value: "Vue 3, Quasar, TypeScript, React (hooks, manejo de estado), Next.js, Vuetify, PWA, Leaflet" },
    { label: "DevOps y calidad", value: "Docker, Docker Compose, GitHub Actions (CI), Git, pytest (tests automatizados), code review, Scrum" },
    { label: "Otros", value: "C# / .NET (2 años en producción), desarrollo asistido por IA (Claude Code, Cursor, Copilot)" },
  ] satisfies Spec[],
  experiencia: [
    {
      role: "Full Stack Developer",
      org: "Secretaría de Ciudad Inteligente, Municipalidad de Córdoba",
      period: "Oct 2025 – Actualidad",
      place: "Córdoba, Argentina",
      bullets: [
        "IA aplicada con Python: control de estacionamiento por visión por computadora (validación de patente) y validación documental de trámites con un LLM de visión, con guardrails anti-alucinación y score de confianza, integrado a Mi Docta.",
        "Pipeline de procesamiento documental que encadena OCR y agentes de IA especializados hasta obtener una salida estructurada y validada (Pydantic AI, Gemini).",
        "Interfaz de voz sobre Gemini con salidas estructuradas y asistente RAG sobre documentos.",
        "Backend en Python con FastAPI (async), SQLAlchemy y Alembic sobre PostgreSQL/PostGIS para plataformas municipales en producción.",
        "Backoffice geoespacial con mapas de calor coropléticos, dashboards de KPIs, filtros dinámicos y exportación a Excel y PDF.",
        "Frontend con Vue 3, Quasar y TypeScript, y React (hooks, estado, TypeScript): PWA de pagos de estacionamiento municipal con flujo de pago en cuatro pasos, integración con DoctaPay, geolocalización en tiempo real y mapas interactivos con Leaflet.",
        "Trabajo en equipo de diez desarrolladores con Scrum, control de versiones, pull requests, code review y CI.",
      ],
    },
    {
      role: "Desarrollador de Software",
      org: "Policía de Córdoba",
      period: "Jun 2023 – Oct 2025",
      place: "Córdoba, Argentina",
      bullets: [
        "Desarrollo full stack con Vue.js, Vuetify y .NET/C# para sistemas internos de gestión institucional en producción.",
        "Sistemas de evaluación para ascensos (revisión de legajos y elegibilidad), postulaciones de ingreso (flujo completo de inscripción a evaluación), credenciales, registro de detenidos y resguardo de armas y equipamiento.",
      ],
    },
  ],
  proyectos: [
    {
      title: "ERP industrial (proyecto propio, en producción)",
      text: "Next.js, FastAPI y PostgreSQL; 87 endpoints REST, 107 tests automatizados con pytest, Docker Compose y GitHub Actions.",
    },
  ],
  educacion: {
    title: "Ingeniería en Software — Universidad Empresarial Siglo 21",
    detail: "2024 – presente | Estudiante avanzado, trabajo final de grado en curso",
  },
  idiomas: "Español: nativo. Inglés: intermedio (B1) hablado, con lectura y escritura técnica fluidas.",
};

/* Globo de la bandeja del sistema. */
export const notice = {
  title: "Tomás está disponible para trabajar",
  body: "Hacé clic acá para escribirle.",
};

export const contact = {
  email: "tomyaparicio99@gmail.com",
  github: "https://github.com/tomyaparicio",
};
