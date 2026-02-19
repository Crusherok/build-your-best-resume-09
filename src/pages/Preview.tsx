import TopNav from '@/components/layout/TopNav';
import ResumePreview from '@/components/resume/ResumePreview';
import TemplatePicker from '@/components/resume/TemplatePicker';
import ATSScoreDisplay from '@/components/resume/ATSScoreDisplay';
import { useResumeData } from '@/hooks/useResumeData';
import { useATSScore } from '@/hooks/useATSScore';
import { Button } from '@/components/ui/button';
import { Printer, Copy, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function Preview() {
  const resume = useResumeData();
  const ats = useATSScore(resume.data);
  const { toast } = useToast();

  const hasMinimum = resume.data.personal.name.trim() && (resume.data.projects.length > 0 || resume.data.experience.length > 0);

  const handlePrint = () => {
    if (!hasMinimum) {
      toast({ title: 'Incomplete Resume', description: 'Your resume may look incomplete. Consider adding a name and at least one project or experience.', variant: 'destructive' });
    }
    window.print();
  };

  const handleCopyText = () => {
    if (!hasMinimum) {
      toast({ title: 'Incomplete Resume', description: 'Your resume may look incomplete.', variant: 'destructive' });
    }
    const d = resume.data;
    const lines: string[] = [];
    if (d.personal.name) lines.push(d.personal.name);
    const contact = [d.personal.email, d.personal.phone, d.personal.location].filter(Boolean).join(' | ');
    if (contact) lines.push(contact);
    if (d.summary) { lines.push('', 'SUMMARY', d.summary); }
    if (d.education.length) { lines.push('', 'EDUCATION'); d.education.forEach(e => lines.push(`${e.school} — ${e.degree} in ${e.field} (${e.startDate}–${e.endDate})`)); }
    if (d.experience.length) { lines.push('', 'EXPERIENCE'); d.experience.forEach(e => { lines.push(`${e.title} at ${e.company} (${e.startDate}–${e.endDate})`); e.bullets.filter(b => b.trim()).forEach(b => lines.push(`  • ${b}`)); }); }
    if (d.projects.length) { lines.push('', 'PROJECTS'); d.projects.forEach(p => { lines.push(p.title); if (p.description) lines.push(`  ${p.description}`); }); }
    const allSkills = [...d.skills.technical, ...d.skills.soft, ...d.skills.tools];
    if (allSkills.length) { lines.push('', 'SKILLS', allSkills.join(', ')); }
    if (d.links.github || d.links.linkedin) { lines.push('', 'LINKS'); if (d.links.github) lines.push(`GitHub: ${d.links.github}`); if (d.links.linkedin) lines.push(`LinkedIn: ${d.links.linkedin}`); }
    navigator.clipboard.writeText(lines.join('\n'));
    toast({ title: 'Copied!', description: 'Resume text copied to clipboard.' });
  };

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <div className="no-print mx-auto max-w-4xl px-4 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Resume Preview</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint} className="h-8 gap-1 text-xs">
              <Printer className="h-3 w-3" /> Print / Save PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handleCopyText} className="h-8 gap-1 text-xs">
              <Copy className="h-3 w-3" /> Copy as Text
            </Button>
          </div>
        </div>
        {!hasMinimum && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-warning/30 bg-warning/5 px-4 py-2 text-xs text-warning">
            <AlertCircle className="h-3.5 w-3.5" />
            Your resume may look incomplete. Add your name and at least one project or experience.
          </div>
        )}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <TemplatePicker template={resume.template} colorTheme={resume.colorTheme} onTemplateChange={resume.setTemplate} onColorChange={resume.setColorTheme} />
          <ATSScoreDisplay result={ats} />
        </div>
      </div>
      <div className="mx-auto max-w-4xl px-4 pb-12">
        <ResumePreview data={resume.data} template={resume.template} colorTheme={resume.colorTheme} printMode />
      </div>
    </div>
  );
}
