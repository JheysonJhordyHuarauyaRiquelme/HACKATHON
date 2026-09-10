import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Bell, Tractor, CalendarDays, Headset, Sprout } from 'lucide-react';

export const Layout = () => {
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="bg-surface font-sans text-on-surface flex flex-col min-h-screen">
      <header className="fixed top-0 w-full z-50 bg-surface/85 backdrop-blur-xl pt-safe shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-16 px-4 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <h1 className="text-[22px] font-black tracking-widest text-primary uppercase truncate">YACHAY</h1>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Link to="/historial" aria-label="Historial de Parcelas" className="w-10 h-10 flex items-center justify-center rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>
            </Link>
            <div className="relative">
              <button 
                aria-label="Notificaciones" 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${showNotifications ? 'bg-primary/10 text-primary' : 'text-on-surface-variant hover:text-on-surface'}`} 
                type="button"
              >
                <Bell size={24} />
                {/* Indicador de no leído */}
                <span className="absolute top-2 right-2.5 w-2.5 h-2.5 bg-error rounded-full border-2 border-surface"></span>
              </button>
            </div>
          </div>
        </div>

        {/* Panel de Notificaciones Desplegable */}
        {showNotifications && (
          <>
            <div 
              className="fixed inset-0 z-40 bg-black/5" 
              onClick={() => setShowNotifications(false)}
            />
            <div className="absolute top-16 right-4 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-2xl shadow-xl border border-outline-variant/20 overflow-hidden z-50">
              <div className="p-3 bg-surface-container-lowest border-b border-outline-variant/20 flex justify-between items-center">
                <span className="font-bold text-[14px] text-on-surface">Alertas YACHAY</span>
                <span className="text-[10px] font-bold text-primary bg-[#eaf7ee] px-2 py-0.5 rounded-full">3 nuevas</span>
              </div>
              <div className="flex flex-col max-h-[300px] overflow-y-auto">
                <div className="p-3 border-b border-outline-variant/10 hover:bg-surface-container-lowest transition-colors flex gap-3">
                  <div className="text-[20px] shrink-0 mt-0.5">🌧️</div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-on-surface">Alerta Climática Localizada</span>
                    <span className="text-[11px] text-on-surface-variant leading-tight">Lluvias intensas programadas para esta tarde en Alto Huallaga. Pospón tu abonado foliar.</span>
                  </div>
                </div>
                <div className="p-3 border-b border-outline-variant/10 hover:bg-surface-container-lowest transition-colors flex gap-3">
                  <div className="text-[20px] shrink-0 mt-0.5">📅</div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-on-surface">Smart Task (Maíz)</span>
                    <span className="text-[11px] text-on-surface-variant leading-tight">Han pasado 20 días desde tu siembra. Es momento óptimo para aplicar tu primer abonado.</span>
                  </div>
                </div>
                <div className="p-3 hover:bg-surface-container-lowest transition-colors flex gap-3">
                  <div className="text-[20px] shrink-0 mt-0.5">📈</div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[12px] font-bold text-on-surface">Alerta de Mercado</span>
                    <span className="text-[11px] text-on-surface-variant leading-tight">El precio del cacao en chacra subió a S/ 13.50 el kg. ¡Buen momento para proyectar ingresos!</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
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
          <Link to="/soporte" className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1 transition-colors ${location.pathname === '/soporte' ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
            <Headset size={24} />
            <span className="text-[10px] leading-[14px] font-bold mt-0.5">Soporte</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
