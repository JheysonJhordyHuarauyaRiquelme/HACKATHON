import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Bell, Tractor, CalendarDays, Headset, Sprout } from 'lucide-react';

export const Layout = () => {
  const location = useLocation();

  return (
    <div className="bg-surface font-sans text-on-surface flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] leading-[14px] font-bold tracking-widest text-primary uppercase truncate">AgroPlan Perú</span>
              <h1 className="text-[18px] leading-[24px] font-semibold text-on-surface truncate">Planificador</h1>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button aria-label="Notificaciones" className="w-11 h-11 flex items-center justify-center rounded-full text-on-surface-variant hover:text-on-surface transition-colors" type="button">
              <Bell size={24} />
            </button>
            <div className="p-0.5 rounded-full bg-primary/10">
              <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">A</div>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col relative w-full pt-16 pb-24 bg-surface px-4">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 w-full z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(10,92,54,0.08)]">
        <div className="flex justify-around items-center h-20 px-1">
          <Link to="/" className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 transition-colors ${location.pathname === '/' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
            <Sprout size={24} />
            <span className="text-[10px] leading-[14px] font-bold mt-0.5">Planificador</span>
          </Link>
          <Link to="/tablero" className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 transition-colors ${location.pathname === '/tablero' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
            <Tractor size={24} />
            <span className="text-[10px] leading-[14px] font-bold mt-0.5">Mi Tablero</span>
          </Link>
          <Link to="/liquidacion" className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 transition-colors ${location.pathname === '/liquidacion' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
            <CalendarDays size={24} />
            <span className="text-[10px] leading-[14px] font-bold mt-0.5">Liquidación</span>
          </Link>
          <Link to="#" className="flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 text-on-surface-variant transition-colors">
            <Headset size={24} />
            <span className="text-[10px] leading-[14px] font-bold mt-0.5">Soporte</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
