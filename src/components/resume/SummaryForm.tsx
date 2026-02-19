import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SummaryForm({ value, onChange }: Props) {
  const wordCount = value.trim().split(/\s+/).filter(Boolean).length;
  const isGoodLength = wordCount >= 40 && wordCount <= 120;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Summary</h3>
        <span className={`text-xs ${isGoodLength ? 'text-success' : 'text-muted-foreground'}`}>
          {wordCount} words {isGoodLength && '✓'}
        </span>
      </div>
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="A brief professional summary highlighting your key strengths and experience..."
        rows={4}
      />
      {wordCount > 0 && wordCount < 40 && (
        <p className="text-xs text-warning">Aim for 40–120 words for best ATS results.</p>
      )}
    </div>
  );
}
