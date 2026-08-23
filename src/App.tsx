import { useEffect } from "react";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { Footer, GridCanvas, Header } from "./components/chrome";
import { GhostButton } from "./components/bits";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import ProjectPage from "./pages/Project";
import Process from "./pages/Process";
import Order from "./pages/Order";

function ScrollAndTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    const titles: Record<string, string> = {
      "/": "SVN-LAB — Лаборатория кастомных корпусов | svn-lab.ru",
      "/portfolio": "Портфолио кастомных корпусов — SVN-LAB | svn-lab.ru",
      "/process": "Процесс: 5 этапов кастомизации — SVN-LAB | svn-lab.ru",
      "/order": "Заказать кастомный корпус — SVN-LAB | svn-lab.ru",
    };
    if (titles[pathname]) document.title = titles[pathname];
  }, [pathname]);

  return null;
}

function NotFound() {
  return (
    <section className="mx-auto max-w-[1400px] px-4 py-32 text-center md:px-6">
      <p className="font-mono text-xs uppercase tracking-[0.24em] text-ember">[ ERR.404 ]</p>
      <h1 className="mt-4 font-display text-5xl font-black uppercase text-fog">Страница потеряна</h1>
      <p className="mt-3 text-smoke">Такого раздела в лаборатории нет. Вернёмся к корпусам?</p>
      <div className="mt-8 flex justify-center">
        <GhostButton to="/">На главную</GhostButton>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <HashRouter>
      <ScrollAndTitle />
      <div className="relative min-h-screen bg-ink text-fog">
        <GridCanvas />
        <div className="noise-layer" aria-hidden="true" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/portfolio/:slug" element={<ProjectPage />} />
              <Route path="/process" element={<Process />} />
              <Route path="/order" element={<Order />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
    </HashRouter>
  );
}
