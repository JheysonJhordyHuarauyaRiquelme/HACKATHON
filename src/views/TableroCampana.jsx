import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgroContext } from '../context/AgroContext';
import { Tractor, Sprout, HandCoins, ShieldCheck, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';

export const TableroCampana = () => {
  const navigate = useNavigate();
  const { campanaActual, actualizarCampanaActual, datosCultivos } = useContext(AgroContext);
  
  const cultivoInfo = campanaActual.cultivo ? datosCultivos[campanaActual.cultivo] : datosCultivos['cacao'];
  const totalEtapas = cultivoInfo.etapasTotales || 3;
  
  const [etapas, setEtapas] = useState(
    Array.from({ length: totalEtapas }).map((_, index) => ({
      id: index + 1,
      nombre: `Etapa Nutricional ${index + 1}`,
      aplicado: null, // null, true, false
      costo: 250, // Costo simulado por etapa
      retorno: 1200 // Retorno asegurado simulado por etapa
    }))
  );

  const etapasCompletadas = etapas.filter(e => e.aplicado === true).length;
  const saludPorcentaje = Math.round((etapasCompletadas / totalEtapas) * 100) || 0;
  
  // Update context when needed
  const handleEtapa = (index, valor) => {
    const nuevasEtapas = [...etapas];
    nuevasEtapas[index].aplicado = valor;
    setEtapas(nuevasEtapas);
    
    const nuevasCompletadas = nuevasEtapas.filter(e => e.aplicado === true).length;
    actualizarCampanaActual({ etapas_nutricion_completadas: nuevasCompletadas });
  };

  const handleCierre = () => {
    navigate('/liquidacion');
  };

  const proyeccionActual = campanaActual.costoEstimado * 3.5 * (saludPorcentaje / 100 || 0.3); // Fórmula simplificada de proyección

  return (
    <div className="flex flex-col w-full gap-4 pb-8">
      <div className="flex flex-col gap-1">
        <h2 className="text-[28px] leading-[34px] font-bold tracking-tight text-on-surface">Mi Tablero de Campaña</h2>
        <p className="text-[14px] leading-[20px] text-on-surface-variant">
          Seguimiento de nutrición para {cultivoInfo.nombre}. Cada etapa aplicada asegura tu rendimiento.
        </p>
      </div>

      <div className="bg-primary rounded-xl p-4 shadow-md text-white flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <span className="text-[14px] font-semibold">Salud de Inversión</span>
          <span className="text-[24px] font-bold">{saludPorcentaje}%</span>
        </div>
        <div className="w-full bg-primary-container rounded-full h-3">
          <div className="bg-[#6bff8f] h-3 rounded-full transition-all duration-500" style={{ width: `${saludPorcentaje}%` }}></div>
        </div>
        <div className="flex justify-between items-end pt-2 border-t border-primary-container">
          <div className="flex flex-col">
            <span className="text-[10px] text-primary-fixed uppercase tracking-wider">Cosecha Proyectada</span>
            <span className="text-[22px] font-bold">S/. {Math.round(proyeccionActual).toLocaleString('es-PE')}</span>
          </div>
          <ShieldCheck size={32} className="text-[#6bff8f]" />
        </div>
      </div>

      <h3 className="text-[18px] font-semibold text-on-surface mt-2">Línea de Tiempo de Nutrición</h3>
      
      <div className="flex flex-col gap-4">
        {etapas.map((etapa, index) => (
          <div key={etapa.id} className="bg-surface-container-lowest rounded-xl p-4 shadow-sm border border-outline-variant/30 flex flex-col gap-3 relative overflow-hidden">
            {etapa.aplicado === true && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-[#22c55e]/10 rounded-bl-full flex items-start justify-end p-2">
                 <CheckCircle2 size={20} className="text-[#22c55e]" />
              </div>
            )}
            {etapa.aplicado === false && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-error/10 rounded-bl-full flex items-start justify-end p-2">
                 <XCircle size={20} className="text-error" />
              </div>
            )}
            
            <div className="flex items-center gap-2">
              <div className={`p-2 rounded-lg ${etapa.aplicado === true ? 'bg-[#22c55e] text-white' : etapa.aplicado === false ? 'bg-error text-white' : 'bg-surface-container text-on-surface'}`}>
                <Sprout size={20} />
              </div>
              <h4 className="text-[16px] font-bold text-on-surface">{etapa.nombre}</h4>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[12px]">
              <div className="bg-surface-container-low p-2 rounded flex flex-col">
                <span className="text-on-surface-variant">Inversión (Costo)</span>
                <span className="font-bold text-on-surface">S/. {etapa.costo}</span>
              </div>
              <div className="bg-[#e9ffec] p-2 rounded flex flex-col border border-[#6bff8f]/30">
                <span className="text-[#00522e]">Retorno Asegurado</span>
                <span className="font-bold text-primary">S/. {etapa.retorno}</span>
              </div>
            </div>

            {etapa.aplicado === null ? (
              <div className="grid grid-cols-2 gap-2 mt-2">
                <button 
                  onClick={() => handleEtapa(index, true)}
                  className="bg-primary text-white py-2 rounded-lg text-[12px] font-bold flex justify-center items-center gap-1 active:scale-95 transition-transform"
                >
                  <CheckCircle2 size={16} /> Aplicar
                </button>
                <button 
                  onClick={() => handleEtapa(index, false)}
                  className="bg-surface-container-highest text-on-surface py-2 rounded-lg text-[12px] font-bold flex justify-center items-center gap-1 active:scale-95 transition-transform"
                >
                  <XCircle size={16} /> No aplicar
                </button>
              </div>
            ) : (
              <div className="mt-2 flex items-center justify-between">
                <span className={`text-[12px] font-bold ${etapa.aplicado ? 'text-[#22c55e]' : 'text-error'}`}>
                  {etapa.aplicado ? 'Nutrición aplicada. Retorno asegurado.' : 'No aplicado. Pérdida proyectada.'}
                </span>
                <button onClick={() => handleEtapa(index, null)} className="text-[10px] text-on-surface-variant underline">Deshacer</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-surface-container-highest">
        <button 
          onClick={handleCierre}
          className="w-full h-14 rounded-lg bg-surface-container-high text-on-surface text-[18px] font-semibold flex items-center justify-center gap-2 shadow-sm transition-all hover:bg-surface-container-highest" 
          type="button"
        >
          <span>Ir a Liquidación de Cosecha</span>
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};
