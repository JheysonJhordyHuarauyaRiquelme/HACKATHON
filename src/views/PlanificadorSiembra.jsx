import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgroContext } from '../context/AgroContext';
import { Brain, Sprout, TriangleAlert, CalendarPlus, Bookmark, FileText, Crop, Coins, Lightbulb } from 'lucide-react';

export const PlanificadorSiembra = () => {
  const navigate = useNavigate();
  const { datosCultivos, campanaActual, actualizarCampanaActual } = useContext(AgroContext);
  
  const [presupuesto, setPresupuesto] = useState(150);
  const [cultivo, setCultivo] = useState('cacao');
  const datosCultivo = datosCultivos[cultivo];
  
  const [costoUnitarioUser, setCostoUnitarioUser] = useState(datosCultivo.costoUnitario);

  useEffect(() => {
    setCostoUnitarioUser(datosCultivos[cultivo].costoUnitario);
  }, [cultivo, datosCultivos]);

  // Calculate dynamic fields
  const currentDist = datosCultivo.distSurco; // Simplified: assuming square or triangle
  const densityPerHa = datosCultivo.densidadOptima;
  
  const plantonesComprables = Math.floor(presupuesto / (costoUnitarioUser || 1));
  const hectareasCubiertas = plantonesComprables / densityPerHa;

  const renderGrafico = () => {
    if (datosCultivo.forma === 'Triángulo' || datosCultivo.forma === 'Tresbolillo') {
      return (
        <svg className="w-full h-full" fill="none" viewBox="0 0 260 110" xmlns="http://www.w3.org/2000/svg">
          <line stroke="#216b43" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" x1="50" x2="130" y1="85" y2="25"></line>
          <line stroke="#216b43" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" x1="130" x2="210" y1="25" y2="85"></line>
          <line stroke="#216b43" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" x1="50" x2="210" y1="85" y2="85"></line>
          <g transform="translate(50, 85)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <g transform="translate(130, 25)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <g transform="translate(210, 85)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <rect fill="#0a5c36" height="18" rx="9" width="38" x="72" y="44"></rect>
          <text fill="#ffffff" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle" x="91" y="57">{currentDist.toFixed(1)}m</text>
          <rect fill="#0a5c36" height="18" rx="9" width="38" x="150" y="44"></rect>
          <text fill="#ffffff" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle" x="169" y="57">{currentDist.toFixed(1)}m</text>
          <rect fill="#0a5c36" height="18" rx="9" width="38" x="111" y="76"></rect>
          <text fill="#ffffff" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle" x="130" y="89">{datosCultivo.distPlanta.toFixed(1)}m</text>
        </svg>
      );
    } else if (datosCultivo.forma === 'Cuadrado') {
      return (
        <svg className="w-full h-full" fill="none" viewBox="0 0 260 110" xmlns="http://www.w3.org/2000/svg">
          <line stroke="#216b43" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" x1="90" x2="170" y1="20" y2="20"></line>
          <line stroke="#216b43" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" x1="90" x2="170" y1="90" y2="90"></line>
          <line stroke="#216b43" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" x1="90" x2="90" y1="20" y2="90"></line>
          <line stroke="#216b43" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" x1="170" x2="170" y1="20" y2="90"></line>
          <g transform="translate(90, 20)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <g transform="translate(170, 20)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <g transform="translate(90, 90)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <g transform="translate(170, 90)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <rect fill="#0a5c36" height="18" rx="9" width="38" x="111" y="11"></rect>
          <text fill="#ffffff" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle" x="130" y="24">{datosCultivo.distPlanta.toFixed(1)}m</text>
          <rect fill="#0a5c36" height="18" rx="9" width="38" x="111" y="81"></rect>
          <text fill="#ffffff" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle" x="130" y="94">{datosCultivo.distPlanta.toFixed(1)}m</text>
          <rect fill="#0a5c36" height="18" rx="9" width="38" x="60" y="46"></rect>
          <text fill="#ffffff" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle" x="79" y="59">{currentDist.toFixed(1)}m</text>
        </svg>
      );
    } else {
      // Líneas
      return (
        <svg className="w-full h-full" fill="none" viewBox="0 0 260 110" xmlns="http://www.w3.org/2000/svg">
          <line stroke="#216b43" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" x1="50" x2="130" y1="55" y2="55"></line>
          <line stroke="#216b43" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="2" x1="130" x2="210" y1="55" y2="55"></line>
          <g transform="translate(50, 55)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <g transform="translate(130, 55)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <g transform="translate(210, 55)"><circle fill="#a8f3c1" r="14"></circle><circle fill="#004225" r="6"></circle></g>
          <rect fill="#0a5c36" height="18" rx="9" width="38" x="71" y="36"></rect>
          <text fill="#ffffff" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle" x="90" y="49">{datosCultivo.distPlanta.toFixed(1)}m</text>
          <rect fill="#0a5c36" height="18" rx="9" width="38" x="151" y="36"></rect>
          <text fill="#ffffff" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle" x="170" y="49">{datosCultivo.distPlanta.toFixed(1)}m</text>
        </svg>
      );
    }
  };

  useEffect(() => {
    actualizarCampanaActual({
      area: hectareasCubiertas,
      presupuesto,
      costoUnitarioUser,
      plantonesComprables,
      cultivo,
      distSurco: datosCultivo.distSurco,
      distPlanta: datosCultivo.distPlanta,
      densidadCalculada: densityPerHa,
      costoEstimado: presupuesto
    });
  }, [hectareasCubiertas, presupuesto, costoUnitarioUser, plantonesComprables, cultivo, densityPerHa]);

  const handleSiguiente = () => {
    navigate('/tablero');
  };

  return (
    <div className="flex flex-col w-full gap-4 pb-8">
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-primary/10 text-primary">
          <Brain size={16} />
          <span className="text-[10px] leading-[14px] font-bold tracking-widest uppercase">Optimización Agronómica</span>
        </div>
        <h2 className="text-[28px] leading-[34px] font-bold tracking-tight text-on-surface">Planificador de Siembra</h2>
        <p className="text-[14px] leading-[20px] text-on-surface-variant">
          Calcula la densidad ideal y espaciamiento para maximizar el rendimiento por hectárea sin competencia de nutrientes.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[12px] leading-[16px] font-semibold text-on-surface-variant">Selecciona cultivo principal</span>
        <div className="flex items-center gap-1 overflow-x-auto pb-1" role="radiogroup">
          {Object.entries(datosCultivos).map(([key, datos]) => (
            <button
              key={key}
              onClick={() => setCultivo(key)}
              className={`shrink-0 px-3.5 py-2.5 rounded-full font-semibold text-[14px] flex items-center gap-1.5 shadow-sm transition-all ${cultivo === key ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface'}`}
              type="button"
            >
              <Sprout size={18} />
              <span>{datos.nombre}</span>
            </button>
          ))}
        </div>
        <span className="text-[10px] text-on-surface-variant">Fuente recomendación: {datosCultivo.fuente}</span>
      </div>

      <div className="flex flex-col gap-4 bg-surface-container-lowest rounded-xl p-4 shadow-sm">
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label className="text-[14px] font-semibold text-on-surface" htmlFor="budget-input">Presupuesto disponible</label>
            <span className="text-[10px] font-bold text-secondary uppercase">Soles</span>
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-primary text-[22px] font-bold">
              S/.
            </div>
            <input 
              id="budget-input"
              type="number" 
              min="0" step="10" 
              value={presupuesto}
              onChange={(e) => setPresupuesto(parseFloat(e.target.value) || 0)}
              className="w-full h-13 pl-14 pr-12 py-3 rounded-lg bg-surface-container-low text-on-surface text-[18px] font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" 
            />
            <span className="absolute right-3.5 flex items-center pointer-events-none text-on-surface-variant">
              <Coins size={22} />
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-baseline">
            <label className="text-[14px] font-semibold text-on-surface" htmlFor="unit-cost-input">Costo unitario por plantón/semilla</label>
            <span className="text-[10px] font-bold text-primary uppercase">Soles</span>
          </div>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 flex items-center pointer-events-none text-primary font-bold">
              S/.
            </div>
            <input 
              id="unit-cost-input"
              type="number" 
              min="0.1" step="0.1" 
              value={costoUnitarioUser}
              onChange={(e) => setCostoUnitarioUser(parseFloat(e.target.value) || 0)}
              className="w-full h-13 pl-10 pr-12 py-3 rounded-lg bg-surface-container-low text-on-surface text-[18px] font-semibold focus:outline-none focus:ring-2 focus:ring-primary shadow-inner" 
            />
            <span className="absolute right-3.5 text-[14px] font-semibold text-on-surface-variant pointer-events-none">/ un</span>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-surface-container-low via-surface-container to-surface-container-high p-4 shadow-md flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-widest text-primary">Marco Recomendado</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary text-white text-[10px] font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#6bff8f] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#6bff8f]"></span>
            </span>
            <span>Cálculo en tiempo real</span>
          </div>
        </div>
        
        <div className="relative flex flex-col items-center justify-center p-4 bg-white/80 rounded-xl shadow-inner backdrop-blur-sm">
          <div className="w-full max-w-[280px] h-32 flex flex-col items-center justify-center relative">
            {renderGrafico()}
          </div>
          <div className="mt-2 text-center">
            <h3 className="text-[18px] leading-[24px] font-semibold text-primary">
              Tu distribución ideal es a {currentDist.toFixed(1)}x{datosCultivo.distPlanta.toFixed(1)} metros en {datosCultivo.forma}
            </h3>
            <p className="text-[12px] text-on-surface-variant mt-1">
              Densidad calculada: {densityPerHa.toLocaleString('es-PE')} plantas/ha
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-1 p-2 rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-1.5 text-secondary">
              <Sprout size={20} />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Puedes comprar</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-semibold text-primary leading-tight">{plantonesComprables.toLocaleString('es-PE')}</span>
              <span className="text-[12px] text-on-surface-variant">plantones</span>
            </div>
          </div>
          <div className="flex flex-col gap-1 p-2 rounded-lg bg-white shadow-sm">
            <div className="flex items-center gap-1.5 text-primary">
              <Crop size={20} />
              <span className="text-[10px] font-bold text-on-surface-variant uppercase">Alcanza para</span>
            </div>
            <div className="flex flex-col">
              <span className="text-[20px] font-semibold text-primary leading-tight">{hectareasCubiertas.toFixed(3)}</span>
              <span className="text-[12px] text-on-surface-variant">hectáreas (ha)</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#e9ffec] border border-[#6bff8f]/30 rounded-xl p-3 text-center shadow-sm -mt-2">
        <p className="text-[13px] font-semibold text-[#00522e]">
          Con tu presupuesto actual (S/. {presupuesto}), puedes cubrir exactamente <span className="font-bold">{hectareasCubiertas.toFixed(3)} hectáreas</span> de {datosCultivo.nombre}.
        </p>
      </div>

      <div className="flex items-start gap-2 p-4 rounded-xl bg-[#cce5ff]/30 text-[#001d31] shadow-sm">
        <div className="flex p-2 rounded-full bg-[#cce5ff] shrink-0 text-[#003c5e]">
          <TriangleAlert size={22} />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <p className="text-[14px] font-semibold text-[#003c5e] leading-snug">
            Sembrar a esta distancia exacta garantiza que las plantas no compitan por luz, asegurando el 100% de tu rendimiento potencial.
          </p>
          <p className="text-[12px] text-[#004b73] flex items-center gap-1 mt-0.5">
            <Lightbulb size={16} className="text-[#003c5e]" />
            <span>Evita sombreamiento mutuo y optimiza el flujo.</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-1">
        <button 
          onClick={handleSiguiente}
          className="w-full h-14 rounded-lg bg-primary hover:bg-primary-container text-white text-[18px] font-semibold flex items-center justify-center gap-2 shadow-md transition-all" 
          type="button"
        >
          <span>Generar mi Calendario de Cultivo</span>
          <CalendarPlus size={22} />
        </button>
        <div className="grid grid-cols-2 gap-1">
          <button className="h-11 rounded-lg bg-surface-container text-primary text-[12px] font-semibold flex items-center justify-center gap-1 transition-colors" type="button">
            <Bookmark size={18} />
            <span>Guardar cálculo</span>
          </button>
          <button className="h-11 rounded-lg bg-surface-container text-primary text-[12px] font-semibold flex items-center justify-center gap-1 transition-colors" type="button">
            <FileText size={18} />
            <span>Ficha técnica</span>
          </button>
        </div>
      </div>
    </div>
  );
};
