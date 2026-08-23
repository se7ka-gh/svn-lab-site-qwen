import { Link } from "react-router-dom";
import { STATUS_META, formatPrice, projectIndex, type Project } from "../data/projects";
import { Reveal } from "../lib/motion";
import { ArrowIcon } from "./icons";

/* угловые метки-«прицелы» для технических рамок */
export function Corners({ color = "border-ember" }: { color?: string }) {
  const base = `absolute w-3.5 h-3.5 border-current pointer-events-none ${color}`;
  return (
    <>
      <span aria-hidden className={`${base} top-0 left-0 border-t border-l`} />
      <span aria-hidden className={`${base} top-0 right-0 border-t border-r`} />
      <span aria-hidden className={`${base} bottom-0 left-0 border-b border-l`} />
      <span aria-hidden className={`${base} bottom-0 right-0 border-b border-r`} />
    </>
  );
}

export function StatusBadge({ status, progress }: { status: Project["status"]; progress?: number }) {
  const m = STATUS_META[status];
  return (
    <span
      className="inline-flex items-center gap-2 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] backdrop-blur-[2px]"
      style={{ color: m.color, background: m.bg, border: `1px solid ${m.border}` }}
    >
      <span
        className={status === "inprogress" ? "w-1.5 h-1.5 rounded-full animate-pulse-dot" : "w-1.5 h-1.5"}
        style={{ background: m.color }}
      />
      {m.label}
      {status === "inprogress" && progress != null && <span>· {progress}%</span>}
    </span>
  );
}

export function SectionHead({
  index,
  label,
  title,
  right,
}: {
  index: string;
  label: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-10 md:mb-14">
      <Reveal>
        <div className="flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-smoke">
          <span className="text-ember">[{index}]</span>
          <span>{label}</span>
          <span className="h-px flex-1 bg-line" />
        </div>
      </Reveal>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <Reveal delay={80}>
          <h2 className="font-display font-bold uppercase leading-[0.95] text-[clamp(1.9rem,5vw,3.6rem)] text-fog">
            {title}
          </h2>
        </Reveal>
        {right && <Reveal delay={160}>{right}</Reveal>}
      </div>
    </div>
  );
}

export function Marquee({ items, tone = "ember" }: { items: string[]; tone?: "ember" | "volt" }) {
  const sep = tone === "ember" ? "text-ember" : "text-volt";
  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((it, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 font-display text-sm md:text-base font-semibold uppercase tracking-wide text-fog/80">
            {it}
          </span>
          <span className={`font-mono ${sep}`}>✕</span>
        </span>
      ))}
    </div>
  );
  return (
    <div className="marquee overflow-hidden border-y border-line bg-panel py-3.5 select-none">
      <div className="marquee-track">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}

export function ProjectCard({
  project,
  big = false,
  delay = 0,
}: {
  project: Project;
  big?: boolean;
  delay?: number;
}) {
  const idx = projectIndex(project);
  return (
    <Reveal delay={delay} as="article" className={big ? "md:col-span-2" : ""}>
      <Link
        to={`/portfolio/${project.slug}`}
        className="p-card group relative block border border-line bg-panel"
      >
        <div className={`relative overflow-hidden ${big ? "aspect-[16/9]" : "aspect-[4/3]"}`}>
          <img
            src={project.cover}
            alt={`Кастомный корпус ${project.name}`}
            loading="lazy"
            className="p-img absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-transparent to-ink/20" />
          <div className="absolute left-3 top-3">
            <StatusBadge status={project.status} progress={project.progress} />
          </div>
          <span className="absolute right-3 top-3 font-mono text-[10px] tracking-[0.2em] text-fog/70">
            /{idx}
          </span>
          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">{project.base}</p>
              <h3
                className={`mt-1 font-display font-bold uppercase leading-tight text-fog ${
                  big ? "text-xl md:text-2xl" : "text-base md:text-lg"
                }`}
              >
                {project.name}
              </h3>
            </div>
            {project.status === "forsale" && project.price != null && (
              <span className="shrink-0 font-mono text-sm font-bold text-ember">{formatPrice(project.price)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between border-t border-line px-4 py-3">
          <p className="line-clamp-1 max-w-[78%] text-sm text-smoke">{project.description}</p>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/60 transition-colors group-hover:text-ember">
            Открыть <ArrowIcon className="btn-arrow w-3.5 h-3.5" />
          </span>
        </div>
      </Link>
    </Reveal>
  );
}

export function GhostButton({
  to,
  children,
  tone = "ghost",
  external,
}: {
  to: string;
  children: React.ReactNode;
  tone?: "ember" | "ghost" | "volt";
  external?: boolean;
}) {
  const cls = `btn btn-${tone}`;
  if (external) {
    return (
      <a href={to} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
        <ArrowIcon className="btn-arrow w-4 h-4" />
      </a>
    );
  }
  return (
    <Link to={to} className={cls}>
      {children}
      <ArrowIcon className="btn-arrow w-4 h-4" />
    </Link>
  );
}
