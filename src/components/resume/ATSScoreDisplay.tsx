import { ATSResult } from '@/hooks/useATSScore';
import { AlertCircle } from 'lucide-react';

interface Props {
  result: ATSResult;
}

export default function ATSScoreDisplay({ result }: Props) {
  const { score, label, color, suggestions } = result;
  const circumference = 2 * Math.PI * 40;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24 shrink-0">
          <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" stroke="hsl(var(--border))" strokeWidth="6" fill="none" />
            <circle
              cx="50" cy="50" r="40"
              stroke={color}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              className="transition-all duration-700"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-xl font-bold text-foreground">{score}</span>
            <span className="text-[9px] text-muted-foreground">/ 100</span>
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-muted-foreground">ATS Readiness Score</p>
          <p className="text-sm font-semibold" style={{ color }}>{label}</p>
        </div>
      </div>
      {suggestions.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-medium text-muted-foreground">Top Improvements</p>
          {suggestions.slice(0, 3).map((s, i) => (
            <div key={i} className="flex items-start gap-1.5 text-xs text-muted-foreground">
              <AlertCircle className="mt-0.5 h-3 w-3 shrink-0 text-warning" />
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
