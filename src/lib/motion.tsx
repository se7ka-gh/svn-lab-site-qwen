import {
  createElement,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

/* ---------------- scroll reveal ---------------- */

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  dir?: "up" | "left" | "right";
  id?: string;
}

export function Reveal({ children, as = "div", className = "", delay = 0, dir = "up", id }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOn(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setOn(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const dirClass = dir === "left" ? "rv-left" : dir === "right" ? "rv-right" : "";

  return createElement(
    as,
    {
      ref,
      id,
      className: `rv ${dirClass} ${on ? "rv-on" : ""} ${className}`,
      style: { ["--rv-delay" as string]: `${delay}ms` },
    },
    children,
  );
}

/* ---------------- scramble / decode text ---------------- */

const GLYPHS = "█▓▒░<>/\\#%&@$*+=10X";

interface ScrambleProps {
  text: string;
  className?: string;
  as?: ElementType;
  speed?: number;
  delay?: number;
  play?: boolean;
}

export function Scramble({ text, className = "", as = "span", speed = 28, delay = 0, play = true }: ScrambleProps) {
  const [out, setOut] = useState(text);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    if (!play) {
      setOut(text);
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let tick = 0;
    const total = text.length;
    const start = () => {
      const step = () => {
        tick += 1;
        const resolved = Math.floor(tick / 2.2);
        let s = "";
        for (let i = 0; i < total; i++) {
          const ch = text[i];
          if (ch === " " || ch === "—" || ch === ":") {
            s += ch;
          } else if (i < resolved) {
            s += ch;
          } else {
            s += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setOut(s);
        if (resolved < total) {
          frame.current = requestAnimationFrame(step);
        } else {
          setOut(text);
        }
      };
      frame.current = requestAnimationFrame(step);
    };
    const t = window.setTimeout(start, delay);
    return () => {
      window.clearTimeout(t);
      if (frame.current) cancelAnimationFrame(frame.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, play]);

  return createElement(as, { className, "aria-label": text }, out);
}

/* ---------------- typewriter-ish status line ---------------- */

export function Blink({ children }: { children: ReactNode }) {
  return <span className="blink">{children}</span>;
}

/* ---------------- animated counter ---------------- */

export function useInView<T extends HTMLElement>(threshold = 0.3): [React.RefObject<T>, boolean] {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

export function CountUp({ to, className = "", suffix = "" }: { to: number; className?: string; suffix?: string }) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const reduced = useReducedMotion();
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setVal(to);
      return;
    }
    let raf = 0;
    const t0 = performance.now();
    const dur = 1100;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - k, 3);
      setVal(Math.round(to * eased));
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, reduced]);

  const memo = useMemo(() => String(val), [val]);
  return (
    <span ref={ref} className={className}>
      {memo}
      {suffix}
    </span>
  );
}
