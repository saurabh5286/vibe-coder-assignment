import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}

export function Layout({ children, title, subtitle }: LayoutProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(167,139,250,0.18),transparent_36%),linear-gradient(135deg,#f8f7ff_0%,#f5f7ff_45%,#eef2ff_100%)] px-4 py-6 text-slate-700 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6">
        <header className="rounded-4xl border border-white/70 bg-white/80 px-6 py-5 shadow-[0_20px_60px_-24px_rgba(15,23,42,0.5)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <Link to="/" className="text-xl font-semibold tracking-tight text-slate-900">
                Influencer Compass
              </Link>
              <p className="mt-2 max-w-2xl text-sm text-slate-500">
                Discover creators, compare their reach, and build your shortlist in one place.
              </p>
            </div>
            <div className="rounded-full border border-violet-200 bg-violet-50 px-4 py-2 text-sm font-medium text-violet-700">
              Curated social discovery
            </div>
          </div>
          {title && (
            <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  {title}
                </h1>
                {subtitle && <p className="mt-2 text-sm text-slate-500">{subtitle}</p>}
              </div>
            </div>
          )}
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
