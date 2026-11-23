---
version: alpha
name: Luna
description: Portfolio de Tomás Aparicio como un escritorio de Windows XP — fondo de colina verde, barra de tareas azul, botón Inicio verde y ventanas con barra de título azul.
colors:
  primary: "#0C327D"
  ink: "#000000"
  muted: "#5B5B55"
  link: "#0046D5"
  rule: "#D6D2C2"
  surface: "#FFFFFF"
  chrome: "#ECE9D8"
  frame: "#0831D9"
  frame-idle: "#7A96DF"
  select: "#316AC5"
  taskbar: "#245DDB"
  start: "#399638"
  close: "#B8290F"
  on-dark: "#FFFFFF"
typography:
  window-title:
    fontFamily: Trebuchet MS
    fontSize: 13px
    fontWeight: 700
  heading:
    fontFamily: Trebuchet MS
    fontSize: 20px
    fontWeight: 700
    lineHeight: 1.2
  lead:
    fontFamily: Tahoma
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.4
  body:
    fontFamily: Tahoma
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: Tahoma
    fontSize: 11.5px
    fontWeight: 400
rounded:
  none: 0px
  control: 3px
  window: 8px
spacing:
  frame: 3px
  body: 18px
  taskbar: 30px
components:
  window-body:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    padding: 18px
  window-heading:
    textColor: "{colors.primary}"
    typography: "{typography.heading}"
  title-bar:
    backgroundColor: "{colors.frame}"
    textColor: "{colors.on-dark}"
    typography: "{typography.window-title}"
    rounded: "{rounded.window}"
    height: 29px
  title-bar-idle:
    backgroundColor: "{colors.frame-idle}"
    textColor: "{colors.on-dark}"
  caption-close:
    backgroundColor: "{colors.close}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.control}"
    size: 21px
  explorer-chrome:
    backgroundColor: "{colors.chrome}"
    textColor: "{colors.ink}"
  item-selected:
    backgroundColor: "{colors.select}"
    textColor: "{colors.on-dark}"
  taskbar:
    backgroundColor: "{colors.taskbar}"
    textColor: "{colors.on-dark}"
    height: 30px
  start-button:
    backgroundColor: "{colors.start}"
    textColor: "{colors.on-dark}"
  meta:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  text-link:
    textColor: "{colors.link}"
  row-divider:
    backgroundColor: "{colors.rule}"
    height: 1px
---

## Overview

El portfolio es un escritorio de Windows XP. No se scrollea: se abren ventanas.
Cada ícono es una parte del perfil y las carpetas agrupan ítems que abren su
propia ventana. Ventanas, barra de tareas y botón Inicio están dibujados con
CSS.

El sitio arranca como XP: pantalla negra de carga con la barra de tres bloques
y después la pantalla de bienvenida azul, con los textos de la versión en
español. En ambas el lugar de la marca lo ocupa el nombre de Tomás, sin logo:
no se usa la bandera de Windows, nunca dice "Microsoft" ni "Windows", el
copyright es de Tomás y no hay campo de contraseña.

Los íconos (`public/icons/*.png`) son los originales de Windows XP en 32px,
tomados del repositorio público `ShizukuIchi/winXP`. Son de Microsoft, no
propios. Cada experiencia o proyecto usa el archivo que lleva su mismo id.

El fondo (`public/wallpaper.jpg`) es "Bliss", la fotografía que traía Windows
XP, reducida a 1920×1080. Es una imagen de Microsoft, no propia: la eligió
Tomás a sabiendas y se bajó del link que él indicó.

## Colors

- **Primary (#0C327D):** títulos dentro de las ventanas.
- **Ink / Muted:** texto y metadatos, siempre sobre blanco o beige.
- **Surface / Chrome:** blanco para el contenido, beige para la cromería del explorador.
- **Frame (#0831D9) / Frame-idle (#7A96DF):** marco y barra de título de la ventana activa e inactiva.
- **Select (#316AC5):** ítem bajo el puntero, con texto blanco.
- **Taskbar / Start:** el azul de la barra y el verde del botón Inicio.
- **Close (#B8290F):** exclusivo del botón de cerrar.

## Typography

Tahoma para todo el texto y Trebuchet MS en negrita para barras de título y
encabezados, como en XP. Tamaños reales de interfaz: 11 a 13px.

## Layout

Columna de íconos a la izquierda y barra de tareas de 30px abajo. Las ventanas
nuevas se abren en cascada y se pueden arrastrar, minimizar, maximizar y
cerrar. En pantallas de menos de 720px las ventanas ocupan toda la pantalla.

## Elevation & Depth

La ventana activa tiene el marco azul saturado; las inactivas pasan a un azul
lavado. No hay transparencias ni desenfoques.

## Shapes

Solo las esquinas superiores de la ventana son redondeadas (8px). Controles con
3px. El botón Inicio es recto a la izquierda y redondo a la derecha.

## Motion & Micro-interaction

Las ventanas y el menú aparecen con un fade muy corto. Nada más se mueve. Con
`prefers-reduced-motion` no hay animación.

## Voice & Content Strategy

Español rioplatense, directo. Solo hechos verificables del CV.

## Do's and Don'ts

- No poner texto de lectura directo sobre el fondo.
- No usar el logo de Windows en ningún lado.
- No escribir "Microsoft" ni "Windows" como marca, ni atribuirle el copyright.
- No pedir contraseña en la pantalla de bienvenida.
- No mezclar íconos de otro estilo con los de XP: si falta uno, buscarlo en el mismo set.
- No sumar efectos de vidrio: eso es Vista, no XP.
- No linkear repos que no sean públicos.
