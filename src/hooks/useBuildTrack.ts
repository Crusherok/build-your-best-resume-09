import { useState, useEffect, useCallback } from 'react';
import { BuildTrackData, EMPTY_BUILD_TRACK, BUILD_STEPS } from '@/types/resume';

const STORAGE_KEY = 'rb_build_track';

export function useBuildTrack() {
  const [data, setData] = useState<BuildTrackData>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : EMPTY_BUILD_TRACK;
    } catch { return EMPTY_BUILD_TRACK; }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const setStepArtifact = useCallback((slug: string, artifact: string) => {
    setData(prev => ({
      ...prev,
      steps: { ...prev.steps, [slug]: { ...prev.steps[slug], artifact } },
    }));
  }, []);

  const toggleStepComplete = useCallback((slug: string) => {
    setData(prev => ({
      ...prev,
      steps: { ...prev.steps, [slug]: { ...prev.steps[slug], completed: !prev.steps[slug]?.completed } },
    }));
  }, []);

  const updateSubmission = useCallback((field: string, value: string) => {
    setData(prev => ({
      ...prev,
      submission: { ...prev.submission, [field]: value },
    }));
  }, []);

  const toggleChecklist = useCallback((index: number) => {
    setData(prev => {
      const checklist = [...prev.checklist];
      checklist[index] = !checklist[index];
      return { ...prev, checklist };
    });
  }, []);

  const canProceed = useCallback((stepSlug: string) => {
    const step = data.steps[stepSlug];
    return step?.completed && step?.artifact?.trim().length > 0;
  }, [data]);

  const currentStepIndex = BUILD_STEPS.findIndex(s => !data.steps[s.slug]?.completed);
  const isShipped = BUILD_STEPS.every(s => data.steps[s.slug]?.completed)
    && data.checklist.every(Boolean)
    && data.submission.lovableLink.trim() !== ''
    && data.submission.githubLink.trim() !== ''
    && data.submission.deployLink.trim() !== '';

  return {
    data, setStepArtifact, toggleStepComplete, updateSubmission,
    toggleChecklist, canProceed, currentStepIndex, isShipped,
  };
}
