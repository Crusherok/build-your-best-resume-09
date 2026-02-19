import { Links } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  data: Links;
  onChange: (data: Links) => void;
}

export default function LinksForm({ data, onChange }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Links</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">GitHub</Label>
          <Input value={data.github} onChange={e => onChange({ ...data, github: e.target.value })} placeholder="https://github.com/..." className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">LinkedIn</Label>
          <Input value={data.linkedin} onChange={e => onChange({ ...data, linkedin: e.target.value })} placeholder="https://linkedin.com/in/..." className="mt-1" />
        </div>
      </div>
    </div>
  );
}
