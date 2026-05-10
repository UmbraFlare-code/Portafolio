import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Loader2, Folder } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageLayout from '../layouts/PageLayout';
import { getProjectBySlug, getEntitySkills } from '../services/dataService';
import SkillTag from '../components/ui/SkillTag';

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectBySlug(slug);
        if (!data) {
          navigate('/');
          return;
        }
        setProject(data);

        // Load skills progressively
        const skillTags = await getEntitySkills('project_skills', 'project_id', data.id);
        if (skillTags.length > 0) setTags(skillTags);
      } catch (err) {
        console.error('Error fetching project details:', err);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
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

  if (!project) return null;

  const content = project.content || '';
  const readingTime = content ? Math.ceil(content.split(/\s+/).length / 200) : 0;

  return (
    <PageLayout title="Detalle del Proyecto">
      <div className="flex flex-col gap-12 max-w-4xl mx-auto">
        <Link
          to="/"
          className="group flex items-center gap-2 text-negative/40 hover:text-tech-orange transition-colors w-fit"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold uppercase tracking-wider">Volver al inicio</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image/Preview */}
          <div className="relative aspect-video rounded-3xl overflow-hidden bg-negative/5 border border-negative/10">
            {project.img ? (
              <img
                src={project.img}
                alt={project.name}
                className="object-cover w-full h-full"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = 'none';
                }}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-negative/10">
                <Folder size={80} />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-tech-orange">
                {project.categoryLabel || 'Proyecto'}
              </span>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-negative leading-tight">
                {project.name}
              </h1>
            </div>

            <p className="text-lg text-negative/70 leading-relaxed">
              {project.description}
            </p>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-negative/40">
              {project.period && (
                <span className="flex items-center gap-2">
                  <Calendar size={14} className="text-tech-orange" />
                  {project.period}
                </span>
              )}
              {project.status && (
                <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-negative/5 border border-negative/10 font-bold uppercase tracking-wider">
                  {project.status}
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-4 pt-4 border-t border-negative/5">
              {project.url && (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-tech-orange text-white font-bold text-sm uppercase tracking-wider hover:bg-tech-orange/90 transition-all hover:shadow-[0_0_30px_rgba(255,95,31,0.3)]"
                >
                  {project.url.includes('github.com') ? <Github size={18} /> : <ExternalLink size={18} />}
                  {project.url.includes('github.com') ? 'Ver código' : 'Ver en Vivo'}
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Skills / Technologies */}
        {tags.length > 0 && (
          <div className="flex flex-col gap-4 pt-8 border-t border-negative/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-negative/40 flex items-center gap-2">
              <Tag size={16} className="text-tech-orange" />
              Tecnologías
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <SkillTag key={tag} label={tag} size="md" />
              ))}
            </div>
          </div>
        )}

        {/* Markdown Content */}
        {content && (
          <article className="pt-8 border-t border-negative/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-negative/40 mb-8">
              Detalle técnico
            </h3>
            <div className="prose-portfolio">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            </div>
          </article>
        )}

        {/* Technical Details (legacy field) */}
        {project.technical_details && !content && (
          <div className="pt-8 border-t border-negative/5">
            <h3 className="text-sm font-bold uppercase tracking-widest text-negative/40 mb-4 flex items-center gap-2">
              Detalles Técnicos
            </h3>
            <div className="prose-portfolio">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.technical_details}</ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default ProjectDetails;
