import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { EMAIL, SOCIALS, TG_MAIN } from "../data/projects";
import { useReducedMotion } from "../lib/motion";
import { MailIcon, PlusMark, TelegramIcon, socialIcon } from "./icons";

/* ================= интерактивная сетка на фоне ================= */

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  s: number;
  c: string;
}

export function GridCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let raf = 0;
    const mouse = { x: -9999, y: -9999 };
    const CELL = 56;
    const RADIUS = 170;
    let nodes: Node[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.round((w * h) / 90000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.22,
        vy: (Math.random() - 0.5) * 0.22,
        s: 2 + Math.random() * 3,
        c: Math.random() > 0.5 ? "255,62,0" : "0,217,255",
      }));
      if (reduced) draw(0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // сетка
      ctx.strokeStyle = "rgba(255,255,255,0.045)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (let x = 0; x <= w; x += CELL) {
        ctx.moveTo(x + 0.5, 0);
        ctx.lineTo(x + 0.5, h);
      }
      for (let y = 0; y <= h; y += CELL) {
        ctx.moveTo(0, y + 0.5);
        ctx.lineTo(w, y + 0.5);
      }
      ctx.stroke();

      // дрейфующие узлы
      nodes.forEach((n) => {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
        const pulse = reduced ? 0.5 : 0.4 + 0.3 * Math.sin(t / 900 + n.x);
        ctx.fillStyle = `rgba(${n.c},${pulse * 0.5})`;
        ctx.fillRect(n.x, n.y, n.s, n.s);
      });

      // подсветка у курсора
      if (!reduced) {
        const gx0 = Math.max(0, Math.floor((mouse.x - RADIUS) / CELL));
        const gx1 = Math.min(Math.ceil(w / CELL), Math.ceil((mouse.x + RADIUS) / CELL));
        const gy0 = Math.max(0, Math.floor((mouse.y - RADIUS) / CELL));
        const gy1 = Math.min(Math.ceil(h / CELL), Math.ceil((mouse.y + RADIUS) / CELL));
        for (let gx = gx0; gx <= gx1; gx++) {
          for (let gy = gy0; gy <= gy1; gy++) {
            const px = gx * CELL;
            const py = gy * CELL;
            const d = Math.hypot(px - mouse.x, py - mouse.y);
            if (d < RADIUS) {
              const k = 1 - d / RADIUS;
              const col = (gx + gy) % 2 === 0 ? "255,62,0" : "0,217,255";
              ctx.strokeStyle = `rgba(${col},${k * 0.5})`;
              ctx.beginPath();
              ctx.moveTo(px - 4, py);
              ctx.lineTo(px + 4, py);
              ctx.moveTo(px, py - 4);
              ctx.lineTo(px, py + 4);
              ctx.stroke();
            }
          }
        }
      }
    };

    const loop = (t: number) => {
      draw(t);
      raf = requestAnimationFrame(loop);
    };

    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("mousemove", onMove);
      window.addEventListener("mouseout", onLeave);
      raf = requestAnimationFrame(loop);
    } else {
      draw(0);
    }
    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [reduced]);

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true" />;
}

/* ================= шапка ================= */

const NAV = [
  { to: "/", label: "Главная", code: "01" },
  { to: "/portfolio", label: "Портфолио", code: "02" },
  { to: "/process", label: "Процесс", code: "03" },
  { to: "/order", label: "Заказать", code: "04" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/95">
      {/* верхняя техническая полоса */}
      <div className="hidden md:flex items-center justify-between border-b border-line px-6 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-smoke">
        <span className="flex items-center gap-2">
          <PlusMark className="text-ember" /> svn-lab.ru // лаборатория кастомных корпусов
        </span>
        <span className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-ember animate-pulse-dot" />
          приём заказов: открыт
        </span>
      </div>

      <div className="flex items-center justify-between px-4 md:px-6 py-3">
        <Link to="/" className="group flex items-center gap-2.5" aria-label="SVN-LAB — на главную">
          <span className="grid h-8 w-8 place-items-center bg-ember font-display text-sm font-black text-ink transition-transform group-hover:rotate-90">
            S
          </span>
          <span className="font-display text-base md:text-lg font-bold uppercase tracking-tight text-fog">
            SVN<span className="text-ember">—</span>LAB
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Основная навигация">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
            >
              <span className="text-ember mr-1.5">{n.code}</span>
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href={TG_MAIN}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-ember hidden sm:inline-flex !py-2 !px-4 !text-[11px]"
          >
            <TelegramIcon className="w-4 h-4" />
            Telegram
          </a>
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden relative flex h-11 w-11 flex-col items-center justify-center gap-1.5 border border-line"
            aria-label={open ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={open}
          >
            <span
              className={`block h-px w-5 bg-fog transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`block h-px w-5 bg-fog transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* мобильное меню */}
      {open && (
        <div className="lg:hidden fixed inset-0 top-[57px] z-40 flex flex-col bg-ink">
          <nav className="flex-1 flex flex-col justify-center px-6 gap-2" aria-label="Мобильная навигация">
            {NAV.map((n, i) => (
              <NavLink
                key={n.to}
                to={n.to}
                end={n.to === "/"}
                className={({ isActive }) =>
                  `flex items-baseline gap-4 border-b border-line py-4 font-display text-2xl font-bold uppercase text-fog ${
                    isActive ? "text-ember" : ""
                  }`
                }
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <span className="font-mono text-xs text-ember">[{n.code}]</span>
                {n.label}
              </NavLink>
            ))}
            <a
              href={TG_MAIN}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ember mt-6 justify-center"
            >
              <TelegramIcon className="w-4 h-4" /> Написать в Telegram
            </a>
          </nav>
          <div className="flex justify-center gap-5 border-t border-line py-5">
            {SOCIALS.filter((s) => s.id !== "tg-dm").map((s) => (
              <a
                key={s.id}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="text-smoke transition-colors hover:text-ember"
              >
                {socialIcon(s.id, "w-5 h-5")}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

/* ================= футер ================= */

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-panel">
      <div className="overflow-hidden border-b border-line px-4 pt-8 pb-2 select-none" aria-hidden="true">
        <p className="text-outline font-display font-black uppercase leading-none text-[clamp(3.4rem,14vw,12rem)] whitespace-nowrap text-center">
          SVN—LAB
        </p>
      </div>

      <div className="grid gap-10 px-4 md:px-6 py-12 md:grid-cols-12 max-w-[1400px] mx-auto">
        <div className="md:col-span-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember mb-4">[ ЛАБОРАТОРИЯ ]</p>
          <p className="text-smoke text-sm leading-relaxed max-w-xs">
            Кастомные компьютерные корпуса ручной работы. Каждый проект — единственный экземпляр, тираж 1/1.
          </p>
          <a href={`mailto:${EMAIL}`} className="mt-5 inline-flex items-center gap-2 font-mono text-sm text-fog hover:text-volt transition-colors">
            <MailIcon className="w-4 h-4" /> {EMAIL}
          </a>
        </div>

        <div className="md:col-span-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke mb-4">[ Разделы ]</p>
          <ul className="space-y-2.5">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="nav-link">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke mb-4">[ Сигналы ]</p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            {SOCIALS.map((s) => (
              <li key={s.id}>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 border-b border-line py-2.5 transition-colors hover:border-ember"
                >
                  <span className="text-smoke transition-colors group-hover:text-ember">{socialIcon(s.id, "w-4 h-4")}</span>
                  <span className="text-sm text-fog/80">{s.label}</span>
                  <span className="ml-auto font-mono text-[10px] text-smoke group-hover:text-ember transition-colors">
                    {s.handle}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line px-4 md:px-6 py-4 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke">
        <span>© 2024—2026 SVN-LAB · svn-lab.ru</span>
        <span className="hidden md:inline">сделано в лаборатории · тираж 1/1</span>
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
          className="flex items-center gap-2 transition-colors hover:text-ember"
        >
          Наверх <span aria-hidden>↑</span>
        </button>
      </div>
    </footer>
  );
}
