import React, { useState, useEffect } from 'react';
import { getSkills, getSkillTags, getExperiences, getProjects, getAchievements, getAboutInfo } from '../services/dataService';
import { CATEGORY_LABELS } from '../services/adapters';
import AboutDescription from '../components/about/AboutDescription';
import SkillsSection from '../components/about/SkillsSection';
import StatsGrid from '../components/about/StatsGrid';

const About = () => {
  const { description } = getAboutInfo();
  const [state, setState] = useState({
    hardSkills: [],
    softSkills: [],
    loadingSkills: true,
    totalSkills: 0,
    currentFrom: 0,
    activeFilter: 'all',
    skillTagsMapping: {},
    dynamicStats: {
      years: 0,
      projects: 0,
      certs: 0
    }
  });

  const {
    hardSkills,
    softSkills,
    loadingSkills,
    totalSkills,
    currentFrom,
    activeFilter,
    skillTagsMapping,
    dynamicStats
  } = state;

  const setHardSkills = (hardSkills) => setState(prev => ({ ...prev, hardSkills: typeof hardSkills === 'function' ? hardSkills(prev.hardSkills) : hardSkills }));
  const setSoftSkills = (softSkills) => setState(prev => ({ ...prev, softSkills: typeof softSkills === 'function' ? softSkills(prev.softSkills) : softSkills }));
  const setLoadingSkills = (loadingSkills) => setState(prev => ({ ...prev, loadingSkills }));
  const setTotalSkills = (totalSkills) => setState(prev => ({ ...prev, totalSkills }));
  const setCurrentFrom = (currentFrom) => setState(prev => ({ ...prev, currentFrom }));
  const setActiveFilter = (activeFilter) => setState(prev => ({ ...prev, activeFilter }));
  const setSkillTagsMapping = (skillTagsMapping) => setState(prev => ({ ...prev, skillTagsMapping: typeof skillTagsMapping === 'function' ? skillTagsMapping(prev.skillTagsMapping) : skillTagsMapping }));
  const setDynamicStats = (dynamicStats) => setState(prev => ({ ...prev, dynamicStats }));
  const blockSize = 9;

  const calculateExperience = (experiences) => {
    if (!experiences || experiences.length === 0) return 1;

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

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
          let month = 0;

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

        setHardSkills(prev => {
          const base = reset ? [] : prev;
          const combined = [...base, ...hSkills];
          const unique = Array.from(new Map(combined.map(s => [s.name, s])).values());
          return unique;
        });

        setSoftSkills(prev => {
          if (filterTag !== 'all' && prev.length > 0) return prev;
          const base = (reset && filterTag === 'all') ? [] : prev;
          const combined = [...base, ...sSkills];
          const unique = Array.from(new Map(combined.map(s => [s.name, s])).values());
          return unique;
        });
        setTotalSkills(count || 0);
        setLoadingSkills(false);

        if (hSkills.length > 0) {
          if (filterTag !== 'all') {
            setHardSkills(prev => prev.toSorted((a, b) => a.sortPriority - b.sortPriority));
          } else {
            const skillNames = hSkills.map(s => s.name);
            const tagsData = await getSkillTags(skillNames);

            setSkillTagsMapping(prev => {
              const newMapping = { ...prev };
              tagsData.forEach(t => { newMapping[t.name] = t.tag; });
              return newMapping;
            });

            setHardSkills(prev => {
              return prev.map(skill => {
                const dbTag = tagsData.find(t => t.name === skill.name)?.tag;
                if (dbTag) {
                  return {
                    ...skill,
                    tag: dbTag,
                    categoryLabel: CATEGORY_LABELS[dbTag] || 'Otro'
                  };
                }
                return skill;
              }).toSorted((a, b) => a.sortPriority - b.sortPriority);
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
      <div className="flex flex-col gap-8">
        <AboutDescription descText={descText} />

        <StatsGrid dynamicStats={dynamicStats} />

        <SkillsSection
          hardSkills={hardSkills}
          softSkills={softSkills}
          loadingSkills={loadingSkills}
          activeFilter={activeFilter}
          skillTagsMapping={skillTagsMapping}
          handleFilterChange={handleFilterChange}
          fetchSkillsBlock={fetchSkillsBlock}
          currentFrom={currentFrom}
          hasMore={hasMore}
          remaining={remaining}
        />
      </div>
    </section>
  );
};

export default About;
