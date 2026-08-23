import { useEffect, useRef, useState } from "react";
import { IMG, PROCESS_STAGES } from "../data/projects";
import { Reveal, Scramble } from "../lib/motion";
import { Corners, GhostButton } from "../components/bits";
import { PlusMark } from "../components/icons";

const STAGE_IMG: Record<string, { src: string; alt: string; label: string } | null> = {
  sketch: { src: IMG.sketch, alt: "Эскизы кастомного корпуса карандашом на бумаге", label: "эскизы в масштабе 1:1" },
  paint: { src: IMG.paint, alt: "Ручная роспись панели корпуса маркером", label: "роспись: лайнер 0.3 мм" },
};

export default function Process() {
  const [active, setActive] = useState(0);
  const refs = useRef<Array<HTMLElement | null>>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = refs.current.indexOf(e.target as HTMLElement);
            if (i >= 0) setActive(i);
          }
        });
      },
      { rootMargin: "-42% 0px -42% 0px", threshold: 0 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const pct = ((active + 1) / PROCESS_STAGES.length) * 100;

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1400px] px-4 pt-14 pb-10 md:px-6 md:pt-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">
              <span className="text-ember">[ 03 ]</span> Технология лаборатории
            </p>
          </Reveal>
          <h1 className="mt-5 font-display font-black uppercase leading-[0.92] text-fog">
            <Scramble text="ПРОЦЕСС" className="block text-[clamp(2.6rem,9vw,6.5rem)]" delay={100} />
          </h1>
          <Reveal delay={200}>
            <p className="mt-6 max-w-2xl text-smoke leading-relaxed">
              От серийной коробки до единственного экземпляра — пять обязательных этапов. Пропустить
              нельзя ни один: подготовка и лак отвечают за долговечность, эскиз и роспись — за характер.
              Суммарно корпус проводит в лаборатории от двух недель до полутора месяцев.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-4 py-14 md:px-6 md:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* sticky-рейка */}
          <div className="hidden lg:block lg:col-span-3">
            <div className="sticky top-36">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-smoke">Этап</p>
              <p className="mt-2 font-display text-7xl font-black leading-none text-fog">
                {PROCESS_STAGES[active].num}
                <span className="text-line2">/{String(PROCESS_STAGES.length).padStart(2, "0")}</span>
              </p>
              <p className="mt-3 font-display text-sm font-bold uppercase text-ember">
                {PROCESS_STAGES[active].title}
              </p>
              <div className="mt-6 h-44 w-px bg-line relative">
                <div
                  className="absolute left-0 top-0 w-px bg-ember transition-all duration-500"
                  style={{ height: `${pct}%` }}
                />
                <div
                  className="absolute -left-[3.5px] h-2 w-2 rotate-45 bg-ember transition-all duration-500"
                  style={{ top: `calc(${pct}% - 4px)` }}
                />
              </div>
              <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke leading-loose">
                итог: единственный<br />экземпляр <span className="text-volt">1/1</span>
              </p>
            </div>
          </div>

          {/* этапы */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              {PROCESS_STAGES.map((s, i) => {
                const img = STAGE_IMG[s.id] ?? null;
                const isActive = active === i;
                return (
                  <article
                    key={s.id}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    className={`relative border bg-panel transition-colors duration-500 ${
                      isActive ? "border-ember" : "border-line"
                    }`}
                  >
                    <Corners color={isActive ? "text-ember" : "text-line2"} />
                    <div className={`grid ${img ? "md:grid-cols-2" : ""}`}>
                      <div className="p-6 md:p-9">
                        <div className="flex items-baseline gap-4">
                          <span
                            className={`font-display text-4xl md:text-5xl font-black transition-colors ${
                              isActive ? "text-ember" : "text-line2"
                            }`}
                          >
                            {s.num}
                          </span>
                          <h2 className="font-display text-2xl md:text-3xl font-bold uppercase text-fog">
                            {s.title}
                          </h2>
                        </div>
                        <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-volt">
                          {s.lead}
                        </p>
                        <p className="mt-4 leading-relaxed text-smoke">{s.text}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                          {s.tools.map((t) => (
                            <span key={t} className="border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-fog/80">
                              {t}
                            </span>
                          ))}
                        </div>
                        <div className="mt-6 flex items-center gap-3 border-t border-line pt-4">
                          <PlusMark className={isActive ? "text-ember" : "text-line2"} />
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                            длительность: <span className="text-fog">{s.metric}</span>
                          </span>
                        </div>
                      </div>
                      {img && (
                        <div className="relative overflow-hidden border-t border-line md:border-l md:border-t-0">
                          <img
                            src={img.src}
                            alt={img.alt}
                            loading="lazy"
                            className="h-full w-full object-cover min-h-[260px] transition-transform duration-700 hover:scale-105"
                          />
                          <span className="absolute bottom-3 left-3 bg-ink/75 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-fog">
                            {img.label}
                          </span>
                          {s.id === "paint" && <div className="scanline absolute inset-0" aria-hidden="true" />}
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* сводная таймлайн-полоса */}
      <section className="border-t border-line bg-panel/40">
        <div className="mx-auto max-w-[1400px] px-4 py-14 md:px-6">
          <div className="grid gap-px border border-line bg-line md:grid-cols-5">
            {PROCESS_STAGES.map((s, i) => (
              <div key={s.id} className="bg-ink p-5">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ember">{s.num}</p>
                <p className="mt-2 font-display text-sm font-bold uppercase text-fog">{s.title}</p>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">{s.metric}</p>
                {i < PROCESS_STAGES.length - 1 && (
                  <p className="mt-3 hidden font-mono text-volt md:block" aria-hidden="true">→</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <p className="max-w-xl text-smoke leading-relaxed">
              Хотите наблюдать за своим корпусом в реальном времени? Этапы 03—05 фотографируются и
              публикуются в канале — заказчик видит эскиз до начала росписи и согласовывает каждый шаг.
            </p>
            <div className="flex flex-wrap gap-4">
              <GhostButton to="/order" tone="ember">Заказать корпус</GhostButton>
              <GhostButton to="/portfolio">Смотреть результаты</GhostButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
