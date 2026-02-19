import { ResumeData, TemplateName } from '@/types/resume';
import { Github, Linkedin, Globe, Mail, Phone, MapPin } from 'lucide-react';

interface Props {
  data: ResumeData;
  template: TemplateName;
  colorTheme: string;
  printMode?: boolean;
}

export default function ResumePreview({ data, template, colorTheme, printMode }: Props) {
  const accent = `hsl(${colorTheme})`;
  const hasContent = data.personal.name || data.summary || data.education.length || data.experience.length || data.projects.length;

  if (!hasContent) {
    return (
      <div className={`flex min-h-[600px] items-center justify-center rounded-lg border border-border bg-white p-8 ${printMode ? 'resume-print' : 'premium-shadow'}`}>
        <p className="text-sm text-muted-foreground">Start filling in your details to see your resume here.</p>
      </div>
    );
  }

  if (template === 'modern') return <ModernTemplate data={data} accent={accent} printMode={printMode} />;
  if (template === 'minimal') return <MinimalTemplate data={data} accent={accent} printMode={printMode} />;
  return <ClassicTemplate data={data} accent={accent} printMode={printMode} />;
}

function ClassicTemplate({ data, accent, printMode }: { data: ResumeData; accent: string; printMode?: boolean }) {
  return (
    <div className={`rounded-lg border border-border bg-white p-8 ${printMode ? 'resume-print' : 'premium-shadow'}`}>
      {/* Header */}
      <div className="border-b-2 pb-4 mb-4" style={{ borderColor: accent }}>
        <h1 className="font-resume-serif text-2xl font-bold text-ink">{data.personal.name || 'Your Name'}</h1>
        <div className="mt-1 flex flex-wrap gap-3 text-xs text-ink-muted">
          {data.personal.email && <span className="flex items-center gap-1"><Mail className="h-3 w-3" />{data.personal.email}</span>}
          {data.personal.phone && <span className="flex items-center gap-1"><Phone className="h-3 w-3" />{data.personal.phone}</span>}
          {data.personal.location && <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{data.personal.location}</span>}
        </div>
        <div className="mt-1 flex flex-wrap gap-3 text-xs text-ink-muted">
          {data.links.github && <span className="flex items-center gap-1"><Github className="h-3 w-3" />{data.links.github}</span>}
          {data.links.linkedin && <span className="flex items-center gap-1"><Linkedin className="h-3 w-3" />{data.links.linkedin}</span>}
        </div>
      </div>
      {data.summary && <Section title="Summary" accent={accent}><p className="text-xs leading-relaxed text-ink-muted">{data.summary}</p></Section>}
      {data.experience.length > 0 && (
        <Section title="Experience" accent={accent}>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-3 last:mb-0">
              <div className="flex justify-between"><span className="text-sm font-semibold text-ink">{exp.title}</span><span className="text-xs text-ink-muted">{exp.startDate} — {exp.endDate}</span></div>
              <p className="text-xs text-ink-muted">{exp.company}</p>
              <ul className="mt-1 space-y-0.5">
                {exp.bullets.filter(b => b.trim()).map((b, i) => <li key={i} className="text-xs text-ink-muted pl-3 relative before:absolute before:left-0 before:content-['•']">{b}</li>)}
              </ul>
            </div>
          ))}
        </Section>
      )}
      {data.education.length > 0 && (
        <Section title="Education" accent={accent}>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-2 last:mb-0">
              <div className="flex justify-between"><span className="text-sm font-semibold text-ink">{edu.school}</span><span className="text-xs text-ink-muted">{edu.startDate} — {edu.endDate}</span></div>
              <p className="text-xs text-ink-muted">{edu.degree} {edu.field && `in ${edu.field}`} {edu.gpa && `· GPA: ${edu.gpa}`}</p>
            </div>
          ))}
        </Section>
      )}
      {data.projects.length > 0 && (
        <Section title="Projects" accent={accent}>
          {data.projects.map(proj => (
            <div key={proj.id} className="mb-3 last:mb-0">
              <div className="flex items-center gap-2"><span className="text-sm font-semibold text-ink">{proj.title}</span>
                {proj.liveUrl && <Globe className="h-3 w-3 text-ink-faint" />}
                {proj.githubUrl && <Github className="h-3 w-3 text-ink-faint" />}
              </div>
              <p className="text-xs text-ink-muted">{proj.description}</p>
              {proj.techStack.length > 0 && <div className="mt-1 flex flex-wrap gap-1">{proj.techStack.map(t => <span key={t} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-ink-muted">{t}</span>)}</div>}
            </div>
          ))}
        </Section>
      )}
      <SkillsSection data={data} />
    </div>
  );
}

function ModernTemplate({ data, accent, printMode }: { data: ResumeData; accent: string; printMode?: boolean }) {
  const totalSkills = [...data.skills.technical, ...data.skills.soft, ...data.skills.tools];
  return (
    <div className={`flex rounded-lg border border-border bg-white overflow-hidden ${printMode ? 'resume-print' : 'premium-shadow'}`}>
      {/* Sidebar */}
      <div className="w-1/3 p-5 text-white" style={{ backgroundColor: accent }}>
        <h1 className="text-lg font-bold">{data.personal.name || 'Your Name'}</h1>
        <div className="mt-3 space-y-1.5 text-xs opacity-90">
          {data.personal.email && <p className="flex items-center gap-1"><Mail className="h-3 w-3" />{data.personal.email}</p>}
          {data.personal.phone && <p className="flex items-center gap-1"><Phone className="h-3 w-3" />{data.personal.phone}</p>}
          {data.personal.location && <p className="flex items-center gap-1"><MapPin className="h-3 w-3" />{data.personal.location}</p>}
          {data.links.github && <p className="flex items-center gap-1"><Github className="h-3 w-3" /><span className="truncate">{data.links.github.replace('https://', '')}</span></p>}
          {data.links.linkedin && <p className="flex items-center gap-1"><Linkedin className="h-3 w-3" /><span className="truncate">{data.links.linkedin.replace('https://', '')}</span></p>}
        </div>
        {totalSkills.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-70">Skills</h3>
            <div className="flex flex-wrap gap-1">{totalSkills.map(s => <span key={s} className="rounded-full bg-white/20 px-2 py-0.5 text-[10px]">{s}</span>)}</div>
          </div>
        )}
        {data.education.length > 0 && (
          <div className="mt-5">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider opacity-70">Education</h3>
            {data.education.map(edu => (
              <div key={edu.id} className="mb-2 text-xs">
                <p className="font-semibold">{edu.school}</p>
                <p className="opacity-80">{edu.degree} {edu.field && `in ${edu.field}`}</p>
                <p className="opacity-60">{edu.startDate} — {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Main */}
      <div className="flex-1 p-6">
        {data.summary && <div className="mb-4"><h3 className="mb-1 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Summary</h3><p className="text-xs leading-relaxed text-ink-muted">{data.summary}</p></div>}
        {data.experience.length > 0 && (
          <div className="mb-4">
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Experience</h3>
            {data.experience.map(exp => (
              <div key={exp.id} className="mb-3">
                <div className="flex justify-between"><span className="text-sm font-semibold text-ink">{exp.title}</span><span className="text-xs text-ink-muted">{exp.startDate} — {exp.endDate}</span></div>
                <p className="text-xs text-ink-muted">{exp.company}</p>
                <ul className="mt-1 space-y-0.5">{exp.bullets.filter(b => b.trim()).map((b, i) => <li key={i} className="text-xs text-ink-muted pl-3 relative before:absolute before:left-0 before:content-['•']">{b}</li>)}</ul>
              </div>
            ))}
          </div>
        )}
        {data.projects.length > 0 && (
          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider" style={{ color: accent }}>Projects</h3>
            {data.projects.map(proj => (
              <div key={proj.id} className="mb-3">
                <div className="flex items-center gap-2"><span className="text-sm font-semibold text-ink">{proj.title}</span></div>
                <p className="text-xs text-ink-muted">{proj.description}</p>
                {proj.techStack.length > 0 && <div className="mt-1 flex flex-wrap gap-1">{proj.techStack.map(t => <span key={t} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-ink-muted">{t}</span>)}</div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function MinimalTemplate({ data, accent, printMode }: { data: ResumeData; accent: string; printMode?: boolean }) {
  return (
    <div className={`rounded-lg border border-border bg-white p-10 ${printMode ? 'resume-print' : 'premium-shadow'}`}>
      <h1 className="text-2xl font-light tracking-tight text-ink">{data.personal.name || 'Your Name'}</h1>
      <div className="mt-1 flex flex-wrap gap-3 text-xs text-ink-muted">
        {data.personal.email && <span>{data.personal.email}</span>}
        {data.personal.phone && <span>{data.personal.phone}</span>}
        {data.personal.location && <span>{data.personal.location}</span>}
      </div>
      {data.summary && <p className="mt-6 text-xs leading-relaxed text-ink-muted">{data.summary}</p>}
      {data.experience.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">Experience</h3>
          {data.experience.map(exp => (
            <div key={exp.id} className="mb-4">
              <div className="flex justify-between"><span className="text-sm font-medium text-ink">{exp.title} — {exp.company}</span><span className="text-xs text-ink-faint">{exp.startDate} — {exp.endDate}</span></div>
              <ul className="mt-1 space-y-0.5">{exp.bullets.filter(b => b.trim()).map((b, i) => <li key={i} className="text-xs text-ink-muted">{b}</li>)}</ul>
            </div>
          ))}
        </div>
      )}
      {data.education.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">Education</h3>
          {data.education.map(edu => (
            <div key={edu.id} className="mb-2"><span className="text-sm font-medium text-ink">{edu.school}</span><span className="text-xs text-ink-muted"> — {edu.degree} {edu.field && `in ${edu.field}`}</span></div>
          ))}
        </div>
      )}
      {data.projects.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">Projects</h3>
          {data.projects.map(proj => (
            <div key={proj.id} className="mb-3"><span className="text-sm font-medium text-ink">{proj.title}</span><p className="text-xs text-ink-muted">{proj.description}</p></div>
          ))}
        </div>
      )}
      <SkillsSection data={data} />
    </div>
  );
}

function Section({ title, accent, children }: { title: string; accent: string; children: React.ReactNode }) {
  return (
    <div className="mb-4">
      <h3 className="mb-2 border-b pb-1 text-xs font-semibold uppercase tracking-wider" style={{ borderColor: accent, color: accent }}>{title}</h3>
      {children}
    </div>
  );
}

function SkillsSection({ data }: { data: ResumeData }) {
  const all = [...data.skills.technical, ...data.skills.soft, ...data.skills.tools];
  if (all.length === 0) return null;
  return (
    <div className="mt-4">
      <h3 className="mb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-faint">Skills</h3>
      <div className="flex flex-wrap gap-1">{all.map(s => <span key={s} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-ink-muted">{s}</span>)}</div>
    </div>
  );
}
