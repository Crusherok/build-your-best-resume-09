import { ExperienceEntry, ACTION_VERBS } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: ExperienceEntry[];
  onChange: (data: ExperienceEntry[]) => void;
}

export default function ExperienceForm({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);

  const addEntry = () => {
    const entry: ExperienceEntry = { id: Date.now().toString(), company: '', title: '', startDate: '', endDate: '', bullets: [''] };
    onChange([...data, entry]);
    setExpanded(entry.id);
  };

  const removeEntry = (id: string) => onChange(data.filter(e => e.id !== id));

  const updateEntry = (id: string, field: keyof ExperienceEntry, value: any) => {
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const addBullet = (id: string) => {
    const entry = data.find(e => e.id === id);
    if (entry) updateEntry(id, 'bullets', [...entry.bullets, '']);
  };

  const updateBullet = (id: string, index: number, value: string) => {
    const entry = data.find(e => e.id === id);
    if (entry) {
      const bullets = [...entry.bullets];
      bullets[index] = value;
      updateEntry(id, 'bullets', bullets);
    }
  };

  const removeBullet = (id: string, index: number) => {
    const entry = data.find(e => e.id === id);
    if (entry) updateEntry(id, 'bullets', entry.bullets.filter((_, i) => i !== index));
  };

  const getBulletWarnings = (bullet: string) => {
    const warnings: string[] = [];
    if (bullet.trim()) {
      const firstWord = bullet.trim().split(/\s/)[0].toLowerCase();
      if (!ACTION_VERBS.includes(firstWord)) warnings.push('Start with an action verb');
      if (!/\d/.test(bullet)) warnings.push('Add measurable impact');
    }
    return warnings;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Experience</h3>
        <Button variant="ghost" size="sm" onClick={addEntry} className="h-7 gap-1 text-xs text-primary">
          <Plus className="h-3 w-3" /> Add
        </Button>
      </div>
      {data.map(entry => (
        <div key={entry.id} className="rounded-lg border border-border bg-card p-3">
          <button onClick={() => setExpanded(expanded === entry.id ? null : entry.id)} className="flex w-full items-center justify-between text-left">
            <span className="text-sm font-medium text-foreground">{entry.company || 'New Experience'}</span>
            <div className="flex items-center gap-1">
              <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" onClick={e => { e.stopPropagation(); removeEntry(entry.id); }} />
              {expanded === entry.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </div>
          </button>
          {expanded === entry.id && (
            <div className="mt-3 space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-xs text-muted-foreground">Company</Label><Input value={entry.company} onChange={e => updateEntry(entry.id, 'company', e.target.value)} className="mt-1" /></div>
                <div><Label className="text-xs text-muted-foreground">Title</Label><Input value={entry.title} onChange={e => updateEntry(entry.id, 'title', e.target.value)} className="mt-1" /></div>
                <div><Label className="text-xs text-muted-foreground">Start</Label><Input value={entry.startDate} onChange={e => updateEntry(entry.id, 'startDate', e.target.value)} className="mt-1" /></div>
                <div><Label className="text-xs text-muted-foreground">End</Label><Input value={entry.endDate} onChange={e => updateEntry(entry.id, 'endDate', e.target.value)} className="mt-1" /></div>
              </div>
              <div>
                <Label className="text-xs text-muted-foreground">Bullet Points</Label>
                {entry.bullets.map((bullet, i) => (
                  <div key={i} className="mt-1">
                    <div className="flex gap-1">
                      <Input value={bullet} onChange={e => updateBullet(entry.id, i, e.target.value)} placeholder="Describe your achievement..." />
                      <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => removeBullet(entry.id, i)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    {getBulletWarnings(bullet).length > 0 && (
                      <div className="mt-0.5 flex items-center gap-1 text-xs text-warning">
                        <AlertCircle className="h-3 w-3" />
                        {getBulletWarnings(bullet).join(' · ')}
                      </div>
                    )}
                  </div>
                ))}
                <Button variant="ghost" size="sm" onClick={() => addBullet(entry.id)} className="mt-1 h-7 text-xs text-primary">
                  <Plus className="mr-1 h-3 w-3" /> Add Bullet
                </Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
