import { Link } from 'react-router-dom';
import { useBuildTrack } from '@/hooks/useBuildTrack';
import { BUILD_STEPS } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, X, Copy, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CHECKLIST = [
  'All form sections save to localStorage',
  'Live preview updates in real-time',
  'Template switching preserves data',
  'Color theme persists after refresh',
  'ATS score calculates correctly',
  'Score updates live on edit',
  'Export buttons work (copy/download)',
  'Empty states handled gracefully',
  'Mobile responsive layout works',
  'No console errors on any page',
];

export default function BuildProof() {
  const track = useBuildTrack();
  const { toast } = useToast();

  const isUrlValid = (url: string) => {
    try { new URL(url); return true; } catch { return false; }
  };

  const allStepsComplete = BUILD_STEPS.every(s => track.data.steps[s.slug]?.completed);
  const allChecklistComplete = track.data.checklist.every(Boolean);
  const allLinksValid = isUrlValid(track.data.submission.lovableLink) && isUrlValid(track.data.submission.githubLink) && isUrlValid(track.data.submission.deployLink);

  const copySubmission = () => {
    const text = `------------------------------------------
AI Resume Builder — Final Submission

Lovable Project: ${track.data.submission.lovableLink}
GitHub Repository: ${track.data.submission.githubLink}
Live Deployment: ${track.data.submission.deployLink}

Core Capabilities:
- Structured resume builder
- Deterministic ATS scoring
- Template switching
- PDF export with clean formatting
- Persistence + validation checklist
------------------------------------------`;
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied!', description: 'Final submission copied to clipboard.' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link to="/" className="text-base font-semibold tracking-tight text-foreground">AI Resume Builder</Link>
          <span className="text-sm text-muted-foreground">Build Track — Proof</span>
          <span className={`rounded-full px-3 py-1 text-xs font-medium ${
            track.isShipped ? 'bg-success text-success-foreground' : 'bg-secondary text-secondary-foreground'
          }`}>
            {track.isShipped ? 'Shipped' : 'In Progress'}
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
        {/* Step Status */}
        <section>
          <h2 className="text-lg font-semibold text-foreground">Step Completion</h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {BUILD_STEPS.map(s => {
              const done = track.data.steps[s.slug]?.completed;
              return (
                <Link key={s.slug} to={`/rb/${s.slug}`} className={`flex items-center gap-2 rounded-lg border p-3 transition-colors ${done ? 'border-success/30 bg-success/5' : 'border-border bg-card'}`}>
                  {done ? <Check className="h-4 w-4 text-success" /> : <X className="h-4 w-4 text-muted-foreground" />}
                  <span className="text-xs font-medium text-foreground">{s.title}</span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Checklist */}
        <section>
          <h2 className="text-lg font-semibold text-foreground">Verification Checklist</h2>
          <div className="mt-4 space-y-2">
            {CHECKLIST.map((item, i) => (
              <button
                key={i}
                onClick={() => track.toggleChecklist(i)}
                className="flex w-full items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 text-left transition-colors hover:bg-secondary/50"
              >
                <div className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${track.data.checklist[i] ? 'bg-success' : 'border border-border'}`}>
                  {track.data.checklist[i] && <Check className="h-3 w-3 text-success-foreground" />}
                </div>
                <span className="text-sm text-foreground">{item}</span>
              </button>
            ))}
          </div>
        </section>

        {/* Links */}
        <section>
          <h2 className="text-lg font-semibold text-foreground">Proof Links</h2>
          <div className="mt-4 space-y-3">
            <div>
              <Label className="text-xs text-muted-foreground">Lovable Project Link</Label>
              <Input value={track.data.submission.lovableLink} onChange={e => track.updateSubmission('lovableLink', e.target.value)} placeholder="https://lovable.dev/projects/..." className="mt-1" />
              {track.data.submission.lovableLink && !isUrlValid(track.data.submission.lovableLink) && <p className="mt-1 text-xs text-destructive">Enter a valid URL</p>}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">GitHub Repository Link</Label>
              <Input value={track.data.submission.githubLink} onChange={e => track.updateSubmission('githubLink', e.target.value)} placeholder="https://github.com/..." className="mt-1" />
              {track.data.submission.githubLink && !isUrlValid(track.data.submission.githubLink) && <p className="mt-1 text-xs text-destructive">Enter a valid URL</p>}
            </div>
            <div>
              <Label className="text-xs text-muted-foreground">Deployed URL</Label>
              <Input value={track.data.submission.deployLink} onChange={e => track.updateSubmission('deployLink', e.target.value)} placeholder="https://your-app.lovable.app" className="mt-1" />
              {track.data.submission.deployLink && !isUrlValid(track.data.submission.deployLink) && <p className="mt-1 text-xs text-destructive">Enter a valid URL</p>}
            </div>
          </div>
        </section>

        {/* Submit */}
        <section>
          <Button
            size="lg"
            onClick={copySubmission}
            disabled={!track.isShipped}
            className="w-full gap-2"
          >
            <Copy className="h-4 w-4" /> Copy Final Submission
          </Button>
          {!track.isShipped && (
            <p className="mt-2 text-center text-xs text-muted-foreground">
              Complete all steps, checklist items, and provide valid links to enable submission.
            </p>
          )}
        </section>

        {/* Shipped message */}
        {track.isShipped && (
          <div className="rounded-lg border border-success/30 bg-success/5 p-6 text-center">
            <CheckCircle2 className="mx-auto h-8 w-8 text-success" />
            <p className="mt-2 text-sm font-semibold text-foreground">Project 3 Shipped Successfully.</p>
          </div>
        )}
      </div>
    </div>
  );
}
