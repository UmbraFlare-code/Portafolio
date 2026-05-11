import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Loader2, ChevronRight, List, X, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageLayout from '../layouts/PageLayout';
import { getBlogPostBySlug } from '../services/dataService';
import SkillTag from '../components/ui/SkillTag';

// Helper to slugify heading text
const slugify = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();
};

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeId, setActiveId] = useState('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const observer = useRef(null);

  // Extract headings for TOC
  const headings = useMemo(() => {
    if (!post?.content) return [];
    const lines = post.content.split('\n');
    const extracted = [];
    lines.forEach(line => {
      const match = line.match(/^(#{1,3})\s+(.+)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        extracted.push({
          id: slugify(text),
          text,
          level
        });
      }
    });
    return extracted;
  }, [post?.content]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await getBlogPostBySlug(slug);
        if (!data) {
          navigate('/blog');
          return;
        }
        setPost(data);
      } catch (err) {
        console.error('Error fetching blog post:', err);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [slug, navigate]);

  // Setup Intersection Observer for active heading
  useEffect(() => {
    if (loading || !headings.length) return;

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    observer.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0% -70% 0%', // Activa cuando el título está en el tercio superior
      threshold: 0.1
    });

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) observer.current.observe(el);
    });

    return () => observer.current?.disconnect();
  }, [loading, headings]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const element = document.documentElement;
      const scrollHeight = element.scrollHeight - element.clientHeight;
      const scrollTop = element.scrollTop;
      const progress = (scrollTop / scrollHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <PageLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 size={32} className="animate-spin text-tech-orange" />
        </div>
      </PageLayout>
    );
  }

  if (!post) return null;

  const content = post.content || '';
  const readingTime = Math.ceil(content.split(/\s+/).length / 200);

  const HeadingComponent = ({ level, children }) => {
    const text = React.Children.toArray(children).join('');
    const id = slugify(text);
    const Tag = `h${level}`;
    return <Tag id={id} className="scroll-mt-32">{children}</Tag>;
  };

  const scrollToHeading = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setIsMobileNavOpen(false);
    }
  };

  return (
    <PageLayout title="Artículo" wide={true}>
      {/* Progress Bar (Global Top) */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-negative/5">
        <div
          className="h-full bg-tech-orange transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="lg:flex lg:justify-between lg:gap-4">

        {/* Desktop TOC (Sidebar - matching MainLayout 2/5) */}
        <aside className="scrollbar-none hidden lg:sticky lg:top-32 lg:flex lg:max-h-[calc(100vh-8rem)] lg:w-2/5 lg:flex-col self-start overflow-y-auto">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-tech-orange">Índice del Artículo</span>
              <nav className="flex flex-col gap-4 border-l border-negative/5 pl-4">
                {headings.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => scrollToHeading(h.id)}
                    className={`text-left text-sm transition-all duration-300 hover:text-tech-orange hover:translate-x-1 ${activeId === h.id
                        ? 'text-tech-orange font-bold translate-x-1'
                        : 'text-negative/30'
                      } ${h.level === 3 ? 'ml-4 text-xs' : ''}`}
                  >
                    {h.text}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </aside>

        {/* Content Area (matching MainLayout 3/4 feel) */}
        <main className="lg:w-3/4 flex flex-col gap-8">
          <Link
            to="/blog"
            className="group flex items-center gap-2 text-negative/40 hover:text-tech-orange transition-colors w-fit"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-wider">Volver al blog</span>
          </Link>

          {post.cover_img && (
            <div className="relative aspect-video rounded-3xl overflow-hidden bg-negative/10">
              <img
                src={post.cover_img}
                alt={post.title}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          <header className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-4 text-xs text-negative/40 font-medium">
              {post.published_at && (
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-tech-orange" />
                  {new Date(post.published_at).toLocaleDateString('es-PE', {
                    year: 'numeric', month: 'long', day: 'numeric'
                  })}
                </span>
              )}
              <span className="flex items-center gap-2">
                <Clock size={14} className="text-tech-orange" />
                {readingTime} min de lectura
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-negative leading-tight">
              {post.title}
            </h1>

            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <SkillTag key={tag} label={tag} size="md" />
                ))}
              </div>
            )}
          </header>

          <article className="prose-portfolio">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ children }) => <HeadingComponent level={1}>{children}</HeadingComponent>,
                h2: ({ children }) => <HeadingComponent level={2}>{children}</HeadingComponent>,
                h3: ({ children }) => <HeadingComponent level={3}>{children}</HeadingComponent>,
              }}
            >
              {content}
            </ReactMarkdown>
          </article>

          <footer className="mt-16 pt-8 border-t border-negative/5">
            <Link
              to="/blog"
              className="flex items-center justify-between p-6 rounded-2xl bg-negative/5 border border-negative/10 hover:border-tech-orange/50 transition-all group lg:hover:bg-negative/10"
            >
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-widest text-negative/30 font-bold">Continuar leyendo</span>
                <span className="font-bold text-negative group-hover:text-tech-orange transition-colors">Explorar otros artículos</span>
              </div>
              <ChevronRight className="text-negative/20 group-hover:text-tech-orange transition-colors" />
            </Link>
          </footer>
        </main>
      </div>

      {/* Mobile Nav Button (Floating) */}
      {headings.length > 0 && (
        <div className="lg:hidden fixed bottom-8 right-6 z-[70]">
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="flex items-center justify-center w-14 h-14 rounded-full bg-tech-orange text-white shadow-lg shadow-tech-orange/30 transition-all hover:scale-110 active:scale-95"
          >
            {isMobileNavOpen ? <X size={24} /> : <List size={24} />}
          </button>

          {/* Mobile Nav Menu Overlay */}
          {isMobileNavOpen && (
            <div className="absolute bottom-16 right-0 w-64 max-h-[60vh] bg-dark-bg/95 backdrop-blur-xl border border-negative/10 rounded-2xl p-6 overflow-y-auto animate-in fade-in slide-in-from-bottom-4 duration-300 shadow-2xl">
              <span className="block text-[10px] uppercase tracking-[0.2em] font-bold text-tech-orange mb-4">Tabla de Contenidos</span>
              <nav className="flex flex-col gap-4">
                {headings.map((h) => (
                  <button
                    key={h.id}
                    onClick={() => scrollToHeading(h.id)}
                    className={`text-left text-sm transition-all duration-300 ${activeId === h.id
                        ? 'text-tech-orange font-bold'
                        : 'text-negative/60'
                      } ${h.level === 3 ? 'ml-4' : ''}`}
                  >
                    {h.text}
                  </button>
                ))}
              </nav>
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
};

export default BlogPost;
