import { TemplateName, ColorTheme, COLOR_THEMES } from '@/types/resume';
import { Check } from 'lucide-react';

interface Props {
  template: TemplateName;
  colorTheme: string;
  onTemplateChange: (t: TemplateName) => void;
  onColorChange: (c: string) => void;
}

const TEMPLATES: { name: TemplateName; label: string; desc: string }[] = [
  { name: 'classic', label: 'Classic', desc: 'Traditional single-column' },
  { name: 'modern', label: 'Modern', desc: 'Two-column with sidebar' },
  { name: 'minimal', label: 'Minimal', desc: 'Clean, generous space' },
];

export default function TemplatePicker({ template, colorTheme, onTemplateChange, onColorChange }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Template</p>
        <div className="flex gap-2">
          {TEMPLATES.map(t => (
            <button
              key={t.name}
              onClick={() => onTemplateChange(t.name)}
              className={`relative flex-1 rounded-lg border-2 p-3 text-left transition-all ${
                template === t.name ? 'border-primary bg-primary/5' : 'border-border hover:border-muted-foreground/30'
              }`}
            >
              {template === t.name && <Check className="absolute right-2 top-2 h-3.5 w-3.5 text-primary" />}
              <div className="mb-1 text-xs font-semibold text-foreground">{t.label}</div>
              <div className="text-[10px] text-muted-foreground">{t.desc}</div>
              {/* Mini preview skeleton */}
              <div className="mt-2 space-y-1">
                {t.name === 'modern' ? (
                  <div className="flex gap-1">
                    <div className="h-8 w-1/3 rounded-sm bg-muted" />
                    <div className="h-8 w-2/3 space-y-0.5">
                      <div className="h-1.5 w-3/4 rounded-full bg-muted" />
                      <div className="h-1 w-full rounded-full bg-muted" />
                      <div className="h-1 w-2/3 rounded-full bg-muted" />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="h-1.5 w-1/2 rounded-full bg-muted" />
                    <div className="h-1 w-full rounded-full bg-muted" />
                    <div className="h-1 w-3/4 rounded-full bg-muted" />
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-xs font-medium text-muted-foreground">Accent Color</p>
        <div className="flex gap-2">
          {COLOR_THEMES.map(c => (
            <button
              key={c.value}
              onClick={() => onColorChange(c.hsl)}
              className={`relative h-8 w-8 rounded-full transition-all ${
                colorTheme === c.hsl ? 'ring-2 ring-foreground ring-offset-2 ring-offset-background' : ''
              }`}
              style={{ backgroundColor: `hsl(${c.hsl})` }}
              title={c.name}
            >
              {colorTheme === c.hsl && <Check className="absolute inset-0 m-auto h-3.5 w-3.5 text-white" />}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
