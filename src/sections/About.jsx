import React, { useState, useEffect } from 'react';
import {
  Code2,
  Cpu,
  Layers,
  Terminal,
  GitBranch,
  PenTool,
  Mail,
  Smartphone,
  ChevronRight,
  Cloud,
  Loader2,
  Users,
  Lightbulb,
  MessageCircle,
  RefreshCw,
  Brain,
  Clock
} from 'lucide-react';
import { getSkills, getSkillTags, getExperiences, getProjects, getAchievements, getAboutInfo } from '../services/dataService';
import { CATEGORY_LABELS } from '../services/adapters';
import Button from '../components/ui/Button';
import Tag from '../components/ui/Tag';
import { Trophy, Award, Briefcase, Rocket } from 'lucide-react';

const About = () => {
  const { description } = getAboutInfo();
  const [hardSkills, setHardSkills] = useState([]);
  const [softSkills, setSoftSkills] = useState([]);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [totalSkills, setTotalSkills] = useState(0);
  const [currentFrom, setCurrentFrom] = useState(0);
  const [activeFilter, setActiveFilter] = useState('all');
  const [skillTagsMapping, setSkillTagsMapping] = useState({});
  const blockSize = 9;

  const [dynamicStats, setDynamicStats] = useState({
    years: 0,
    projects: 0,
    certs: 0
  });

  const calculateExperience = (experiences) => {
    if (!experiences || experiences.length === 0) return 1;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth(); // 0-11

    const yearRegex = /\b(20\d{2})\b/g;
    const monthMap = {
      'ene': 0, 'jan': 0, 'feb': 1, 'mar': 2, 'abr': 3, 'apr': 3, 'may': 4,
      'jun': 5, 'jul': 6, 'ago': 7, 'aug': 7, 'sep': 8, 'oct': 9, 'nov': 10, 'dic': 11, 'dec': 11,
      '01': 0, '02': 1, '03': 2, '04': 3, '05': 4, '06': 5, '07': 6, '08': 7, '09': 8, '10': 9, '11': 10, '12': 11,
      '1': 0, '2': 1, '3': 2, '4': 3, '5': 4, '6': 5, '7': 6, '8': 7, '9': 8
    };

    let earliestDate = new Date(currentYear, currentMonth);

    experiences.forEach(exp => {
      const period = exp.period?.toLowerCase() || '';
      const yearMatches = period.match(yearRegex);

      if (yearMatches) {
        yearMatches.forEach(yStr => {
          const year = parseInt(yStr);
          let month = 0; // Default to start of year

          // Try to find a month name before the year
          const words = period.split(/[\s\/-]+/);
          const yearIdx = words.indexOf(yStr);
          if (yearIdx > 0) {
            const prevWord = words[yearIdx - 1];
            if (monthMap[prevWord]) month = monthMap[prevWord];
          }

          const date = new Date(year, month);
          if (date < earliestDate) earliestDate = date;
        });
      }
    });

    const diffInMonths = (currentYear - earliestDate.getFullYear()) * 12 + (currentMonth - earliestDate.getMonth());
    const totalYears = diffInMonths / 12;

    // Return with 1 decimal if it's not a whole number, otherwise just the integer
    return totalYears > 0 ? parseFloat(totalYears.toFixed(1)) : 1;
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [exps, projs, achs] = await Promise.all([
          getExperiences(),
          getProjects(),
          getAchievements()
        ]);

        setDynamicStats({
          years: calculateExperience(exps),
          projects: projs.length,
          certs: achs.filter(a => a.kind !== 'award').length
        });
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };
    fetchStats();
  }, []);

  const descText = description?.es || description;

  const fetchSkillsBlock = async (from, filterTag = activeFilter, reset = false) => {
    try {
      if (reset) {
        setLoadingSkills(true);
        setSkillTagsMapping({});
      }
      const to = from + blockSize - 1;
      const { data, count } = await getSkills(from, to, filterTag);

      if (data) {
        const hSkills = data.filter(s => s.type === 'hard');
        const sSkills = data.filter(s => s.type === 'soft');

        // Initial set of skills
        setHardSkills(prev => {
          const base = reset ? [] : prev;
          const combined = [...base, ...hSkills];
          // Remove duplicates by name
          const unique = Array.from(new Map(combined.map(s => [s.name, s])).values());
          return unique;
        });
        // Only reset/update soft skills if we are in 'all' view or if they haven't been loaded yet
        setSoftSkills(prev => {
          if (filterTag !== 'all' && prev.length > 0) return prev;
          const base = (reset && filterTag === 'all') ? [] : prev;
          const combined = [...base, ...sSkills];
          const unique = Array.from(new Map(combined.map(s => [s.name, s])).values());
          return unique;
        });
        setTotalSkills(count || 0);
        setLoadingSkills(false);

        // Fetch tags progressively only if filter is 'all'
        if (hSkills.length > 0) {
          if (filterTag !== 'all') {
            // Already handled by adapter in getSkills
            setHardSkills(prev => [...prev].sort((a, b) => a.sortPriority - b.sortPriority));
          } else {
            const skillNames = hSkills.map(s => s.name);
            const tagsData = await getSkillTags(skillNames);

            setSkillTagsMapping(prev => {
              const newMapping = { ...prev };
              tagsData.forEach(t => { newMapping[t.name] = t.tag; });
              return newMapping;
            });

            // Re-sort with tags from DB
            setHardSkills(prev => {
              return [...prev].map(skill => {
                const dbTag = tagsData.find(t => t.name === skill.name)?.tag;
                if (dbTag) {
                  return {
                    ...skill,
                    tag: dbTag,
                    categoryLabel: CATEGORY_LABELS[dbTag] || 'Otro'
                  };
                }
                return skill;
              }).sort((a, b) => a.sortPriority - b.sortPriority);
            });
          }
        }
      }
      setCurrentFrom(from + (data?.length || 0));
    } catch (err) {
      console.error('Error fetching skills:', err);
      setLoadingSkills(false);
    }
  };

  useEffect(() => {
    fetchSkillsBlock(0, 'all', true);
  }, []);

  const handleFilterChange = (newFilter) => {
    setActiveFilter(newFilter);
    setCurrentFrom(0);
    fetchSkillsBlock(0, newFilter, true);
  };

  const hasMore = hardSkills.length + softSkills.length < totalSkills;
  const remaining = totalSkills - (hardSkills.length + softSkills.length);

  return (
    <section id="about" className="flex flex-col gap-24 scroll-mt-24">

      {/* About Section */}
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <h3 className="text-sm uppercase tracking-widest text-tech-orange font-bold">Sobre mí</h3>
          <h2 className="text-[22px] font-bold text-negative">Trayectoria y Enfoque</h2>
        </div>
        <div className="flex flex-col gap-6 text-negative/70 leading-relaxed text-[18px]">
          <p>{descText}</p>
        </div>

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
          {loadingSkills ? (
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

        {/* Improved Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <a href="#experience" className="group p-5 rounded-2xl bg-tech-orange/5 border border-tech-orange/10 hover:border-tech-orange/30 transition-all hover:bg-tech-orange/[0.08] cursor-pointer">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 rounded-lg bg-tech-orange/10 w-fit group-hover:scale-110 transition-transform">
                <Briefcase size={20} className="text-tech-orange" />
              </div>
              <span className="text-3xl font-extrabold text-tech-orange tabular-nums">{dynamicStats.years}+</span>
            </div>
            <span className="block text-[14px] uppercase tracking-widest font-bold text-negative/60">Años de formación</span>
            <span className="text-[12px] text-tech-orange font-semibold mt-2 flex items-center gap-1 group-hover:text-tech-orange/80 transition-colors">
              Ver experiencia <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a href="#proyects" className="group p-5 rounded-2xl bg-tech-orange/5 border border-tech-orange/10 hover:border-tech-orange/30 transition-all hover:bg-tech-orange/[0.08] cursor-pointer">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 rounded-lg bg-tech-orange/10 w-fit group-hover:scale-110 transition-transform">
                <Rocket size={20} className="text-tech-orange" />
              </div>
              <span className="text-3xl font-extrabold text-tech-orange tabular-nums">{dynamicStats.projects}</span>
            </div>
            <span className="block text-[14px] uppercase tracking-widest font-bold text-negative/60">Proyectos desarrollados</span>
            <span className="text-[12px] text-tech-orange font-semibold mt-2 flex items-center gap-1 group-hover:text-tech-orange/80 transition-colors">
              Ver proyectos <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>

          <a href="#awards" className="group p-5 rounded-2xl bg-tech-orange/5 border border-tech-orange/10 hover:border-tech-orange/30 transition-all hover:bg-tech-orange/[0.08] cursor-pointer">
            <div className="flex items-center gap-4 mb-3">
              <div className="p-2 rounded-lg bg-tech-orange/10 w-fit group-hover:scale-110 transition-transform">
                <Award size={20} className="text-tech-orange" />
              </div>
              <span className="text-3xl font-extrabold text-tech-orange tabular-nums">{dynamicStats.certs}</span>
            </div>
            <span className="block text-[14px] uppercase tracking-widest font-bold text-negative/60">Certificaciones</span>
            <span className="text-[12px] text-tech-orange font-semibold mt-2 flex items-center gap-1 group-hover:text-tech-orange/80 transition-colors">
              Ver logros <ChevronRight size={12} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </a>
        </div>
      </div>

    </section>
  );
};

export default About;
