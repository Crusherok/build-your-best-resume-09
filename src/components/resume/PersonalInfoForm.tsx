import { ResumeData } from '@/types/resume';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  data: ResumeData['personal'];
  onChange: (data: ResumeData['personal']) => void;
}

export default function PersonalInfoForm({ data, onChange }: Props) {
  const update = (field: keyof typeof data, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Personal Info</h3>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-xs text-muted-foreground">Full Name</Label>
          <Input value={data.name} onChange={e => update('name', e.target.value)} placeholder="John Doe" className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Email</Label>
          <Input type="email" value={data.email} onChange={e => update('email', e.target.value)} placeholder="john@email.com" className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Phone</Label>
          <Input value={data.phone} onChange={e => update('phone', e.target.value)} placeholder="+1 (555) 000-0000" className="mt-1" />
        </div>
        <div>
          <Label className="text-xs text-muted-foreground">Location</Label>
          <Input value={data.location} onChange={e => update('location', e.target.value)} placeholder="City, State" className="mt-1" />
        </div>
      </div>
    </div>
  );
}
