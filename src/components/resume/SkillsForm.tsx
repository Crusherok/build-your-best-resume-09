import { Skills } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X, Sparkles } from 'lucide-react';
import { useState, KeyboardEvent } from 'react';

interface Props {
  data: Skills;
  onChange: (data: Skills) => void;
}

const SUGGESTED_SKILLS: Skills = {
  technical: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'GraphQL'],
  soft: ['Team Leadership', 'Problem Solving'],
  tools: ['Git', 'Docker', 'AWS'],
};

type Category = keyof Skills;

export default function SkillsForm({ data, onChange }: Props) {
  const [inputs, setInputs] = useState<Record<Category, string>>({ technical: '', soft: '', tools: '' });
  const [suggesting, setSuggesting] = useState(false);

  const addSkill = (category: Category) => {
    const val = inputs[category].trim();
    if (!val || data[category].includes(val)) return;
    onChange({ ...data, [category]: [...data[category], val] });
    setInputs(prev => ({ ...prev, [category]: '' }));
  };

  const removeSkill = (category: Category, skill: string) => {
    onChange({ ...data, [category]: data[category].filter(s => s !== skill) });
  };

  const handleKeyDown = (category: Category, e: KeyboardEvent) => {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(category); }
  };

  const suggestSkills = () => {
    setSuggesting(true);
    setTimeout(() => {
      const newSkills = { ...data };
      (Object.keys(SUGGESTED_SKILLS) as Category[]).forEach(cat => {
        SUGGESTED_SKILLS[cat].forEach(skill => {
          if (!newSkills[cat].includes(skill)) newSkills[cat] = [...newSkills[cat], skill];
        });
      });
      onChange(newSkills);
      setSuggesting(false);
    }, 1000);
  };

  const categories: { key: Category; label: string }[] = [
    { key: 'technical', label: 'Technical Skills' },
    { key: 'soft', label: 'Soft Skills' },
    { key: 'tools', label: 'Tools & Technologies' },
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Skills</h3>
        <Button variant="ghost" size="sm" onClick={suggestSkills} disabled={suggesting} className="h-7 gap-1 text-xs text-primary">
          <Sparkles className="h-3 w-3" /> {suggesting ? 'Suggesting...' : 'Suggest Skills'}
        </Button>
      </div>
      {categories.map(({ key, label }) => (
        <div key={key}>
          <Label className="text-xs text-muted-foreground">{label} ({data[key].length})</Label>
          <div className="mt-1 flex flex-wrap gap-1">
            {data[key].map(skill => (
              <span key={skill} className="inline-flex items-center gap-1 rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                {skill}<X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(key, skill)} />
              </span>
            ))}
          </div>
          <Input
            value={inputs[key]}
            onChange={e => setInputs(prev => ({ ...prev, [key]: e.target.value }))}
            onKeyDown={e => handleKeyDown(key, e)}
            placeholder={`Type a ${label.toLowerCase().replace(' skills', '').replace(' & technologies', '')} skill and press Enter`}
            className="mt-1"
          />
        </div>
      ))}
    </div>
  );
}
