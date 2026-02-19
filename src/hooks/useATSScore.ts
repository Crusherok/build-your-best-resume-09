import { useMemo } from 'react';
import { ResumeData, ACTION_VERBS } from '@/types/resume';

export interface ATSResult {
  score: number;
  label: string;
  color: string;
  suggestions: string[];
}

export function useATSScore(data: ResumeData): ATSResult {
  return useMemo(() => {
    let score = 0;
    const suggestions: string[] = [];

    // +10 name
    if (data.personal.name.trim()) score += 10;
    else suggestions.push('Add your full name (+10 points)');

    // +10 email
    if (data.personal.email.trim()) score += 10;
    else suggestions.push('Add your email address (+10 points)');

    // +5 phone
    if (data.personal.phone.trim()) score += 5;
    else suggestions.push('Add your phone number (+5 points)');

    // +5 linkedin
    if (data.links.linkedin.trim()) score += 5;
    else suggestions.push('Add your LinkedIn profile (+5 points)');

    // +5 github
    if (data.links.github.trim()) score += 5;
    else suggestions.push('Add your GitHub profile (+5 points)');

    // +10 summary > 50 chars
    if (data.summary.trim().length > 50) score += 10;
    else suggestions.push('Write a professional summary (50+ characters, +10 points)');

    // +10 summary contains action verbs
    const summaryLower = data.summary.toLowerCase();
    if (ACTION_VERBS.some(v => summaryLower.includes(v))) score += 10;
    else if (data.summary.trim()) suggestions.push('Use action verbs in your summary (+10 points)');

    // +15 summary 40-120 words
    const wordCount = data.summary.trim().split(/\s+/).filter(Boolean).length;
    if (wordCount >= 40 && wordCount <= 120) score += 15;
    else if (wordCount > 0 && wordCount < 40) suggestions.push('Expand your summary to 40-120 words (+15 points)');

    // +15 at least 1 experience with bullets
    if (data.experience.length > 0 && data.experience.some(e => e.bullets.some(b => b.trim()))) score += 15;
    else suggestions.push('Add at least 1 experience entry with bullet points (+15 points)');

    // +10 education complete
    if (data.education.length > 0 && data.education.some(e => e.school && e.degree)) score += 10;
    else suggestions.push('Add your education details (+10 points)');

    // +10 at least 5 skills
    const totalSkills = data.skills.technical.length + data.skills.soft.length + data.skills.tools.length;
    if (totalSkills >= 5) score += 10;
    else suggestions.push(`Add more skills (${totalSkills}/5 minimum, +10 points)`);

    // +10 at least 1 project
    if (data.projects.length > 0) score += 10;
    else suggestions.push('Add at least 1 project (+10 points)');

    // +10 at least 2 projects
    if (data.projects.length >= 2) score += 10;
    else if (data.projects.length === 1) suggestions.push('Add another project (+10 points)');

    // +10 skills >= 8
    if (totalSkills >= 8) score += 10;
    else if (totalSkills >= 5) suggestions.push(`Add more skills (${totalSkills}/8 target, +10 points)`);

    // +10 experience/project bullets contain numbers
    const hasNumbers = [...data.experience.flatMap(e => e.bullets), ...data.projects.map(p => p.description)]
      .some(text => /\d+[%kKxX]?|\d/.test(text));
    if (hasNumbers) score += 10;
    else suggestions.push('Add measurable impact (numbers, percentages) in bullets (+10 points)');

    // +5 github or linkedin link exists (bonus on top)
    if (data.links.github.trim() || data.links.linkedin.trim()) score += 5;

    score = Math.min(score, 100);

    let label: string;
    let color: string;
    if (score <= 40) { label = 'Needs Work'; color = 'hsl(0, 65%, 51%)'; }
    else if (score <= 70) { label = 'Getting There'; color = 'hsl(40, 90%, 50%)'; }
    else { label = 'Strong Resume'; color = 'hsl(160, 60%, 42%)'; }

    return { score, label, color, suggestions: suggestions.slice(0, 5) };
  }, [data]);
}
