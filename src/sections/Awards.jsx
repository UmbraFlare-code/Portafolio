import React, { useState, useEffect } from 'react';
import { Loader2, X, FileText, Calendar, ArrowRight } from 'lucide-react';
import SkillTag from '../components/ui/SkillTag';
import { getAwards } from '../services/dataService';

const Awards = () => {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAward, setSelectedAward] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAwards();
        setAwards(data || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching awards:', err);
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

  if (awards.length === 0) return null;

  return (
    <section id="awards" className="flex flex-col gap-8 scroll-mt-24">
      <div className="flex flex-col gap-4">
        <h3 className="text-sm uppercase tracking-widest text-tech-orange font-bold">Logros y Certificaciones</h3>
        <h2 className="text-[22px] font-bold text-negative">Reconocimientos y Éxitos</h2>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {awards.map((award) => (
          <button
            key={award.id}
            onClick={() => setSelectedAward(award)}
            className="p-5 rounded-xl bg-negative/5 border border-negative/10 hover:border-tech-orange/30 transition-all flex items-center gap-4 text-left group w-full"
          >
            <div className="flex flex-col gap-1 flex-grow">
              <h4 className="text-[18px] font-bold text-negative group-hover:text-tech-orange transition-colors">{award.title}</h4>
              <p className="text-[16px] text-negative/60">{award.organization} · {award.date || award.year || new Date(award.created_at).getFullYear()}</p>
              
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

      {/* Modal de Detalle para Premios */}
      {selectedAward && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div
            className="absolute inset-0 bg-dark-bg/90 backdrop-blur-sm"
            onClick={() => setSelectedAward(null)}
          />
          <div className="relative w-full max-w-2xl bg-dark-bg border border-negative/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <header className="flex items-center justify-between p-6 border-b border-negative/5">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-bold text-negative">Detalle del Reconocimiento</h3>
              </div>
              <button
                onClick={() => setSelectedAward(null)}
                className="p-2 hover:bg-negative/5 rounded-full transition-colors text-negative/40 hover:text-negative"
              >
                <X size={20} />
              </button>
            </header>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-2xl font-bold text-negative leading-tight">
                    {selectedAward.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-negative/40">
                    <span className="flex items-center gap-1">
                      <FileText size={14} /> {selectedAward.organization}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {selectedAward.date || selectedAward.year || new Date(selectedAward.created_at).getFullYear()}
                    </span>
                  </div>
                </div>

                <hr className="border-negative/5" />

                {/* Validación de carga de Imagen */}
                {(selectedAward.img || selectedAward.image || selectedAward.url) && (
                  <div className="w-full rounded-xl overflow-hidden border border-negative/10 bg-negative/5 relative min-h-[200px]">
                    <img
                      src={selectedAward.img || selectedAward.image || selectedAward.url}
                      alt={`Premio ${selectedAward.title}`}
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
                    {selectedAward.description && selectedAward.description.trim() !== '' ? (
                      <p className="whitespace-pre-wrap">{selectedAward.description}</p>
                    ) : (
                      <p className="italic text-negative/40 bg-negative/5 p-4 rounded-lg border border-negative/10">No hay anotaciones adicionales ni descripción para este reconocimiento aún.</p>
                    )}
                  </div>
                </div>

                {selectedAward.tags && selectedAward.tags.length > 0 && (
                  <div className="flex flex-col gap-3">
                    <h4 className="text-xs uppercase tracking-widest text-tech-orange font-bold">Tecnologías Relacionadas</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedAward.tags.map(tag => (
                        <SkillTag key={tag} label={tag} size="sm" />
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

export default Awards;
