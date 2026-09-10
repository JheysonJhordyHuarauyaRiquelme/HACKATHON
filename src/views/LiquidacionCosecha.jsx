import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgroContext } from '../context/AgroContext';
import { db } from '../services/db';
import { HandCoins, Scale, TrendingDown, CheckCircle, Save } from 'lucide-react';

export const LiquidacionCosecha = () => {
  const navigate = useNavigate();
  const { campanaActual, reiniciarCampanaActual, datosCultivos, setCampanas } = useContext(AgroContext);
  
  const [rendimientoReal, setRendimientoReal] = useState('');
  const [guardando, setGuardando] = useState(false);

  const cultivoInfo = campanaActual.cultivo ? datosCultivos[campanaActual.cultivo] : datosCultivos['cacao'];
  
  // Cálculos financieros
  const precioUnitario = cultivoInfo.precioMercado || 3.0;
  const ingresoBruto = (parseFloat(rendimientoReal) || 0) * precioUnitario;
  
  const costoTotalEtapas = campanaActual.etapas_nutricion_completadas * 250; // Asumiendo 250 por etapa aplicada
  const egresos = campanaActual.costoEstimado + costoTotalEtapas;
  
  const gananciaNeta = ingresoBruto - egresos;

  // Cálculo del "Dinero dejado en la mesa"
  const rendimientoOptimo = 1000 * (campanaActual.area || 1); // Simplificación: 1000 kg/ha óptimo
  const penalidadDensidad = Math.abs(campanaActual.densidadCalculada - cultivoInfo.densidadOptima) * 0.1; 
  const etapasPerdidas = (cultivoInfo.etapasTotales || 3) - (campanaActual.etapas_nutricion_completadas || 0);
  const penalidadNutricion = etapasPerdidas * 1200; // 1200 de retorno perdido por etapa saltada

  const dineroPerdido = (penalidadDensidad * precioUnitario) + penalidadNutricion;

  const handleCerrarCampana = async () => {
    if (!rendimientoReal) {
      alert('Por favor, ingresa el rendimiento real cosechado.');
      return;
    }
    
    setGuardando(true);
    const nueva = await db.insertarCampana({
      parcela_id: 'p1', // Harcoded to El Naranjo for now
      cultivo: campanaActual.cultivo || 'cacao',
      area: campanaActual.area || 1,
      anio: new Date().getFullYear(),
      densidad_planeada: campanaActual.densidadCalculada,
      etapas_nutricion_completadas: campanaActual.etapas_nutricion_completadas,
      rendimiento_real: parseFloat(rendimientoReal),
      ganancia_neta: gananciaNeta,
      dinero_perdido: dineroPerdido
    });
    
    const c = await db.obtenerCampanas();
    setCampanas(c);
    
    reiniciarCampanaActual();
    setGuardando(false);
    navigate('/');
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-[28px] leading-[34px] font-bold tracking-tight text-on-surface">Liquidación de Cosecha</h2>
        <p className="text-[14px] leading-[20px] text-on-surface-variant">
          Ingresa el rendimiento final para calcular tu rentabilidad y evaluar el impacto de tus decisiones agronómicas.
        </p>
      </div>

      <div className="flex flex-col gap-1 bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant/30">
        <label className="text-[14px] font-semibold text-on-surface" htmlFor="rendimiento-input">Rendimiento Cosechado Real</label>
        <div className="relative flex items-center mt-2">
          <div className="absolute left-3.5 flex items-center pointer-events-none text-primary">
            <Scale size={20} />
          </div>
          <input 
            id="rendimiento-input"
            type="text" 
            inputMode="decimal"
            placeholder="Ej: 850"
            value={rendimientoReal}
            onChange={(e) => setRendimientoReal(e.target.value)}
            className="w-full h-13 pl-12 pr-16 py-3 rounded-lg bg-surface-container-low text-on-surface text-[18px] font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" 
          />
          <span className="absolute right-3.5 text-[14px] font-semibold text-on-surface-variant pointer-events-none">kg</span>
        </div>
      </div>

      <div className="bg-primary rounded-xl p-4 shadow-md text-white flex flex-col gap-2">
        <h3 className="text-[14px] font-semibold uppercase tracking-wider text-primary-fixed">Balance Final</h3>
        <div className="flex justify-between items-center py-2 border-b border-primary-container">
          <span className="text-[14px]">Ingresos por venta</span>
          <span className="text-[16px] font-bold">S/. {ingresoBruto.toLocaleString('es-PE')}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-primary-container">
          <span className="text-[14px]">Egresos (Semillas + Abonos)</span>
          <span className="text-[16px] font-bold text-[#ffdad6]">- S/. {egresos.toLocaleString('es-PE')}</span>
        </div>
        <div className="flex justify-between items-center pt-2">
          <span className="text-[16px] font-bold">Ganancia Neta</span>
          <span className="text-[24px] font-bold text-[#6bff8f]">S/. {gananciaNeta.toLocaleString('es-PE')}</span>
        </div>
      </div>

      <div className="bg-[#ffdad6]/40 border border-error/20 rounded-xl p-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-error">
          <TrendingDown size={24} />
          <h3 className="text-[16px] font-bold">Dinero Dejado en la Mesa</h3>
        </div>
        <p className="text-[12px] text-on-surface-variant">
          Esta es la proyección de dinero que no ingresó debido a desviaciones técnicas y nutricionales.
        </p>
        <div className="flex flex-col gap-2 mt-2">
          <div className="flex justify-between items-center bg-white/50 p-2 rounded">
            <span className="text-[12px] font-semibold text-[#93000a]">Desviación de densidad</span>
            <span className="text-[14px] font-bold text-error">S/. {Math.round(penalidadDensidad * precioUnitario).toLocaleString('es-PE')}</span>
          </div>
          <div className="flex justify-between items-center bg-white/50 p-2 rounded">
            <span className="text-[12px] font-semibold text-[#93000a]">Etapas de nutrición saltadas ({etapasPerdidas})</span>
            <span className="text-[14px] font-bold text-error">S/. {penalidadNutricion.toLocaleString('es-PE')}</span>
          </div>
        </div>
        <div className="flex justify-between items-center pt-2 border-t border-error/20 mt-2">
          <span className="text-[14px] font-bold text-[#93000a]">Total Pérdida Evitable</span>
          <span className="text-[18px] font-bold text-error">S/. {Math.round(dineroPerdido).toLocaleString('es-PE')}</span>
        </div>
      </div>

      <button 
        onClick={handleCerrarCampana}
        disabled={guardando}
        className="w-full h-14 mt-4 rounded-lg bg-primary active:bg-primary-container text-white text-[18px] font-semibold flex items-center justify-center gap-2 shadow-md transition-all disabled:opacity-50" 
        type="button"
      >
        {guardando ? (
          <span>Guardando...</span>
        ) : (
          <>
            <span>Cerrar Campaña y Guardar</span>
            <Save size={22} />
          </>
        )}
      </button>
    </div>
  );
};
