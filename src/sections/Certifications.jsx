import React, { useState, useEffect } from 'react';
import { Award, Trophy, Loader2, X, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { getAchievements, getEntitySkills } from '../services/dataService';
import SkillTag from '../components/ui/SkillTag';
import Button from '../components/ui/Button';

const Logros = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAchievements();
        setAchievements(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching achievements:', err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-12">
      <Loader2 size={24} className="animate-spin text-tech-orange" />
    </div>
  );

  if (achievements.length === 0) return null;

  const awards = achievements.filter(a => a.kind === 'award');
  const certs = achievements.filter(a => a.kind === 'certificados' || a.kind === 'certification' || a.kind === 'certificaciones');
  const cursos = achievements.filter(a => a.kind === 'cursos' || a.kind === 'course');

  return (
    <section id="awards" className="flex flex-col gap-12 scroll-mt-24">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm uppercase tracking-widest text-tech-orange font-bold">Logros y Certificaciones</h3>
        <h2 className="text-[22px] font-bold text-negative">Reconocimientos y Éxitos</h2>
      </div>

      <div className="flex flex-col gap-12">
        {/* Columna Izquierda: Premios (Prioridad 1) y Cursos */}
        <div className="flex flex-col gap-12">
          {/* Premios */}
          {awards.length > 0 && (
            <div className="flex flex-col gap-6">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-negative/60">
                <Trophy size={16} className="text-tech-orange" /> Premios y Reconocimientos
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {awards.map((award) => (
                  <button
                    key={award.id}
                    onClick={() => setSelectedItem(award)}
                    className="p-5 rounded-xl bg-negative/5 border border-negative/10 hover:border-tech-orange/30 transition-all flex items-center gap-4 text-left group w-full"
                  >
                    <div className="flex flex-col gap-1 flex-grow">
                      <h4 className="text-[18px] font-bold text-negative group-hover:text-tech-orange transition-colors">{award.title}</h4>
                      {award.date && <p className="text-[16px] text-negative/60">{award.date}</p>}
                      
                      <div className="mt-2 flex items-center gap-2 text-tech-orange font-bold uppercase tracking-widest group-hover:text-tech-orange/80 transition-colors text-[12px]">
                        <span>Ver descripción completa</span>
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>

                      {award.tags && award.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {award.tags.map(tag => (
                            <SkillTag key={tag} label={tag} size="sm" />
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Cursos */}
          {cursos.length > 0 && (
            <div className="flex flex-col gap-6">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-negative/60">
                <BookOpen size={16} className="text-tech-orange" /> Cursos
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {cursos.map((curso) => (
                  <button
                    key={curso.id}
                    onClick={() => setSelectedItem(curso)}
                    className="p-5 rounded-xl bg-negative/5 border border-negative/10 hover:border-tech-orange/30 transition-all flex items-center gap-4 text-left group w-full"
                  >
                    <div className="p-3 rounded-lg bg-tech-orange/10 text-tech-orange shrink-0">
                      <BookOpen size={20} />
                    </div>
                    <div className="flex flex-col gap-1 flex-grow">
                      <h4 className="text-[18px] font-bold text-negative group-hover:text-tech-orange transition-colors">{curso.title}</h4>
                      {curso.date && <p className="text-[16px] text-negative/60">{curso.date}</p>}
                      
                      <div className="mt-2 flex items-center gap-2 text-tech-orange font-bold uppercase tracking-widest group-hover:text-tech-orange/80 transition-colors text-[12px]">
                        <span>Ver descripción completa</span>
                        <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                      </div>

                      {curso.tags && curso.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {curso.tags.map(tag => (
                            <SkillTag key={tag} label={tag} size="sm" />
                          ))}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Columna Derecha: Certificaciones */}
        <div className="flex flex-col gap-12">
          {certs.length > 0 && (
            <div className="flex flex-col gap-6">
              <h4 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-negative/60">
                <Award size={16} className="text-tech-orange" /> Certificaciones
              </h4>
              <div className="grid grid-cols-1 gap-4">
                {certs.map((cert) => (
                  <button
                    key={cert.id}
                    onClick={() => setSelectedItem(cert)}
                    className="p-5 rounded-xl bg-negative/5 border border-negative/10 hover:border-tech-orange/30 transition-all flex flex-col gap-3 text-left group"
                  >
                    <div className="flex items-start justify-between w-full">
                      <div className="flex flex-col gap-1">
                        <h4 className="text-[18px] font-bold text-negative group-hover:text-tech-orange transition-colors">{cert.title}</h4>
                        {cert.date && <p className="text-[16px] text-negative/60">{cert.date}</p>}
                      </div>
                      <Award size={20} className="text-tech-orange shrink-0" />
                    </div>

                    <div className="mt-2 flex items-center gap-2 text-tech-orange font-bold uppercase tracking-widest group-hover:text-tech-orange/80 transition-colors text-[12px]">
                      <span>Ver detalles</span>
                      <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                    </div>

                    {cert.tags && cert.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-auto pt-2">
                        {cert.tags.map(tag => (
                          <SkillTag key={tag} label={tag} size="sm" />
                        ))}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Detalle */}
      {selectedItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-dark-bg/90 backdrop-blur-sm"
            onClick={() => setSelectedItem(null)}
          />
          <div className="relative w-full max-w-2xl bg-dark-bg border border-negative/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <header className="flex items-center justify-between p-6 border-b border-negative/5">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-tech-orange/10 text-tech-orange">
                  {selectedItem.kind === 'award' ? <Trophy size={20} /> : selectedItem.kind === 'cursos' ? <BookOpen size={20} /> : <Award size={20} />}
                </div>
                <h3 className="text-lg font-bold text-negative">Detalle del Logro</h3>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedItem(null)}
                className="rounded-full p-2"
              >
                <X size={20} />
              </Button>
            </header>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-negative leading-tight">
                    {selectedItem.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-negative/40">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {selectedItem.date || new Date(selectedItem.created_at).getFullYear()}
                    </span>
                  </div>
                </div>

                <hr className="border-negative/5" />

                {/* Validación de carga de Imagen */}
                {(selectedItem.image || selectedItem.img || selectedItem.url) && (
                  <div className="w-full rounded-xl overflow-hidden border border-negative/10 bg-negative/5 relative min-h-[200px]">
                    <img
                      src={selectedItem.image || selectedItem.img || selectedItem.url}
                      alt={`Logro ${selectedItem.title}`}
                      className="w-full h-auto object-cover max-h-[400px]"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = 'none';
                        e.target.parentElement.innerHTML = '<div class="absolute inset-0 flex items-center justify-center text-negative/30 text-sm">Imagen no disponible</div>';
                      }}
                    />
                  </div>
                )}

                <div className="flex flex-col gap-4">
                  <h4 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Anotaciones y Descripción</h4>
                  <div className="text-negative/70 leading-relaxed text-sm space-y-4">
                    {selectedItem.description && selectedItem.description.trim() !== '' ? (
                      <p className="whitespace-pre-wrap">{selectedItem.description}</p>
                    ) : (
                      <p className="italic text-negative/40 bg-negative/5 p-4 rounded-lg border border-negative/10">No hay anotaciones adicionales ni descripción para este logro aún.</p>
                    )}
                  </div>
                </div>

                {selectedItem.tags && selectedItem.tags.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Tecnologías Relacionadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedItem.tags.map(tag => (
                        <SkillTag key={tag} label={tag} size="md" />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Logros;

