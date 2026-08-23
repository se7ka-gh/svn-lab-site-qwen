import { useMemo, useState } from "react";
import { PROJECTS, type ProjectStatus } from "../data/projects";
import { Reveal, Scramble } from "../lib/motion";
import { Corners, GhostButton, ProjectCard, StatusBadge } from "../components/bits";

type Filter = "all" | ProjectStatus;

const FILTERS: Array<{ id: Filter; label: string }> = [
  { id: "all", label: "Все" },
  { id: "ready", label: "Готов" },
  { id: "forsale", label: "В продаже" },
  { id: "inprogress", label: "В работе" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const c: Record<Filter, number> = { all: PROJECTS.length, ready: 0, forsale: 0, inprogress: 0 };
    PROJECTS.forEach((p) => c[p.status]++);
    return c;
  }, []);

  const list = useMemo(
    () => (filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.status === filter)),
    [filter],
  );

  return (
    <>
      {/* заголовок раздела */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1400px] px-4 pt-14 pb-10 md:px-6 md:pt-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">
              <span className="text-ember">[ 02 ]</span> Архив объектов / 2024—2026
            </p>
          </Reveal>
          <h1 className="mt-5 font-display font-black uppercase leading-[0.92] text-fog">
            <Scramble text="ПОРТФОЛИО" className="block text-[clamp(2.6rem,9vw,6.5rem)]" delay={100} />
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-xl text-smoke leading-relaxed">
              Каждый корпус — единственный экземпляр с собственным номером. Статусы:{" "}
              <span className="text-volt">готов</span> — в коллекции лаборатории,{" "}
              <span className="text-ember">в продаже</span> — можно забрать,{" "}
              <span className="text-fog">в работе</span> — прямо сейчас на верстаке.
            </p>
          </Reveal>
        </div>
      </section>

      {/* фильтры */}
      <section className="sticky top-[69px] md:top-[97px] z-30 border-b border-line bg-ink/95">
        <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-2 px-4 py-3 md:px-6">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">Фильтр:</span>
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                aria-pressed={active}
                className={`flex items-center gap-2 border px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.16em] transition-all min-h-[44px] md:min-h-0 ${
                  active
                    ? "border-ember bg-ember text-ink font-bold"
                    : "border-line text-smoke hover:border-line2 hover:text-fog"
                }`}
              >
                {f.label}
                <span className={active ? "text-ink/70" : "text-ember"}>{counts[f.id]}</span>
              </button>
            );
          })}
          <span className="ml-auto hidden font-mono text-[10px] uppercase tracking-[0.2em] text-smoke md:block">
            показано: {list.length} / {PROJECTS.length}
          </span>
        </div>
      </section>

      {/* сетка */}
      <section className="mx-auto max-w-[1400px] px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" key={filter}>
          {list.map((p, i) => (
            <ProjectCard key={p.slug} project={p} delay={(i % 3) * 90} />
          ))}
        </div>

        {list.length === 0 && (
          <div className="border border-line p-16 text-center font-mono text-sm text-smoke">
            Объектов с таким статусом пока нет.
          </div>
        )}
      </section>

      {/* нижний блок */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-14 md:grid-cols-2 md:px-6 md:py-16">
          <Reveal>
            <div className="relative border border-line bg-panel p-8 md:p-10">
              <Corners color="text-volt" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">[ ЗАПРОС ]</p>
              <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold uppercase text-fog">
                Нужен корпус в похожем стиле?
              </h2>
              <p className="mt-3 text-sm text-smoke leading-relaxed max-w-md">
                Любой проект из архива можно развить в индивидуальную версию: другая база, палитра,
                персонаж или отсылка. Опишите идею — вернёмся с эскизом и сметой.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex h-full flex-col justify-center gap-5">
              <div className="flex flex-wrap gap-4">
                <GhostButton to="/order" tone="ember">Заказать индивидуальный</GhostButton>
                <GhostButton to="/process">Как создаются корпуса</GhostButton>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status="forsale" />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
                  — значит можно забрать сегодня
                </span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
