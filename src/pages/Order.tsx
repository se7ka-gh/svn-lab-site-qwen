import { useEffect, useMemo, useState } from "react";
import { EMAIL, SOCIALS, TG_CHANNEL, TG_MAIN } from "../data/projects";
import { Reveal, Scramble } from "../lib/motion";
import { Corners } from "../components/bits";
import { ArrowIcon, MailIcon, TelegramIcon, socialIcon } from "../components/icons";

const BUDGETS = ["до 10 000 ₽", "10 000 — 20 000 ₽", "20 000 — 30 000 ₽", "30 000 ₽ +"];

interface FormState {
  name: string;
  telegram: string;
  email: string;
  idea: string;
  budget: string;
}

const EMPTY: FormState = { name: "", telegram: "", email: "", idea: "", budget: BUDGETS[1] };

export default function Order() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    document.title = "Заказать корпус — SVN-LAB | svn-lab.ru";
    return () => {
      document.title = "SVN-LAB — Лаборатория кастомных корпусов | svn-lab.ru";
    };
  }, []);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const validate = (): boolean => {
    const er: Partial<Record<keyof FormState, string>> = {};
    const tg = form.telegram.trim();
    if (!tg) er.telegram = "Telegram обязателен — это основной канал связи";
    else if (!/^@?[a-zA-Z0-9_]{4,}$/.test(tg.replace(/^@/, ""))) er.telegram = "Похоже на некорректный ник: пример @username";
    if (form.idea.trim().length < 10) er.idea = "Расскажите чуть подробнее — хотя бы 10 символов";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const message = useMemo(() => {
    return [
      "Заявка с сайта svn-lab.ru",
      `Имя: ${form.name.trim() || "—"}`,
      `Telegram: ${form.telegram.trim()}`,
      form.email.trim() ? `Email: ${form.email.trim()}` : "",
      `Бюджет: ${form.budget}`,
      "",
      "Идея:",
      form.idea.trim(),
    ]
      .filter((l) => l !== "")
      .join("\n");
  }, [form]);

  const shareUrl = useMemo(
    () => `https://t.me/share/url?url=${encodeURIComponent("https://svn-lab.ru")}&text=${encodeURIComponent(message)}`,
    [message],
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
    setCopied(false);
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* буфер обмена недоступен */
    }
  };

  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div className="grid-fade absolute inset-0" aria-hidden="true" />
        <div className="relative mx-auto max-w-[1400px] px-4 pt-14 pb-10 md:px-6 md:pt-20">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-smoke">
              <span className="text-ember">[ 04 ]</span> Индивидуальные проекты
            </p>
          </Reveal>
          <h1 className="mt-5 font-display font-black uppercase leading-[0.92] text-fog">
            <Scramble text="ЗАКАЗАТЬ" className="block text-[clamp(2.6rem,9vw,6.5rem)]" delay={100} />
          </h1>
          <Reveal delay={200}>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <p className="max-w-xl text-smoke leading-relaxed">
                Заполните бриф — вернёмся с эскизом, сметой и местом в очереди. Самый быстрый способ —
                написать напрямую в Telegram, бриф подойдёт для сложных идей.
              </p>
              <span className="inline-flex items-center gap-2 border border-ember/50 bg-ember/10 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-ember">
                <span className="h-1.5 w-1.5 animate-pulse-dot bg-ember" />
                очередь: 2 слота
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] gap-10 px-4 py-14 md:px-6 md:py-16 lg:grid-cols-12">
        {/* форма / успех */}
        <div className="lg:col-span-7">
          {!sent ? (
            <Reveal>
              <form onSubmit={onSubmit} noValidate className="relative border border-line bg-panel p-6 md:p-9">
                <Corners color="text-ember" />
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">[ Бриф на корпус ]</p>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase text-fog">Что рисуем?</h2>

                <div className="mt-8 grid gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Имя
                    </label>
                    <input
                      id="f-name"
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      placeholder="Как к вам обращаться"
                      className="field"
                      autoComplete="name"
                    />
                  </div>
                  <div>
                    <label htmlFor="f-tg" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Telegram <span className="text-ember">*</span>
                    </label>
                    <input
                      id="f-tg"
                      type="text"
                      value={form.telegram}
                      onChange={set("telegram")}
                      placeholder="@username"
                      className={`field ${errors.telegram ? "err" : ""}`}
                      aria-invalid={!!errors.telegram}
                      aria-describedby={errors.telegram ? "e-tg" : undefined}
                    />
                    {errors.telegram && (
                      <p id="e-tg" className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ember">
                        // {errors.telegram}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="f-email" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Email <span className="text-line2">(опционально)</span>
                    </label>
                    <input
                      id="f-email"
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      placeholder="you@mail.ru"
                      className="field"
                      autoComplete="email"
                    />
                  </div>
                  <div>
                    <label htmlFor="f-budget" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Бюджет
                    </label>
                    <select id="f-budget" value={form.budget} onChange={set("budget")} className="field cursor-pointer">
                      {BUDGETS.map((b) => (
                        <option key={b} value={b} className="bg-carbon">
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="f-idea" className="mb-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-smoke">
                      Описание идеи <span className="text-ember">*</span>
                    </label>
                    <textarea
                      id="f-idea"
                      rows={6}
                      value={form.idea}
                      onChange={set("idea")}
                      placeholder="Персонаж, игра, фильм, стиль… Чем подробнее — тем точнее эскиз. Можно приложить референсы позже в Telegram."
                      className={`field resize-y ${errors.idea ? "err" : ""}`}
                      aria-invalid={!!errors.idea}
                      aria-describedby={errors.idea ? "e-idea" : undefined}
                    />
                    {errors.idea && (
                      <p id="e-idea" className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.08em] text-ember">
                        // {errors.idea}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button type="submit" className="btn btn-ember">
                    Сформировать заявку <ArrowIcon className="btn-arrow w-4 h-4" />
                  </button>
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-smoke">
                    без спама — заявка уходит напрямую в лабораторию
                  </p>
                </div>
              </form>
            </Reveal>
          ) : (
            <Reveal>
              <div className="relative border border-volt/40 bg-panel p-6 md:p-9">
                <Corners color="text-volt" />
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-volt">[ Заявка сформирована ]</p>
                <h2 className="mt-3 font-display text-2xl md:text-3xl font-bold uppercase text-fog">
                  Остался один шаг — отправить
                </h2>
                <p className="mt-3 max-w-xl text-sm text-smoke leading-relaxed">
                  Сайт статический, поэтому заявка собрана в готовое сообщение: отправьте его в Telegram
                  одним нажатием — лаборатория получит всё сразу.
                </p>

                <pre className="mt-6 max-h-64 overflow-auto whitespace-pre-wrap border border-line bg-ink p-5 font-mono text-xs leading-relaxed text-fog/90">
                  {message}
                </pre>

                <div className="mt-7 flex flex-wrap gap-4">
                  <a href={shareUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ember">
                    <TelegramIcon className="w-4 h-4" /> Отправить в Telegram
                  </a>
                  <button onClick={copy} className="btn btn-volt">
                    {copied ? "✓ Скопировано" : "Скопировать текст"}
                  </button>
                  <a href={TG_MAIN} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    Открыть чат @se7ka_svn
                  </a>
                </div>

                <button
                  onClick={() => {
                    setSent(false);
                    setForm(EMPTY);
                  }}
                  className="mt-7 font-mono text-[10px] uppercase tracking-[0.18em] text-smoke underline-offset-4 transition-colors hover:text-ember hover:underline"
                >
                  ← заполнить новый бриф
                </button>
              </div>
            </Reveal>
          )}
        </div>

        {/* альтернативные контакты */}
        <aside className="lg:col-span-5">
          <div className="space-y-5 lg:sticky lg:top-32">
            <Reveal dir="right">
              <div className="relative border border-line bg-panel p-6 md:p-7">
                <Corners color="text-volt" />
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">[ Быстрая связь ]</p>
                <div className="mt-5 flex flex-col gap-3">
                  <a href={TG_MAIN} target="_blank" rel="noopener noreferrer" className="btn btn-ember justify-center">
                    <TelegramIcon className="w-4 h-4" /> @se7ka_svn — прямой чат
                  </a>
                  <a href={TG_CHANNEL} target="_blank" rel="noopener noreferrer" className="btn btn-volt justify-center">
                    <TelegramIcon className="w-4 h-4" /> @svnintg — канал лаборатории
                  </a>
                  <a href={`mailto:${EMAIL}`} className="btn btn-ghost justify-center">
                    <MailIcon className="w-4 h-4" /> {EMAIL}
                  </a>
                </div>
                <p className="mt-5 border-t border-line pt-4 font-mono text-[10px] uppercase tracking-[0.14em] leading-loose text-smoke">
                  ответ: в течение дня · мск<br />
                  эскиз и смета: бесплатно до брони слота
                </p>
              </div>
            </Reveal>

            <Reveal dir="right" delay={100}>
              <div className="border border-line p-6 md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">[ Как это работает ]</p>
                <ol className="mt-5 space-y-4">
                  {[
                    ["01", "Бриф или сообщение", "описываете идею, базу и бюджет"],
                    ["02", "Эскиз и смета", "черновик композиции + точная цена"],
                    ["03", "Бронь слота", "предоплата 30%, корпус встаёт в очередь"],
                    ["04", "Процесс онлайн", "фото этапов в канале, правки до росписи"],
                  ].map(([n, t, d]) => (
                    <li key={n} className="flex gap-4">
                      <span className="font-display text-lg font-black text-ember">{n}</span>
                      <span>
                        <span className="block font-semibold text-fog">{t}</span>
                        <span className="text-sm text-smoke">{d}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal dir="right" delay={180}>
              <div className="border border-line p-6 md:p-7">
                <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-smoke">[ Лаборатория в сети ]</p>
                <ul className="mt-4 grid grid-cols-2 gap-x-4">
                  {SOCIALS.map((s) => (
                    <li key={s.id}>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2.5 border-b border-line py-2.5 text-smoke transition-colors hover:text-fog hover:border-ember"
                      >
                        <span className="transition-colors group-hover:text-ember">{socialIcon(s.id, "w-4 h-4")}</span>
                        <span className="truncate font-mono text-[11px]">{s.handle}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </aside>
      </section>
    </>
  );
}
