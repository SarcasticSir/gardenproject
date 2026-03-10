import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-2 text-sm uppercase tracking-[0.2em] text-emerald-300">The Elemental Garden</p>
        <h1 className="text-4xl font-bold md:text-6xl">Weather-driven idle creature garden</h1>
        <p className="mt-4 max-w-2xl text-slate-300">
          Phase 1 & 2 foundation is ready: server environment, PostgreSQL setup, weather mapping service,
          and secure weather API routes.
        </p>
        <Link
          href="/api/weather"
          className="mt-8 rounded-xl border border-emerald-300/60 bg-emerald-400/10 px-6 py-3 font-medium text-emerald-200 hover:bg-emerald-400/20"
        >
          Test weather endpoint
        </Link>
      </div>
    </main>
  );
}
