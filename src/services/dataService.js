import { supabase } from '../lib/supabaseClient';
import { skillAdapter, projectAdapter, experienceAdapter, achievementAdapter, blogPostAdapter, serviceAdapter } from './adapters';

// ─── Cache Mechanism (Persistent in Session) ──────────────
const withCache = async (key, fetcher) => {
  const isBrowser = typeof window !== 'undefined';

  if (isBrowser) {
    try {
      const cached = sessionStorage.getItem(key);
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      console.warn('[Cache Error] Failed to read from sessionStorage', e);
    }
  }

  const result = await fetcher();

  if (isBrowser) {
    try {
      sessionStorage.setItem(key, JSON.stringify(result));
    } catch (e) {
      console.warn('[Cache Error] Failed to write to sessionStorage', e);
    }
  }

  return result;
};

// ─── Projects ───────────────────────────────────────────
export async function getProjects() {
  return withCache('projects', async () => {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        name,
        slug,
        description,
        period,
        technical_details,
        url,
        img,
        featured,
        status,
        content,
        project_categories(key, label),
        skills(name)
      `)
      .order('featured', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return data.map(projectAdapter);
  });
}

/**
 * Servicio genérico para enriquecer entidades con sus habilidades
 */
export async function getEntitySkills(relationTable, idColumn, entityId) {
  return withCache(`skills_${relationTable}_${entityId}`, async () => {
    const { data, error } = await supabase
      .from(relationTable)
      .select('skills(name)')
      .eq(idColumn, entityId);

    if (error) {
      console.error(`Error fetching skills for ${relationTable}:`, error);
      return [];
    }

    return data.map(item => item.skills.name);
  });
}

export async function getProjectBySlug(slug) {
  return withCache(`project-${slug}`, async () => {
    const { data, error } = await supabase
      .from('projects')
      .select(`
        id,
        name,
        slug,
        description,
        period,
        technical_details,
        url,
        img,
        featured,
        status,
        content,
        project_categories(key, label)
      `)
      .eq('slug', slug)
      .single();

    if (error) {
      console.error('Error fetching project by slug:', error);
      return null;
    }

    return projectAdapter(data);
  });
}

export async function getProjectCategories() {
  return withCache('project_categories', async () => {
    const { data, error } = await supabase
      .from('project_categories')
      .select('*');

    if (error) throw error;

    const categories = {};
    for (const cat of data) {
      categories[cat.key] = cat.label;
    }
    return categories;
  });
}

// get experiences with their skills
export async function getExperiences() {
  return withCache('experiences', async () => {
    const { data: experiences, error: eErr } = await supabase
      .from('experiences')
      .select(`
        id,
        company,
        role,
        period,
        description,
        sort_order,
        skills(name)
      `)
      .order('sort_order', { ascending: false });

    if (eErr) {
      console.error('Error fetching experiences:', eErr);
      return [];
    }

    return experiences.map(experienceAdapter);
  });
}

// ─── Achievements (Logros, Certificaciones, Premios, Cursos) ───
export async function getAchievements() {
  return withCache('achievements', async () => {
    const { data: achievements, error } = await supabase
      .from('achievements')
      .select('*')
      .order('created_at', { ascending: true });

    if (error) throw error;

    return achievements.map(achievementAdapter);
  });
}

// ─── Blog ───────────────────────────────────────────────
export async function getBlogPosts() {
  return withCache('blog_posts', async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, cover_img, published_at, tags')
      .eq('published', true)
      .order('published_at', { ascending: false });

    if (error) throw error;
    return data.map(blogPostAdapter);
  });
}

export async function getBlogPostBySlug(slug) {
  return withCache(`blog_post_${slug}`, async () => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id, title, slug, excerpt, content, cover_img, published_at, tags')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) throw error;
    return blogPostAdapter(data);
  });
}

// ─── Skills (Estrategia de Lista Maestra Prioritaria) ───
export const getSkills = async (from = 0, to = null, tag = null) => {
  // Cambiamos la clave para aplicar el orden prioritario absoluto
  const allSkills = await withCache('skills_master_list', async () => {
    const { data, error } = await supabase
      .from('skills')
      .select('*');

    if (error) throw error;

    // Adaptamos y ORDENAMOS localmente por la prioridad calculada
    return data.map(skillAdapter).sort((a, b) => {
      // Primero por sortPriority (0 para destacados, 1-5 para categorías)
      if (a.sortPriority !== b.sortPriority) {
        return a.sortPriority - b.sortPriority;
      }
      // Segundo por nombre alfabético
      return a.name.localeCompare(b.name);
    });
  });

  // Filtrado local (mucho más rápido que pedir a la DB cada vez)
  let filtered = tag && tag !== 'all'
    ? allSkills.filter(s => s.tag === tag)
    : allSkills;

  // Paginación local inteligente
  let paginatedData;
  if (from === 0 && to !== null) {
    // En la primera carga, incluimos todas las prioritarias 
    // O el tamaño del bloque definido, lo que sea mayor.
    const priorityCount = filtered.filter(s => s.isPriority).length;
    const firstLoadSize = Math.max(priorityCount, to + 1);
    paginatedData = filtered.slice(0, firstLoadSize);
  } else {
    paginatedData = to !== null
      ? filtered.slice(from, to + 1)
      : filtered.slice(from);
  }

  return {
    data: paginatedData,
    count: filtered.length
  };
};

export const getSkillTags = async (skillNames) => {
  // Obtenemos todas las habilidades para buscar sus tags
  const { data: allSkills } = await getSkills(0, 999); 
  const requestedTags = allSkills
    .filter(s => skillNames.includes(s.name))
    .map(s => ({ name: s.name, tag: s.tag }));

  return requestedTags;
};

// ─── Services ───────────────────────────────────────────
export async function getServices() {
  return withCache('services', async () => {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error) throw error;
    return data.map(serviceAdapter);
  });
}
