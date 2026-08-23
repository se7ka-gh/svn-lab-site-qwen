import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  EMAIL,
  IMG,
  PROJECTS,
  STATUS_META,
  TG_MAIN,
  formatDate,
  formatPrice,
  getBySlug,
  projectIndex,
} from "../data/projects";
import { Reveal, Scramble } from "../lib/motion";
import { Corners, GhostButton, StatusBadge } from "../components/bits";
import { ArrowIcon, MailIcon, TelegramIcon } from "../components/icons";

const VIEWS = [
  { id: 0, label: "VIEW_01 / FULL", scale: 1, origin: "50% 50%" },
  { id: 1, label: "VIEW_02 / DETAIL A", scale: 1.9, origin: "50% 30%" },
  { id: 2, label: "VIEW_03 / DETAIL B", scale: 1.9, origin: "40% 75%" },
];

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = getBySlug(slug ?? "");
  const [view, setView] = useState(0);

  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const prev = useMemo(() => PROJECTS[(idx - 1 + PROJECTS.length) % PROJECTS.length], [idx]);
  const next = useMemo(() => PROJECTS[(idx + 1) % PROJECTS.length], [idx]);

  useEffect(() => {
    if (project) {
      document.title = `${project.name} — SVN-LAB | Портфолио`;
    }
    return () => {
      document.title = "SVN-LAB — Лаборатория кастомных корпусов | svn-lab.ru";
    };
  }, [project]);

  useEffect(() => setView(0), [slug]);

  if (!project) {
    return (
      <section className="mx-auto max-w-[1400px] px-4 py-32 text-center md:px-6">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-ember">[ ERR.404 ]</p>
        <h1 className="mt-4 font-display text-3xl font-black uppercase text-fog">Объект не найден</h1>
        <p className="mt-3 text-smoke">Возможно, корпус ещё на верстаке или ссылка устарела.</p>
        <div className="mt-8 flex justify-center">
          <GhostButton to="/portfolio">Вернуться в портфолио</GhostButton>
        </div>
      </section>
    );
  }

  const meta = STATUS_META[project.status];
  const v = VIEWS[view];

  return (
    <>
      {/* хлебные крошки + шапка */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-[1400px] px-4 pt-8 md:px-6">
          <Reveal>
            <nav aria-label="Хлебные крошки" className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
              <Link to="/portfolio" className="hover:text-volt transition-colors">← Портфолио</Link>
              <span className="text-line2">/</span>
              <span className="text-fog">объект_{projectIndex(project)}</span>
            </nav>
          </Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6 py-8 md:py-10">
            <div>
              <Reveal>
                <StatusBadge status={project.status} progress={project.progress} />
              </Reveal>
              <h1 className="mt-4 font-display font-black uppercase leading-[0.95] text-[clamp(1.9rem,5.5vw,4rem)] text-fog">
                <Scramble text={project.name} delay={80} />
              </h1>
            </div>
            <Reveal delay={150}>
              <dl className="font-mono text-[11px] uppercase tracking-[0.16em] text-smoke text-right">
                <div>
                  <dt className="inline text-smoke/70">дата: </dt>
                  <dd className="inline text-fog">{formatDate(project.createdAt)}</dd>
                </div>
                <div className="mt-1.5">
                  <dt className="inline text-smoke/70">труд: </dt>
                  <dd className="inline text-fog">{project.hours} ч</dd>
                </div>
                <div className="mt-1.5">
                  <dt className="inline text-smoke/70">серийная база: </dt>
                  <dd className="inline text-volt">{project.base}</dd>
                </div>
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* галерея + сайдбар */}
      <section className="mx-auto grid max-w-[1400px] gap-8 px-4 py-10 md:px-6 md:py-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <Reveal>
            <div className="relative border border-line bg-panel">
              <Corners color="text-ember" />
              <div className="relative overflow-hidden aspect-[4/3]">
                <img
                  src={project.cover}
                  alt={`${project.name} — ${v.label.toLowerCase()}`}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700"
                  style={{ transform: `scale(${v.scale})`, transformOrigin: v.origin }}
                />
                <div className="scanline absolute inset-0" aria-hidden="true" />
                <span className="absolute left-3 top-3 bg-ink/75 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-fog">
                  {v.label}
                </span>
                <span className="absolute right-3 bottom-3 bg-ink/75 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: meta.color }}>
                  ● {meta.label}
                </span>
              </div>
            </div>
          </Reveal>

          <div className="mt-4 grid grid-cols-3 gap-3">
            {VIEWS.map((vw) => (
              <button
                key={vw.id}
                onClick={() => setView(vw.id)}
                aria-pressed={view === vw.id}
                className={`group relative overflow-hidden border transition-colors ${
                  view === vw.id ? "border-ember" : "border-line hover:border-line2"
                }`}
              >
                <img
                  src={project.cover}
                  alt=""
                  loading="lazy"
                  className="aspect-[16/9] w-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
                  style={{ transform: `scale(${vw.scale * 1.05})`, transformOrigin: vw.origin }}
                />
                <span className={`absolute bottom-1.5 left-1.5 font-mono text-[9px] uppercase tracking-[0.14em] ${view === vw.id ? "text-ember" : "text-fog/70"}`}>
                  {vw.label.split(" ")[0]}
                </span>
              </button>
            ))}
          </div>

          {/* описание + концепция */}
          <Reveal>
            <div className="mt-10 border-t border-line pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">[ Описание ]</p>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fog">{project.description}</p>
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 border-t border-line pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">[ Концепция ]</p>
              {project.concept.split("\n\n").map((par, i) => (
                <p key={i} className="mt-4 max-w-2xl leading-relaxed text-smoke">
                  {par}
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <div className="mt-10 border-t border-line pt-8">
              <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">[ Материалы и техники ]</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {project.materials.map((m) => (
                  <li key={m} className="flex items-center gap-3 border border-line bg-panel px-4 py-3 text-sm text-fog/90">
                    <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-volt" aria-hidden="true" />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* сайдбар */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-32 space-y-5">
            <Reveal dir="right">
              <div className="relative border border-line bg-panel p-6">
                <Corners color="text-volt" />
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">Паспорт объекта</p>
                <dl className="mt-5 space-y-3.5">
                  {[
                    ["Серийная база", project.base],
                    ["Формат", project.format],
                    ["Роспись", `${project.hours} часов`],
                    ["Техника", project.tags[2] ?? project.tags[0]],
                    ["Дата", formatDate(project.createdAt)],
                    ["Тираж", "1/1 — единственный"],
                  ].map(([k, val]) => (
                    <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line pb-2.5">
                      <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-smoke">{k}</dt>
                      <dd className="text-right text-sm font-medium text-fog">{val}</dd>
                    </div>
                  ))}
                </dl>

                {project.status === "forsale" && project.price != null && (
                  <div className="mt-6 border border-ember/40 bg-ember/10 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">Цена объекта</p>
                    <p className="mt-1 font-display text-3xl font-black text-ember">{formatPrice(project.price)}</p>
                  </div>
                )}

                {project.status === "inprogress" && project.progress != null && (
                  <div className="mt-6 border border-line p-4">
                    <div className="flex items-baseline justify-between">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">Готовность</p>
                      <p className="font-mono text-sm font-bold text-volt">{project.progress}%</p>
                    </div>
                    <div className="mt-2.5 h-1.5 bg-line">
                      <div className="hatch h-full bg-line" style={{ width: `${project.progress}%`, backgroundImage: "repeating-linear-gradient(-45deg, rgba(0,217,255,0.7) 0px, rgba(0,217,255,0.7) 1px, transparent 1px, transparent 6px)" }} />
                    </div>
                    <p className="mt-2.5 text-xs text-smoke">Прогресс — в Telegram-канале лаборатории.</p>
                  </div>
                )}

                <div className="mt-6 flex flex-col gap-3">
                  <a href={TG_MAIN} target="_blank" rel="noopener noreferrer" className="btn btn-ember justify-center">
                    <TelegramIcon className="w-4 h-4" />
                    {project.status === "forsale" ? "Забрать этот корпус" : "Заказать похожий"}
                  </a>
                  <GhostButton to="/order" tone="ghost">Заполнить бриф</GhostButton>
                  <a
                    href={`mailto:${EMAIL}?subject=SVN-LAB: ${encodeURIComponent(project.name)}`}
                    className="flex items-center justify-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke transition-colors hover:text-volt"
                  >
                    <MailIcon className="w-3.5 h-3.5" /> или на {EMAIL}
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal dir="right" delay={120}>
              <div className="border border-line p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">Теги объекта</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.tags.map((t) => (
                    <span key={t} className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-fog/80">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </aside>
      </section>

      {/* процесс-архив */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">
              <span className="text-ember">[ ARX ]</span> Из архива лаборатории — фрагменты процесса
            </p>
          </Reveal>
          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {[
              { img: IMG.sketch, label: "этап 03 — эскиз на бумаге" },
              { img: IMG.paint, label: "этап 04 — роспись по металлу" },
            ].map((a, i) => (
              <Reveal key={a.label} delay={i * 110}>
                <figure className="group border border-line bg-panel">
                  <div className="overflow-hidden">
                    <img src={a.img} alt={a.label} loading="lazy" className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <figcaption className="flex items-center justify-between px-4 py-3 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                    {a.label}
                    <Link to="/process" className="text-volt transition-colors hover:text-ember">о процессе →</Link>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* prev / next */}
      <nav className="border-t border-line" aria-label="Навигация по проектам">
        <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
          {[
            { p: prev, label: "← Предыдущий объект", align: "items-start text-left" },
            { p: next, label: "Следующий объект →", align: "items-end text-right md:border-l" },
          ].map(({ p, label, align }) => (
            <Link
              key={label}
              to={`/portfolio/${p.slug}`}
              className={`group flex flex-col gap-2 border-line px-4 py-8 transition-colors hover:bg-panel md:px-6 ${align} ${align.includes("border-l") ? "" : "border-b md:border-b-0"}`}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke group-hover:text-ember transition-colors">
                {label}
              </span>
              <span className="flex items-center gap-3 font-display text-lg md:text-xl font-bold uppercase text-fog">
                <span className="font-mono text-xs text-ember">/{projectIndex(p)}</span> {p.name}
                <ArrowIcon className="w-4 h-4 text-smoke transition-transform group-hover:translate-x-1 group-hover:text-volt" />
              </span>
              <StatusBadge status={p.status} progress={p.progress} />
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
