import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import TopNav from '@/components/layout/TopNav';

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <TopNav />
      <main className="flex min-h-[calc(100vh-3.5rem)] flex-col items-center justify-center px-4">
        <div className="animate-fade-in text-center">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            AI Resume Builder
          </p>
          <h1 className="max-w-lg text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
            Build a Resume
            <br />
            That Gets Read.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-muted-foreground">
            Clean templates, real-time ATS scoring, and structured guidance — everything you need to land interviews.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              onClick={() => navigate('/builder')}
              className="gap-2 bg-primary px-8 text-primary-foreground hover:bg-primary/90"
            >
              Start Building <ArrowRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate('/rb/01-problem')}
              className="gap-2 border-border text-foreground"
            >
              Build Track
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
}
