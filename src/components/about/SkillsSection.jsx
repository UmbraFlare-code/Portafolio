import React from 'react';
import { Code2, Users, Loader2, RefreshCw } from 'lucide-react';
import Button from '../ui/Button';
import Tag from '../ui/Tag';

const SkillsSection = ({
  hardSkills,
  softSkills,
  loadingSkills,
  activeFilter,
  skillTagsMapping,
  handleFilterChange,
  fetchSkillsBlock,
  currentFrom,
  hasMore,
  remaining
}) => (
  <div className="flex flex-col gap-12">
    {/* Hard Skills */}
    <div className="flex flex-col gap-4">
      <h4 className="text-sm uppercase tracking-widest text-negative/40 font-bold flex items-center gap-2">
        <Code2 size={16} className="text-tech-orange" />
        Habilidades Técnicas
      </h4>

      {/* Filter Bar */}
      <div className="flex flex-wrap gap-2 mb-2">
        {['all', 'frontend', 'backend', 'database', 'cloud'].map((f) => (
          <Button
            key={f}
            variant={activeFilter === f ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => handleFilterChange(f)}
            className="rounded-full flex-shrink-0"
          >
            {f === 'all' ? 'Todas' : f === 'frontend' ? 'Front' : f === 'backend' ? 'Back' : f === 'database' ? 'DB' : 'Cloud'}
          </Button>
        ))}
      </div>

      {loadingSkills && currentFrom === 0 ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={24} className="animate-spin text-tech-orange" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {hardSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center justify-between p-3 rounded-lg bg-negative/5 border border-negative/10 hover:border-tech-orange/50 transition-all group"
            >
              <div className="flex items-center gap-3">
                <span className="text-tech-orange group-hover:drop-shadow-[0_0_8px_rgba(255,95,31,0.5)] transition-all font-mono text-xl">
                  {skill.icon}
                </span>
                <span className="text-sm font-medium">{skill.name}</span>
              </div>
              {skillTagsMapping[skill.name] || activeFilter !== 'all' ? (
                <Tag variant="primary" className="text-[9px] animate-in fade-in duration-500">
                  {skill.categoryLabel}
                </Tag>
              ) : (
                <div className="w-10 h-4 rounded bg-negative/5 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      )}

      {hasMore && !loadingSkills && (
        <Button
          variant="outline"
          onClick={() => fetchSkillsBlock(currentFrom)}
          className="mt-4 mx-auto sm:mx-0"
        >
          <RefreshCw size={14} />
          Ver más ({remaining} restantes)
        </Button>
      )}
    </div>

    {/* Soft Skills */}
    <div className="flex flex-col gap-4">
      <h4 className="text-sm uppercase tracking-widest text-negative/40 font-bold flex items-center gap-2">
        <Users size={16} className="text-tech-orange" />
        Habilidades Blandas
      </h4>
      {loadingSkills && softSkills.length === 0 ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={24} className="animate-spin text-tech-orange" />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {softSkills.map((skill) => (
            <div
              key={skill.name}
              className="flex items-center gap-3 p-3 rounded-lg bg-tech-orange/5 border border-tech-orange/10 hover:border-tech-orange/30 transition-all group"
            >
              <span className="text-tech-orange/70 group-hover:text-tech-orange transition-all font-mono text-xl">
                {skill.icon}
              </span>
              <span className="text-sm font-medium text-negative/80">{skill.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

export default SkillsSection;
