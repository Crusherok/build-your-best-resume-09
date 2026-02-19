import { ProjectEntry } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';

interface Props {
  data: ProjectEntry[];
  onChange: (data: ProjectEntry[]) => void;
}

export default function ProjectsForm({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);
  const [techInput, setTechInput] = useState<Record<string, string>>({});

  const addEntry = () => {
    const entry: ProjectEntry = { id: Date.now().toString(), title: '', description: '', techStack: [], liveUrl: '', githubUrl: '' };
    onChange([...data, entry]);
    setExpanded(entry.id);
  };

  const removeEntry = (id: string) => onChange(data.filter(e => e.id !== id));

  const updateEntry = (id: string, field: keyof ProjectEntry, value: any) => {
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addTech = (id: string) => {
    const val = (techInput[id] || '').trim();
    if (!val) return;
    const entry = data.find(e => e.id === id);
    if (entry && !entry.techStack.includes(val)) {
      updateEntry(id, 'techStack', [...entry.techStack, val]);
    }
    setTechInput(prev => ({ ...prev, [id]: '' }));
  };

  const removeTech = (id: string, tech: string) => {
    const entry = data.find(e => e.id === id);
    if (entry) updateEntry(id, 'techStack', entry.techStack.filter(t => t !== tech));
  };

  const handleKeyDown = (id: string, e: KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); addTech(id); }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Projects</h3>
        <Button variant="ghost" size="sm" onClick={addEntry} className="h-7 gap-1 text-xs text-primary">
          <Plus className="h-3 w-3" /> Add Project
        </Button>
      </div>
      {data.map(entry => (
        <div key={entry.id} className="rounded-lg border border-border bg-card p-3">
          <button onClick={() => setExpanded(expanded === entry.id ? null : entry.id)} className="flex w-full items-center justify-between text-left">
            <span className="text-sm font-medium text-foreground">{entry.title || 'New Project'}</span>
            <div className="flex items-center gap-1">
              <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" onClick={e => { e.stopPropagation(); removeEntry(entry.id); }} />
              {expanded === entry.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </div>
          </button>
          {expanded === entry.id && (
            <div className="mt-3 space-y-2">
              <div><Label className="text-xs text-muted-foreground">Project Title</Label><Input value={entry.title} onChange={e => updateEntry(entry.id, 'title', e.target.value)} className="mt-1" /></div>
              <div>
                <div className="flex justify-between"><Label className="text-xs text-muted-foreground">Description</Label><span className="text-xs text-muted-foreground">{entry.description.length}/200</span></div>
                <Textarea value={entry.description} onChange={e => { if (e.target.value.length <= 200) updateEntry(entry.id, 'description', e.target.value); }} rows={3} className="mt-1" />
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Tech Stack</Label>
                <div className="mt-1 flex flex-wrap gap-1">
                  {entry.techStack.map(tech => (
                    <span key={tech} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                      {tech}<X className="h-3 w-3 cursor-pointer" onClick={() => removeTech(entry.id, tech)} />
                    </span>
                  ))}
                </div>
                <Input
                  value={techInput[entry.id] || ''}
                  onChange={e => setTechInput(prev => ({ ...prev, [entry.id]: e.target.value }))}
                  onKeyDown={e => handleKeyDown(entry.id, e)}
                  placeholder="Type tech and press Enter"
                  className="mt-1"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-xs text-muted-foreground">Live URL</Label><Input value={entry.liveUrl} onChange={e => updateEntry(entry.id, 'liveUrl', e.target.value)} className="mt-1" placeholder="https://" /></div>
                <div><Label className="text-xs text-muted-foreground">GitHub URL</Label><Input value={entry.githubUrl} onChange={e => updateEntry(entry.id, 'githubUrl', e.target.value)} className="mt-1" placeholder="https://github.com/..." /></div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
