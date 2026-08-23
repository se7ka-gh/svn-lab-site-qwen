import { Link } from "react-router-dom";
import { IMG, PROCESS_STAGES, PROJECTS, TG_CHANNEL, TG_MAIN } from "../data/projects";
import { CountUp, Reveal, Scramble, Blink } from "../lib/motion";
import { Corners, GhostButton, Marquee, ProjectCard, SectionHead } from "../components/bits";
import { ArrowIcon, PlusMark, TelegramIcon } from "../components/icons";

function RotatingBadge() {
  return (
    <div className="absolute -bottom-10 -left-6 md:-left-10 z-10 grid h-28 w-28 md:h-36 md:w-36 place-items-center" aria-hidden="true">
      <svg viewBox="0 0 100 100" className="spin-slow absolute inset-0 h-full w-full">
        <defs>
          <path id="circ" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
        </defs>
        <circle cx="50" cy="50" r="49" className="fill-ink" />
        <circle cx="50" cy="50" r="49" fill="none" stroke="#262626" strokeWidth="1" />
        <text className="fill-fog font-mono" style={{ fontSize: "8.2px", letterSpacing: "0.24em" }}>
          <textPath href="#circ">РУЧНАЯ РАБОТА • ТИРАЖ 1/1 • SVN-LAB •</textPath>
        </text>
      </svg>
      <span className="relative h-2.5 w-2.5 bg-ember rotate-45" />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-fade absolute inset-0" aria-hidden="true" />
      {/* вертикальная техподпись */}
      <p
        className="absolute left-2 top-1/2 hidden -translate-y-1/2 rotate-180 font-mono text-[10px] tracking-[0.3em] text-smoke/60 uppercase xl:block"
        style={{ writingMode: "vertical-rl" }}
        aria-hidden="true"
      >
        55.7558° N — 37.6173° E // MSK LAB
      </p>

      <div className="relative mx-auto grid max-w-[1400px] gap-12 px-4 pb-20 pt-12 md:px-6 md:pt-16 lg:min-h-[calc(100vh-105px)] lg:grid-cols-12 lg:items-center lg:gap-8">
        {/* левая колонка */}
        <div className="lg:col-span-7">
          <Reveal>
            <p className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">
              <span className="text-ember">[ SYS.START ]</span>
              <span>Лаборатория кастомных корпусов — est. 2024</span>
              <Blink>
                <span className="text-volt">▌</span>
              </Blink>
            </p>
          </Reveal>

          <h1 className="mt-6 font-display font-black uppercase leading-[0.92] text-fog">
            <Scramble
              text="SVN—LAB"
              delay={150}
              className="block text-[clamp(3.4rem,12vw,8.6rem)] tracking-tight"
            />
            <Scramble
              text="КАСТОМНЫЕ КОРПУСА"
              delay={550}
              className="mt-2 block text-[clamp(1.05rem,3vw,2rem)] font-bold text-volt tracking-wide"
            />
          </h1>

          <Reveal delay={200}>
            <p className="mt-7 max-w-md text-base md:text-lg leading-relaxed text-smoke">
              Уникальные компьютерные корпуса. <span className="text-fog font-semibold">Ручная работа.</span>{" "}
              Тираж <span className="text-ember font-mono font-bold">1/1</span> — от дефектовки серийной базы до
              авторской росписи и автомобильного лака.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap gap-4">
              <GhostButton to="/portfolio" tone="ember">Смотреть работы</GhostButton>
              <GhostButton to="/order">Заказать проект</GhostButton>
            </div>
          </Reveal>

          <Reveal delay={420}>
            <dl className="mt-12 grid grid-cols-2 border border-line bg-ink/60 sm:grid-cols-4">
              {[
                ["Тираж", "1:1"],
                ["Роспись", "Вручную"],
                ["Лак", "3 слоя"],
                ["Очередь", "2 места"],
              ].map(([k, v], i) => (
                <div key={k} className={`px-4 py-3.5 ${i > 0 ? "border-l border-line" : ""} ${i >= 2 ? "border-t sm:border-t-0 border-line" : ""} ${i === 2 ? "border-l-0 sm:border-l" : ""}`}>
                  <dt className="font-mono text-[9px] uppercase tracking-[0.22em] text-smoke">{k}</dt>
                  <dd className="mt-1 font-display text-sm font-bold uppercase text-fog">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* правая колонка — объект */}
        <div className="relative lg:col-span-5">
          <Reveal dir="right" delay={150}>
            <div className="relative ml-4 md:ml-8">
              <div className="relative border border-line bg-panel">
                <Corners color="text-ember" />
                <div className="relative overflow-hidden">
                  <img
                    src={IMG.hero}
                    alt="Кастомный корпус COUGAR DUST 2: Knight с ручной росписью"
                    className="aspect-[4/5] w-full object-cover"
                  />
                  <div className="scanline absolute inset-0" aria-hidden="true" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" aria-hidden="true" />
                </div>
                <span className="absolute left-3 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fog/85 bg-ink/70 px-2 py-1">
                  UNIT_01 / KNIGHT
                </span>
                <span className="absolute right-3 top-3 h-2 w-2 border border-volt" aria-hidden="true" />
                <p
                  className="absolute -right-7 top-1/2 hidden -translate-y-1/2 font-mono text-[10px] uppercase tracking-[0.3em] text-smoke/70 md:block"
                  style={{ writingMode: "vertical-rl" }}
                  aria-hidden="true"
                >
                  Cougar Dust 2 — ручная роспись
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                <span>fig. 01 — объект в продаже</span>
                <span className="text-ember">16 500 ₽</span>
              </div>

              <RotatingBadge />
            </div>
          </Reveal>
        </div>
      </div>

      {/* scroll */}
      <div className="relative mx-auto flex max-w-[1400px] items-center gap-3 px-4 pb-6 md:px-6" aria-hidden="true">
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-smoke">Scroll</span>
        <span className="h-px w-16 bg-line2 relative overflow-hidden">
          <span className="scroll-dash absolute inset-y-0 left-0 w-6 bg-ember" style={{ animation: "marquee 2.2s linear infinite" }} />
        </span>
      </div>
    </section>
  );
}

function About() {
  const stats: Array<[number, string, string]> = [
    [23, "проекта в архиве лаборатории", ""],
    [60, "часов росписи — рекорд корпуса", ""],
    [3, "слоя автомобильного лака", ""],
    [1, "экземпляр — тираж каждого проекта", "/1"],
  ];
  return (
    <section className="relative border-b border-line">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28">
        <SectionHead index="01" label="О лаборатории" title="Железо как холст" />
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="text-base leading-relaxed text-smoke">
                SVN-LAB — независимая лаборатория кастомных компьютерных корпусов. Мы не собираем ПК и не
                продаём железо: мы берём серийный корпус и превращаем его в единственный экземпляр —
                с авторским эскизом, ручной росписью по металлу и финишем автомобильным лаком.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-5 text-base leading-relaxed text-smoke">
                Никаких плёнок и печати — только маркер, кисть и аэрограф. Каждый проект документируется
                от первого винта до полировки и выходит из лаборатории под номером.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <div className="mt-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-smoke">
                <PlusMark className="text-volt" />
                <span>
                  подписаться на процесс:{" "}
                  <a href={TG_CHANNEL} target="_blank" rel="noopener noreferrer" className="text-volt hover:text-ember transition-colors">
                    t.me/svnintg
                  </a>
                </span>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <Reveal delay={100}>
              <p className="font-display text-xl md:text-[1.7rem] font-medium uppercase leading-snug text-fog">
                Дефектовка <span className="text-ember">→</span> подготовка <span className="text-ember">→</span>{" "}
                эскиз <span className="text-ember">→</span> роспись <span className="text-ember">→</span> лак.
                Пять этапов, <span className="text-volt">один экземпляр</span>, ноль компромиссов.
              </p>
            </Reveal>

            <div className="mt-12 grid grid-cols-2 gap-px bg-line border border-line">
              {stats.map(([n, label, suf], i) => (
                <div key={label} className="bg-ink p-6 md:p-8">
                  <p className="font-display text-4xl md:text-5xl font-black text-fog">
                    <CountUp to={n} />
                    <span className="text-ember">{suf || (n === 3 ? "×" : "")}</span>
                  </p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke leading-relaxed">
                    {label}
                  </p>
                  <span className="mt-4 block h-px w-8 bg-line2" aria-hidden="true" />
                  <span className="sr-only">{`stat-${i}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Featured() {
  const feats = PROJECTS.filter((p) => p.featured);
  const spans = ["lg:col-span-7", "lg:col-span-5", "lg:col-span-5", "lg:col-span-7"];
  return (
    <section className="relative border-b border-line bg-panel/40">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28">
        <SectionHead
          index="02"
          label="Избранные работы"
          title="Из архива лаборатории"
          right={<GhostButton to="/portfolio">Все объекты</GhostButton>}
        />
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-12">
          {feats.map((p, i) => (
            <div key={p.slug} className={spans[i % spans.length]}>
              <ProjectCard project={p} big={i % 3 === 0} delay={(i % 2) * 110} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessPreview() {
  return (
    <section className="relative border-b border-line">
      <div className="mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-28">
        <SectionHead
          index="03"
          label="Процесс"
          title="Пять этапов до готового корпуса"
          right={<GhostButton to="/process" tone="volt">Как это устроено</GhostButton>}
        />
        <div className="border-t border-line">
          {PROCESS_STAGES.map((s, i) => (
            <Reveal key={s.id} delay={i * 60}>
              <Link
                to="/process"
                className="group grid grid-cols-[auto_1fr] items-center gap-x-5 gap-y-2 border-b border-line px-2 py-5 transition-colors hover:bg-panel md:grid-cols-12 md:gap-x-6 md:px-4"
              >
                <span className="font-display text-2xl md:text-3xl font-black text-line2 transition-colors group-hover:text-ember md:col-span-1">
                  {s.num}
                </span>
                <h3 className="font-display text-base md:text-xl font-bold uppercase text-fog md:col-span-3">
                  {s.title}
                </h3>
                <p className="col-span-2 text-sm text-smoke md:col-span-4 md:col-start-5">{s.lead}</p>
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-smoke md:block md:col-span-3">
                  {s.metric}
                </span>
                <ArrowIcon className="hidden w-5 h-5 text-smoke transition-all group-hover:translate-x-1.5 group-hover:text-volt md:block md:col-span-1 md:justify-self-end" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBlock() {
  return (
    <section className="relative overflow-hidden border-b border-line bg-panel">
      <p
        className="text-outline-ember pointer-events-none absolute -right-6 top-1/2 hidden -translate-y-1/2 font-display text-[11rem] font-black uppercase leading-none lg:block"
        aria-hidden="true"
      >
        1/1
      </p>
      <div className="relative mx-auto max-w-[1400px] px-4 py-20 md:px-6 md:py-24">
        <div className="max-w-2xl">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">
              <span className="text-ember">[ 04 ]</span> Свободная очередь — 2 слота
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-5 font-display font-black uppercase leading-[0.95] text-[clamp(2.2rem,6vw,4.5rem)] text-fog">
              Есть идея? <span className="text-ember">Превратим</span> в корпус.
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-6 max-w-xl text-smoke leading-relaxed">
              Расскажите о персонаже, стиле или отсылке — лаборатория соберёт эскиз под ваш корпус и посчитает
              сроки. Первый ответ обычно в течение дня.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-9 flex flex-wrap gap-4">
              <GhostButton to={TG_MAIN} external tone="ember">
                <TelegramIcon className="w-4 h-4" /> Написать в Telegram
              </GhostButton>
              <GhostButton to="/order">Заполнить бриф</GhostButton>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee
        items={[
          "Ручная работа",
          "Тираж 1/1",
          "Маркеры · кисть · аэрограф",
          "Автомобильный лак",
          "Кастомные корпуса",
          "svn-lab.ru",
        ]}
      />
      <About />
      <Featured />
      <ProcessPreview />
      <CtaBlock />
    </>
  );
}
