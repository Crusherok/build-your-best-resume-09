import { useParams, useNavigate, Link } from 'react-router-dom';
import { BUILD_STEPS } from '@/types/resume';
import { useBuildTrack } from '@/hooks/useBuildTrack';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Check, Lock, ArrowRight, ArrowLeft, Copy, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BuildStep() {
  const { stepSlug } = useParams<{ stepSlug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const track = useBuildTrack();

  const step = BUILD_STEPS.find(s => s.slug === stepSlug);
  if (!step) return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Step not found</div>;

  const stepIndex = BUILD_STEPS.indexOf(step);
  const prevStep = stepIndex > 0 ? BUILD_STEPS[stepIndex - 1] : null;
  const nextStep = stepIndex < BUILD_STEPS.length - 1 ? BUILD_STEPS[stepIndex + 1] : null;

  // Can only access if previous steps completed (or first step)
  const canAccess = stepIndex === 0 || BUILD_STEPS.slice(0, stepIndex).every(s => track.data.steps[s.slug]?.completed);
  const stepData = track.data.steps[step.slug] || { completed: false, artifact: '' };
  const canGoNext = stepData.completed && stepData.artifact?.trim().length > 0;

  const copyPrompt = () => {
    navigator.clipboard.writeText(step.prompt);
    toast({ title: 'Copied!', description: 'Prompt copied to clipboard.' });
  };

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-background">
        <BuildTopBar step={step} stepIndex={stepIndex} isShipped={track.isShipped} />
        <div className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center gap-4 px-4">
          <Lock className="h-10 w-10 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Complete previous steps to unlock this step.</p>
          <Button variant="outline" onClick={() => navigate(`/rb/${BUILD_STEPS[track.currentStepIndex >= 0 ? track.currentStepIndex : 0].slug}`)}>
            Go to Current Step
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <BuildTopBar step={step} stepIndex={stepIndex} isShipped={track.isShipped} />
      <div className="mx-auto flex max-w-7xl gap-6 p-4">
        {/* Main Workspace (70%) */}
        <div className="w-full lg:w-[70%] space-y-4">
          <div className="rounded-lg border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">{step.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{step.description}</p>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 space-y-4">
            <Label className="text-xs font-medium text-muted-foreground">Artifact / Notes</Label>
            <Textarea
              value={stepData.artifact}
              onChange={e => track.setStepArtifact(step.slug, e.target.value)}
              placeholder="Paste your artifact, notes, or work output here..."
              rows={10}
            />
            <div className="flex items-center gap-3">
              <Button
                variant={stepData.completed ? 'outline' : 'default'}
                size="sm"
                onClick={() => track.toggleStepComplete(step.slug)}
                disabled={!stepData.artifact?.trim()}
                className="gap-1"
              >
                {stepData.completed ? <><Check className="h-3 w-3" /> Completed</> : <><Upload className="h-3 w-3" /> Mark Complete</>}
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between">
            {prevStep ? (
              <Button variant="ghost" size="sm" onClick={() => navigate(`/rb/${prevStep.slug}`)} className="gap-1">
                <ArrowLeft className="h-3 w-3" /> {prevStep.title}
              </Button>
            ) : <div />}
            {nextStep ? (
              <Button
                size="sm"
                onClick={() => navigate(`/rb/${nextStep.slug}`)}
                disabled={!canGoNext}
                className="gap-1"
              >
                {nextStep.title} <ArrowRight className="h-3 w-3" />
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={() => navigate('/rb/proof')}
                disabled={!canGoNext}
                className="gap-1"
              >
                Go to Proof <ArrowRight className="h-3 w-3" />
              </Button>
            )}
          </div>
        </div>

        {/* Build Panel (30%) */}
        <div className="hidden lg:block lg:w-[30%]">
          <div className="sticky top-20 space-y-4">
            <div className="rounded-lg border border-border bg-card p-4 space-y-3">
              <p className="text-xs font-semibold text-muted-foreground">Copy This Into Lovable</p>
              <div className="rounded-md bg-secondary p-3 text-xs text-secondary-foreground font-mono leading-relaxed">
                {step.prompt}
              </div>
              <Button variant="outline" size="sm" onClick={copyPrompt} className="w-full gap-1 text-xs">
                <Copy className="h-3 w-3" /> Copy Prompt
              </Button>
              <Button variant="outline" size="sm" className="w-full text-xs" asChild>
                <a href="https://lovable.dev" target="_blank" rel="noopener noreferrer">Build in Lovable →</a>
              </Button>
            </div>

            {/* Step rail */}
            <div className="rounded-lg border border-border bg-card p-4">
              <p className="mb-3 text-xs font-semibold text-muted-foreground">Progress</p>
              <div className="space-y-1.5">
                {BUILD_STEPS.map((s, i) => {
                  const sd = track.data.steps[s.slug];
                  const isCurrent = s.slug === stepSlug;
                  return (
                    <Link
                      key={s.slug}
                      to={`/rb/${s.slug}`}
                      className={`flex items-center gap-2 rounded-md px-2 py-1.5 text-xs transition-colors ${
                        isCurrent ? 'bg-primary/10 text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {sd?.completed ? (
                        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-success"><Check className="h-2.5 w-2.5 text-success-foreground" /></div>
                      ) : (
                        <div className="flex h-4 w-4 items-center justify-center rounded-full border border-border text-[10px]">{i + 1}</div>
                      )}
                      {s.title}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BuildTopBar({ step, stepIndex, isShipped }: { step: any; stepIndex: number; isShipped: boolean }) {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="text-base font-semibold tracking-tight text-foreground">AI Resume Builder</Link>
        <span className="text-sm text-muted-foreground">Project 3 — Step {stepIndex + 1} of 8</span>
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
          isShipped ? 'bg-success text-success-foreground' : 'bg-secondary text-secondary-foreground'
        }`}>
          {isShipped ? 'Shipped' : 'In Progress'}
        </span>
      </div>
    </header>
  );
}
