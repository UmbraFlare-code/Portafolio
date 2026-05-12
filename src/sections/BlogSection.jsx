import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight, Loader2 } from 'lucide-react';
import { getBlogPosts } from '../services/dataService';

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPosts(data.slice(0, 2)); // Solo los 2 más recientes en el home
      } catch (err) {
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return null;
  if (posts.length === 0) return null;

  return (
    <section id="blog" className="flex flex-col gap-8 scroll-mt-24">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm uppercase tracking-widest text-tech-orange font-bold">Artículos Recientes</h3>
          <Link 
            to="/blog" 
            className="text-sm font-bold uppercase tracking-widest text-negative/60 hover:text-tech-orange transition-colors flex items-center gap-2 group"
          >
            Ver todo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        <h2 className="text-[22px] font-bold text-negative">Blog y Pensamientos</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {posts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group relative flex flex-col gap-2 p-5 rounded-xl transition-all lg:hover:bg-negative/5"
          >
            <div className="flex items-center gap-2 text-sm text-negative/40">
              <Calendar size={14} />
              {new Date(post.published_at).toLocaleDateString('es-PE', {
                year: 'numeric', month: 'short', day: 'numeric'
              })}
            </div>
            <h4 className="text-[18px] font-bold text-negative group-hover:text-tech-orange transition-colors">
              {post.title}
            </h4>
            <p className="text-[16px] text-negative/60 line-clamp-2">
              {post.excerpt}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BlogSection;
