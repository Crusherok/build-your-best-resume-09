import { EducationEntry } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

interface Props {
  data: EducationEntry[];
  onChange: (data: EducationEntry[]) => void;
}

export default function EducationForm({ data, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(data[0]?.id || null);

  const addEntry = () => {
    const entry: EducationEntry = { id: Date.now().toString(), school: '', degree: '', field: '', startDate: '', endDate: '', gpa: '' };
    onChange([...data, entry]);
    setExpanded(entry.id);
  };

  const removeEntry = (id: string) => onChange(data.filter(e => e.id !== id));

  const updateEntry = (id: string, field: keyof EducationEntry, value: string) => {
    onChange(data.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Education</h3>
        <Button variant="ghost" size="sm" onClick={addEntry} className="h-7 gap-1 text-xs text-primary">
          <Plus className="h-3 w-3" /> Add
        </Button>
      </div>
      {data.map(entry => (
        <div key={entry.id} className="rounded-lg border border-border bg-card p-3">
          <button
            onClick={() => setExpanded(expanded === entry.id ? null : entry.id)}
            className="flex w-full items-center justify-between text-left"
          >
            <span className="text-sm font-medium text-foreground">
              {entry.school || 'New Education'}
            </span>
            <div className="flex items-center gap-1">
              <Trash2
                className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive"
                onClick={e => { e.stopPropagation(); removeEntry(entry.id); }}
              />
              {expanded === entry.id ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
            </div>
          </button>
          {expanded === entry.id && (
            <div className="mt-3 grid grid-cols-2 gap-2">
              <div className="col-span-2"><Label className="text-xs text-muted-foreground">School</Label><Input value={entry.school} onChange={e => updateEntry(entry.id, 'school', e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs text-muted-foreground">Degree</Label><Input value={entry.degree} onChange={e => updateEntry(entry.id, 'degree', e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs text-muted-foreground">Field</Label><Input value={entry.field} onChange={e => updateEntry(entry.id, 'field', e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs text-muted-foreground">Start</Label><Input value={entry.startDate} onChange={e => updateEntry(entry.id, 'startDate', e.target.value)} className="mt-1" /></div>
              <div><Label className="text-xs text-muted-foreground">End</Label><Input value={entry.endDate} onChange={e => updateEntry(entry.id, 'endDate', e.target.value)} className="mt-1" /></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
