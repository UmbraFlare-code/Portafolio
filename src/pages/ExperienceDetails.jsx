import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, Loader2, Briefcase, Building2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import PageLayout from '../layouts/PageLayout';
import { getExperienceBySlug } from '../services/dataService';
import SkillTag from '../components/ui/SkillTag';
import TableOfContents, { HeadingComponent } from '../components/ui/TableOfContents';

const ExperienceDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    experience: null,
    loading: true,
  });

  const { experience, loading } = state;

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        const data = await getExperienceBySlug(slug);
        if (!data) {
          navigate('/');
          return;
        }
        setState({
          experience: data,
          loading: false,
        });
      } catch (err) {
        console.error('Error fetching experience details:', err);
        navigate('/');
      }
    };
    fetchExperience();
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

  if (!experience) return null;

  const content = experience.content || '';

  const extraHeadings = [
    { id: 'skills', text: 'Conocimientos', level: 1 },
    ...(content ? [{ id: 'details', text: 'Detalles', level: 1 }] : []),
  ];

  return (
    <PageLayout title={experience?.role || "Detalle de Experiencia"} wide={true}>
      <div className="lg:flex lg:justify-between lg:gap-12">
        <TableOfContents content={content} extraHeadings={extraHeadings} title="Índice de Experiencia" />

        <div className="lg:w-3/4 flex flex-col gap-12">
          <Link
            to="/"
            className="group flex items-center gap-2 text-negative/40 hover:text-tech-orange transition-colors w-fit"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-bold uppercase tracking-wider">Volver al inicio</span>
          </Link>

          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-tech-orange flex items-center gap-2">
                <Briefcase size={14} />
                Experiencia Profesional
              </span>
              <h1 id="intro" className="text-4xl md:text-5xl font-semibold tracking-tight text-negative leading-tight scroll-mt-32">
                {experience.role}
              </h1>
              <div className="flex items-center gap-3 text-xl text-negative/60 font-medium">
                <Building2 size={20} className="text-tech-orange/60" />
                <span>{experience.company}</span>
              </div>
            </div>

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-negative/40 pb-8 border-b border-negative/5">
              {experience.period && (
                <span className="flex items-center gap-2">
                  <Calendar size={16} className="text-tech-orange" />
                  {experience.period}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-6">
              <h3 id="description" className="text-sm font-bold uppercase tracking-widest text-negative/40 scroll-mt-32">Descripción</h3>
              <p className="text-lg text-negative/70 leading-relaxed italic">
                "{experience.description}"
              </p>
            </div>
          </div>

          {/* Skills Applied */}
          {experience.tags?.length > 0 && (
            <div className="flex flex-col gap-4 pt-8 border-t border-negative/5">
              <h3 id="skills" className="text-sm font-bold uppercase tracking-widest text-negative/40 flex items-center gap-2 scroll-mt-32">
                <Tag size={16} className="text-tech-orange" />
                Conocimientos Aplicados
              </h3>
              <div className="flex flex-wrap gap-2">
                {experience.tags.map((tag) => (
                  <SkillTag key={tag} label={tag} size="md" />
                ))}
              </div>
            </div>
          )}

          {/* Markdown Content (Activities & Achievements) */}
          {content ? (
            <article className="pt-8 border-t border-negative/5">
              <span id="details" className="text-sm font-bold uppercase tracking-widest text-negative/40 mb-8 scroll-mt-32">
                Actividades y Conocimientos Detallados
              </span>
              <div className="prose-portfolio">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    h2: ({ children }) => <HeadingComponent level={2}>{children}</HeadingComponent>,
                    h3: ({ children }) => <HeadingComponent level={3}>{children}</HeadingComponent>,
                    h4: ({ children }) => <HeadingComponent level={4}>{children}</HeadingComponent>,
                    h5: ({ children }) => <HeadingComponent level={5}>{children}</HeadingComponent>,
                    h6: ({ children }) => <HeadingComponent level={6}>{children}</HeadingComponent>,
                  }}
                >
                  {content}
                </ReactMarkdown>
              </div>
            </article>
          ) : (
            <div className="pt-8 border-t border-negative/5 text-negative/30 text-sm italic">
              No hay detalles adicionales registrados para esta experiencia.
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};


export default ExperienceDetails;
