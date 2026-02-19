import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { label: 'Builder', path: '/builder' },
  { label: 'Preview', path: '/preview' },
  { label: 'Proof', path: '/proof' },
];

export default function TopNav() {
  const location = useLocation();
  const isBuildTrack = location.pathname.startsWith('/rb');

  return (
    <header className="no-print sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
        <Link to="/" className="text-base font-semibold tracking-tight text-foreground">
          AI Resume Builder
        </Link>
        {isBuildTrack ? (
          <span className="text-sm text-muted-foreground">Build Track</span>
        ) : (
          <nav className="flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
        <Link
          to="/rb/01-problem"
          className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          Build Track
        </Link>
      </div>
    </header>
  );
}
