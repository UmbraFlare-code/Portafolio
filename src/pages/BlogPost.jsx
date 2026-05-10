import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Loader2, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageLayout from '../layouts/PageLayout';
import { getBlogPostBySlug } from '../services/dataService';
import SkillTag from '../components/ui/SkillTag';

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <PageLayout title="Artículo">
      <div className="flex flex-col gap-8 max-w-3xl mx-auto">
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
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
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
      </div>
    </PageLayout>
  );
};

export default BlogPost;
