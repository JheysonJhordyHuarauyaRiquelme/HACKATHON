import React, { useContext } from 'react';
import { AgroContext } from '../context/AgroContext';
import { Archive, TrendingUp, TrendingDown, Calendar, Sprout, HandCoins, AlertTriangle } from 'lucide-react';

export const Historial = () => {
  const { campanas, datosCultivos } = useContext(AgroContext);

  // Calcular totales
  const totalGanancia = campanas.reduce((acc, c) => acc + (c.ganancia_neta || 0), 0);
  const totalPerdida = campanas.reduce((acc, c) => acc + (c.dinero_perdido || 0), 0);

  return (
    <div className="flex flex-col w-full pb-8 gap-4">
      <div className="flex flex-col gap-1 pt-1">
        <h2 className="text-[28px] leading-[34px] font-bold text-on-surface tracking-tight">
          Mis Parcelas y Campañas
        </h2>
        <p className="text-[14px] leading-[20px] text-on-surface-variant">
          Revisa el historial de tus cosechas pasadas y la evolución de tu rentabilidad a lo largo del tiempo.
        </p>
      </div>

      {/* Tarjetas de Resumen Global */}
      <div className="grid grid-cols-2 gap-3 w-full min-w-0">
        <div className="p-3 bg-primary rounded-xl shadow-md text-white flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1">
            <TrendingUp size={16} className="text-[#6bff8f]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-primary-fixed truncate">
              Ganancia Histórica
            </span>
          </div>
          <span className="text-[20px] font-bold text-[#6bff8f] truncate">
            S/. {totalGanancia.toLocaleString('es-PE')}
          </span>
        </div>

        <div className="p-3 bg-[#ffdad6]/40 border border-error/20 rounded-xl shadow-sm flex flex-col gap-1 min-w-0">
          <div className="flex items-center gap-1">
            <TrendingDown size={16} className="text-error" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#93000a] truncate">
              Dejado en la mesa
            </span>
          </div>
          <span className="text-[20px] font-bold text-error truncate">
            S/. {totalPerdida.toLocaleString('es-PE')}
          </span>
        </div>
      </div>

      {/* Lista de Campañas */}
      <div className="flex flex-col gap-3">
        <h3 className="text-[16px] font-bold text-on-surface mt-2">Historial Detallado</h3>
        
        {campanas.length === 0 ? (
          <div className="p-6 bg-surface-container-low rounded-xl border border-outline-variant/30 text-center flex flex-col items-center gap-2">
            <Archive size={32} className="text-on-surface-variant opacity-50" />
            <p className="text-[14px] text-on-surface-variant">
              Aún no tienes campañas registradas. Planifica tu primera siembra y finalízala para verla aquí.
            </p>
          </div>
        ) : (
          [...campanas].reverse().map((campana) => {
            const cultivo = campana.cultivo || 'cacao';
            const datosCultivo = datosCultivos[cultivo];
            const esGanancia = (campana.ganancia_neta || 0) >= 0;

            return (
              <div key={campana.id} className="bg-surface-container-lowest border border-outline-variant/40 p-4 rounded-xl shadow-sm flex flex-col gap-3">
                
                {/* Cabecera de la Tarjeta */}
                <div className="flex items-center justify-between border-b border-outline-variant/20 pb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-lg bg-[#eaf7ee] flex items-center justify-center text-primary">
                      <Sprout size={20} />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[16px] font-bold text-on-surface">Campaña {datosCultivo?.nombre || cultivo}</span>
                      <div className="flex items-center gap-1 text-[12px] text-on-surface-variant">
                        <Calendar size={12} />
                        <span>Año {campana.anio}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex flex-col">
                    <span className="text-[11px] font-bold uppercase text-on-surface-variant">Margen Neto</span>
                    <span className={`text-[18px] font-bold ${esGanancia ? 'text-primary' : 'text-error'}`}>
                      {esGanancia ? '+' : '-'} S/. {Math.abs(campana.ganancia_neta || 0).toLocaleString('es-PE')}
                    </span>
                  </div>
                </div>

                {/* Detalles de Producción */}
                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <div className="flex flex-col gap-0.5 bg-surface-container-low p-2 rounded-lg">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">Área Sembrada</span>
                    <span className="font-bold text-on-surface">{campana.area || 1} ha</span>
                  </div>
                  <div className="flex flex-col gap-0.5 bg-surface-container-low p-2 rounded-lg">
                    <span className="text-[10px] uppercase font-bold text-on-surface-variant">Rendimiento</span>
                    <span className="font-bold text-on-surface">{campana.rendimiento_real || 0} kg</span>
                  </div>
                </div>

                {/* Dinero Perdido (Alerta) */}
                {(campana.dinero_perdido || 0) > 0 && (
                  <div className="mt-1 flex items-start gap-2 bg-[#ffdad6]/20 p-2 rounded-lg border border-error/10">
                    <AlertTriangle size={16} className="text-error shrink-0 mt-0.5" />
                    <p className="text-[11px] text-on-surface-variant leading-tight">
                      Dejaste en la mesa <strong className="text-error">S/. {campana.dinero_perdido.toLocaleString('es-PE')}</strong> por no completar etapas nutricionales o fallar en la densidad.
                    </p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
