# Blog Ideas & Quick MD Template

## 📝 Plantilla rápida para posts

Usa esta estructura para crear posts rápidamente. Solo copia, pega y modifica:

```markdown
---
title: "Mi título aquí"
slug: "mi-titulo-aqui"
excerpt: "Breve resumen del artículo en 1-2 oraciones."
tags: ["React", "Tutorial"]
cover_img: "url-de-imagen"
---

## Introducción

Describe el contexto del artículo...

## Desarrollo

### Subtema 1
Contenido...

### Subtema 2
Contenido...

## Conclusión

Resumen y próximos pasos...
```

---

## 💡 Ideas para posts del blog

### Desarrollo Web
1. **"Cómo construí mi portafolio con React + Supabase"** — Tutorial paso a paso
2. **"De JSON a PostgreSQL: Migrando datos de mi portafolio"** — Documentar este mismo proceso
3. **"React Router vs Next.js: ¿Cuándo usar cada uno?"** — Comparativa
4. **"Tailwind CSS 4: Lo nuevo y cómo migramos"** — Tips de migración
5. **"Animaciones con CSS puro: micro-interacciones que mejoran UX"**
6. **"Autenticación JWT en Node.js + Express"** — De tu experiencia en Imcetron

### UX/UI Design
7. **"Diseñé una app para oficios: Lecciones de Ponte Pilas"**
8. **"Dark mode done right: Principios de diseño oscuro"**
9. **"De Figma a código: Mi workflow de diseño"**

### Hardware & IoT
10. **"Comunicación accesible: Arduino para personas con discapacidad"** — Tu proyecto de Control de Comunicación
11. **"Primeros pasos con Arduino: Guía para developers"**

### Automatización
12. **"Automatizar correos con Google Apps Script"** — Tu proyecto de seguimiento
13. **"Google Workspace como backend gratis"**

### Carrera & Reflexiones
14. **"Mi primer trabajo como desarrollador: Lo que aprendí en Onza"**
15. **"Backend Junior: Del frontend al servidor"** — Tu transición
16. **"Participar en NASA Space Apps: La experiencia Forest Fall Silent"**
17. **"Ganar un concurso de C++: Mi historia en FESTI CODE"**

### Tutoriales rápidos
18. **"Deploy en GitHub Pages con Vite + React"**
19. **"Configurar Supabase en 10 minutos"**
20. **"ESLint + Prettier: Setup para React projects"**

---

## 🚀 Flujo rápido para publicar

1. Escribe tu post en markdown (usa la plantilla de arriba)
2. Ve al **SQL Editor** de Supabase y ejecuta:

```sql
INSERT INTO blog_posts (title, slug, excerpt, content, cover_img, published, published_at, tags)
VALUES (
  'Tu Título',
  '',  -- Se genera automáticamente del título
  'Resumen corto...',
  'Tu contenido **markdown** aquí...',
  'url-de-cover-image',
  true,
  NOW(),
  ARRAY['React', 'Tutorial']
);
```

3. ¡Listo! El post aparece automáticamente en tu blog.

---

## 🛠 Herramientas recomendadas para escribir MD

- **[Obsidian](https://obsidian.md/)** — Editor local, rápido, con preview en tiempo real
- **[StackEdit](https://stackedit.io/)** — Editor online de markdown
- **[Notion](https://notion.so/)** — Exporta a MD con un clic
- **VS Code + Markdown Preview** — Ya lo tienes instalado
