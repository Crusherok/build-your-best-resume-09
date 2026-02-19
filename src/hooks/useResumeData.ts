import { useState, useEffect, useCallback } from 'react';
import { ResumeData, EMPTY_RESUME, TemplateName } from '@/types/resume';

const STORAGE_KEY = 'resumeBuilderData';
const TEMPLATE_KEY = 'resumeBuilderTemplate';
const COLOR_KEY = 'resumeBuilderColor';

export function useResumeData() {
  const [data, setData] = useState<ResumeData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : EMPTY_RESUME;
    } catch { return EMPTY_RESUME; }
  });

  const [template, setTemplate] = useState<TemplateName>(() => {
    return (localStorage.getItem(TEMPLATE_KEY) as TemplateName) || 'classic';
  });

  const [colorTheme, setColorTheme] = useState<string>(() => {
    return localStorage.getItem(COLOR_KEY) || '168 60% 40%';
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    localStorage.setItem(TEMPLATE_KEY, template);
  }, [template]);

  useEffect(() => {
    localStorage.setItem(COLOR_KEY, colorTheme);
    document.documentElement.style.setProperty('--resume-accent', colorTheme);
  }, [colorTheme]);

  const updatePersonal = useCallback((personal: ResumeData['personal']) => {
    setData(prev => ({ ...prev, personal }));
  }, []);

  const updateSummary = useCallback((summary: string) => {
    setData(prev => ({ ...prev, summary }));
  }, []);

  const updateEducation = useCallback((education: ResumeData['education']) => {
    setData(prev => ({ ...prev, education }));
  }, []);

  const updateExperience = useCallback((experience: ResumeData['experience']) => {
    setData(prev => ({ ...prev, experience }));
  }, []);

  const updateProjects = useCallback((projects: ResumeData['projects']) => {
    setData(prev => ({ ...prev, projects }));
  }, []);

  const updateSkills = useCallback((skills: ResumeData['skills']) => {
    setData(prev => ({ ...prev, skills }));
  }, []);

  const updateLinks = useCallback((links: ResumeData['links']) => {
    setData(prev => ({ ...prev, links }));
  }, []);

  const loadSampleData = useCallback(async () => {
    const { SAMPLE_DATA } = await import('@/types/resume');
    setData(SAMPLE_DATA);
  }, []);

  const resetData = useCallback(() => {
    setData(EMPTY_RESUME);
  }, []);

  return {
    data, template, colorTheme,
    setTemplate, setColorTheme,
    updatePersonal, updateSummary, updateEducation, updateExperience,
    updateProjects, updateSkills, updateLinks,
    loadSampleData, resetData,
  };
}
