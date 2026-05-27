import { BarChart3, ExternalLink, RotateCcw } from "lucide-react";

const logoPath = "/ca-consultoria-logo.png";

export function BrandHeader({ onReset }) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <img
            className="h-12 w-auto shrink-0"
            src={logoPath}
            alt="Carlos Aguirre Consultoria Internacional"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-black uppercase tracking-[0.18em]">CA Consultoria Internacional</p>
            <p className="truncate text-xs text-white/62">Carlos Aguirre Coach</p>
          </div>
        </div>

        <nav className="hidden items-center gap-3 md:flex" aria-label="Enlaces principales">
          <a
            className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm font-bold text-white/78 transition hover:bg-white/10 hover:text-white"
            href="https://carlosaguirrecoach.com/"
            target="_blank"
            rel="noreferrer"
          >
            carlosaguirrecoach.com <ExternalLink size={15} />
          </a>
          <span className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-black text-ink">
            <BarChart3 size={16} /> AI Readiness Index
          </span>
        </nav>

        <button
          className="inline-flex items-center gap-2 rounded-md border border-white/15 px-3 py-2 text-sm font-bold transition hover:border-gold hover:text-gold"
          type="button"
          onClick={onReset}
        >
          <RotateCcw size={16} />
          <span className="hidden sm:inline">Reiniciar</span>
        </button>
      </div>
    </header>
  );
}
