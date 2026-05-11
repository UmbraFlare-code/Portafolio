import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Loader2, FileText } from 'lucide-react';
import SkillTag from '../components/ui/SkillTag';
import PageLayout from '../layouts/PageLayout';
import { getBlogPosts } from '../services/dataService';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const allTags = [...new Set(posts.flatMap(p => p.tags || []))];

  const filteredPosts = selectedTag
    ? posts.filter(p => p.tags?.includes(selectedTag))
    : posts;

  if (loading) {
    return (
      <PageLayout title="Blog">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 size={32} className="animate-spin text-tech-orange" />
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout title="Blog">
      <div className="flex flex-col gap-12">
        <header className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-negative">
            Blog
          </h1>
          <p className="text-lg text-negative/60 max-w-xl leading-relaxed">
            Ideas, aprendizajes y tutoriales sobre desarrollo, diseño y tecnología.
          </p>
        </header>

        {allTags.length > 0 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <SkillTag
              label="Todos"
              size="md"
              active={!selectedTag}
              onClick={() => setSelectedTag(null)}
            />
            {allTags.map((tag) => (
              <SkillTag
                key={tag}
                label={tag}
                size="md"
                active={selectedTag === tag}
                onClick={() => setSelectedTag(tag)}
              />
            ))}
          </div>
        )}

        {filteredPosts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 gap-6 text-negative/30">
            <FileText size={64} />
            <p className="text-lg font-medium">No hay artículos publicados aún</p>
            <p className="text-sm">Pronto estaré compartiendo contenido aquí ✍️</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group flex flex-col gap-4 p-6 rounded-2xl bg-negative/5 border border-negative/10 transition-all duration-500 hover:bg-negative/[0.07] hover:border-tech-orange/30 hover:shadow-[0_0_30px_rgba(255,95,31,0.1)]"
              >
                {post.cover_img && (
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-negative/10">
                    <img
                      src={post.cover_img}
                      alt={post.title}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-3">
                  {post.published_at && (
                    <span className="flex items-center gap-2 text-xs text-negative/40">
                      <Calendar size={12} />
                      {new Date(post.published_at).toLocaleDateString('es-PE', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}
                    </span>
                  )}

                  <h2 className="text-xl font-bold text-negative group-hover:text-tech-orange transition-colors">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="text-sm text-negative/60 leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  {post.tags && post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <SkillTag key={tag} label={tag} size="sm" />
                      ))}
                    </div>
                  )}

                  <span className="flex items-center gap-2 text-sm font-bold text-tech-orange mt-2 group-hover:gap-3 transition-all">
                    Leer más <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Blog;
