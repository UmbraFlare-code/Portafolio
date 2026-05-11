/**
 * Mapeo de Iconos de NerdFonts para habilidades
 */
export const HARD_SKILL_ICONS = {
  JavaScript: '\ue74e',
  TypeScript: '\ue628',
  React: '\ue7ba',
  'Tailwind CSS': '\ue8ba',
  CSS: '\ue749',
  CMS: '\uf109',
  'AWS Services': '\ue7ad',
  'C++': '\ue61d',
  Figma: '\ue7da',
  Arduino: '\ue733',
  Git: '\ue702',
  'Node.js': '\ue719',
  Express: '\ue7d3',
  PostgreSQL: '\ue76e',
  Python: '\ue73c',
  PHP: '\ued6d',
  'Google API': '\ue7f0',
  HTML: '\ue736',
  IoT: '\ue210',
  SQLite: '\ue7c4',
  Svelte: '\ue8b7',
  Rust: '\ue7a8',
  'UX/UI': '\uf03e',
};

export const SOFT_SKILL_ICONS = {
  'Trabajo en equipo': '',
  'Resolución de problemas': '',
  'Comunicación efectiva': '',
  'Adaptabilidad': '',
  'Pensamiento crítico': '󰗚',
  'Gestión del tiempo': '',
};

/**
 * Prioridades y Etiquetas de Categorías
 */
export const SKILL_PRIORITY = {
  frontend: 1,
  backend: 2,
  cloud: 3,
  database: 4,
  other: 5
};

export const CATEGORY_LABELS = {
  frontend: 'Front',
  backend: 'Back',
  cloud: 'Cloud',
  database: 'DB',
  other: 'Otro'
};

/**
 * Adaptadores de Dominio
 */

const unescapeUnicode = (str) => {
  if (!str) return str;
  return str.replace(/\\u([0-9a-fA-F]{4})/g, (match, grp) => {
    return String.fromCharCode(parseInt(grp, 16));
  });
};

const ensureAbsolutePath = (path) => {
  if (!path) return path;
  if (path.startsWith('http') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  
  const base = import.meta.env.BASE_URL || '/';
  
  // Limpiar el path de barras iniciales para normalizar
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Si estamos en desarrollo y el path original empezaba con /, 
  // lo preferimos tal cual para evitar problemas con el base local
  if (import.meta.env.DEV && path.startsWith('/')) {
    return path;
  }
  
  // Si el path ya contiene el base (sin contar el / inicial), no lo duplicamos
  const baseClean = base.replace(/\/$/, '').replace(/^\//, '');
  if (baseClean && cleanPath.startsWith(baseClean)) {
    return path.startsWith('/') ? path : `/${path}`;
  }

  // Unir base y path asegurando consistencia
  const fullPath = `${base}${cleanPath}`.replace(/\/+/g, '/');
  return fullPath;
};

export const skillAdapter = (raw) => {
  const tag = raw.tag || 'other';
  const isPriority = !!raw.priority;
  
  // Procesamos el icono para asegurar que los escapes de unicode se rendericen bien
  const dbIcon = unescapeUnicode(raw.icon);
  
  return {
    id: raw.id,
    name: raw.name,
    type: raw.type || 'hard',
    tag: tag,
    categoryLabel: CATEGORY_LABELS[tag] || 'Otro',
    icon: dbIcon || (raw.type === 'soft' 
      ? (SOFT_SKILL_ICONS[raw.name] || '')
      : (HARD_SKILL_ICONS[raw.name] || '')),
    isPriority: isPriority,
    // Prioridad absoluta: si es priority=true, va al principio (0), si no, por categoría (1-5)
    sortPriority: isPriority ? 0 : (SKILL_PRIORITY[tag] || 99)
  };
};

export const projectAdapter = (raw) => {
  const normalizedImg = ensureAbsolutePath(raw.img);
  return {
    ...raw,
    img: normalizedImg,
    categoryKey: raw.project_categories?.key ?? 'web',
    categoryLabel: raw.project_categories?.label ?? 'General',
    tags: raw.skills?.map(s => s.name) ?? [],
    // Normalizar imágenes
    thumbnail: normalizedImg || ensureAbsolutePath('assets/img/placeholder.png')
  };
};

export const experienceAdapter = (raw) => {
  return {
    ...raw,
    tags: raw.skills?.map(s => s.name) ?? []
  };
};

export const achievementAdapter = (raw) => {
  return {
    ...raw,
    image: ensureAbsolutePath(raw.image || raw.img),
    tags: raw.skills?.map(s => s.name) ?? []
  };
};

export const blogPostAdapter = (raw) => {
  return {
    ...raw,
    cover_img: ensureAbsolutePath(raw.cover_img)
  };
};

export const serviceAdapter = (raw) => {
  return {
    ...raw,
    // ID, name, description, sort_order are standard
  };
};

export const awardAdapter = (raw) => {
  return {
    ...raw,
    image: ensureAbsolutePath(raw.image || raw.img),
    tags: raw.skills?.map(s => s.name) ?? []
  };
};
