import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgroContext } from '../context/AgroContext';
import { 
  Brain, 
  Sprout, 
  TriangleAlert, 
  CalendarPlus, 
  FileText, 
  Crop, 
  Coins, 
  Lightbulb,
  CheckCircle2,
  Grid,
  Ruler,
  Tag,
  Plus,
  Minus,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Info,
  Check
} from 'lucide-react';

export const PlanificadorSiembra = () => {
  const navigate = useNavigate();
  const { datosCultivos, campanaActual, actualizarCampanaActual } = useContext(AgroContext);
  
  // State for Budget Logic
  const [presupuesto, setPresupuesto] = useState(150);
  const [cultivo, setCultivo] = useState('cacao');
  const datosCultivo = datosCultivos[cultivo] || datosCultivos['cacao'];
  const [showFichaTecnica, setShowFichaTecnica] = useState(false);
  
  const [costoUnitarioUser, setCostoUnitarioUser] = useState(datosCultivo.costoUnitario);

  // Dynamic Varieties per Crop
  const variedadesPorCultivo = {
    cacao: [
      { id: 'ccn51', nombre: 'CCN-51 (Alta Productividad)' },
      { id: 'ics95', nombre: 'ICS-95 (Resistente a Escoba de Bruja)' },
      { id: 'nacional', nombre: 'Nacional / Criollo Fino de Aroma' },
      { id: 'vrae99', nombre: 'VRAE-99 (Adaptado a Selva)' }
    ],
    cafe: [
      { id: 'catimor', nombre: 'Catimor (Resistente a Roya)' },
      { id: 'caturra', nombre: 'Caturra (Alta Calidad en Taza)' },
      { id: 'geisha', nombre: 'Geisha (Especialidad Premium)' },
      { id: 'typica', nombre: 'Typica / Criollo Tradicional' }
    ],
    maiz: [
      { id: 'marginal28', nombre: 'Marginal 28 (Selva y Costa)' },
      { id: 'dekalb7508', nombre: 'DEKALB 7508 (Híbrido Alto Rendimiento)' },
      { id: 'inia619', nombre: 'INIA 619 Megahíbrido' },
      { id: 'choclo', nombre: 'Maíz Choclo / Cusco' }
    ],
    papa: [
      { id: 'canchan', nombre: 'Canchán (Papa Blanca Comercial)' },
      { id: 'yungay', nombre: 'Yungay (Alta Resistencia)' },
      { id: 'unica', nombre: 'Única (Cosecha Precoz)' },
      { id: 'amarilla', nombre: 'Tumbay / Amarilla Nativa' }
    ]
  };

  const [variedad, setVariedad] = useState(variedadesPorCultivo['cacao'][0].id);
  const [isVariedadOpen, setIsVariedadOpen] = useState(false);

  // Spacing & Density Steppers
  const [plantDist, setPlantDist] = useState(datosCultivo.distPlanta || 2.5);
  const [rowDist, setRowDist] = useState(datosCultivo.distSurco || 3.0);
  const [tabInputMode, setTabInputMode] = useState('spacing'); // 'spacing' | 'quantity'
  const [totalPlantsInput, setTotalPlantsInput] = useState(3332);
  const [viewModeSvg, setViewModeSvg] = useState('comparison'); // 'comparison' | 'recommended'
  const [selectedHectares, setSelectedHectares] = useState(2.5);

  useEffect(() => {
    if (datosCultivos[cultivo]) {
      setCostoUnitarioUser(datosCultivos[cultivo].costoUnitario);
      setPlantDist(datosCultivos[cultivo].distPlanta);
      setRowDist(datosCultivos[cultivo].distSurco);
      if (variedadesPorCultivo[cultivo]) {
        setVariedad(variedadesPorCultivo[cultivo][0].id);
      }
      setIsVariedadOpen(false);
    }
  }, [cultivo, datosCultivos]);

  // Dynamic Budget Calculations
  const numPresupuesto = parseFloat(presupuesto) || 0;
  const numCostoUnitario = parseFloat(costoUnitarioUser) || 0;
  const plantonesComprables = Math.floor(numPresupuesto / (numCostoUnitario > 0 ? numCostoUnitario : 1));
  const densityCalculated = Math.round(10000 / (plantDist * rowDist));
  const densityPerHa = densityCalculated > 0 ? densityCalculated : (datosCultivo.densidadOptima || 1);
  const hectareasCubiertas = plantonesComprables / (densityPerHa || 1);
  const coberturaPorcentaje = Math.min(100, (hectareasCubiertas / (selectedHectares > 0 ? selectedHectares : 1)) * 100);

  // Sync total plants input if spacing changes
  useEffect(() => {
    setTotalPlantsInput(Math.round(densityCalculated * selectedHectares));
  }, [densityCalculated, selectedHectares]);

  // Sync Context whenever calculations change
  useEffect(() => {
    actualizarCampanaActual({
      area: selectedHectares,
      hectareasCubiertas,
      coberturaPorcentaje,
      presupuesto: numPresupuesto,
      costoUnitarioUser: numCostoUnitario,
      plantonesComprables,
      cultivo,
      variedad,
      nombreVariedad: selectedVariedadObj?.nombre || '',
      distSurco: rowDist,
      distPlanta: plantDist,
      densidadCalculada: densityCalculated,
      costoEstimado: plantonesComprables * numCostoUnitario
    });
  }, [selectedHectares, hectareasCubiertas, coberturaPorcentaje, numPresupuesto, numCostoUnitario, plantonesComprables, cultivo, variedad, rowDist, plantDist, densityCalculated]);

  const handleSiguiente = () => {
    navigate('/tablero');
  };

  const selectedVariedadObj = (variedadesPorCultivo[cultivo] || []).find(v => v.id === variedad) || variedadesPorCultivo[cultivo]?.[0];

  return (
    <div className="flex flex-col w-full gap-5 pb-8 max-w-md mx-auto min-w-0 overflow-x-hidden px-0.5">
      {/* 1. ENCABEZADO DE SECCIÓN / INTRODUCCIÓN */}
      <section className="flex flex-col gap-1.5 pt-1 w-full min-w-0">
        <h1 className="text-[24px] sm:text-[26px] leading-[32px] font-bold text-primary tracking-tight">
          Diagnóstico de Terreno
        </h1>
        <p className="text-[13px] sm:text-[14px] leading-[20px] text-on-surface-variant">
          Confirma si tu siembra actual está aprovechando el potencial de tu terreno con base en densidad técnica.
        </p>
      </section>

      {/* 2. SELECTOR DE CULTIVO Y VARIEDAD (REDISEÑADO PERFECTO Y RESPONSIVO) */}
      <section className="flex flex-col gap-3 w-full min-w-0 bg-surface-container-lowest p-3.5 rounded-2xl border border-outline-variant/30 shadow-sm">
        <div className="flex items-center justify-between">
          <label className="text-[11px] font-bold tracking-wider uppercase text-on-surface-variant flex items-center gap-1.5">
            <Sprout size={15} className="text-primary" />
            <span>Cultivo Sembrado</span>
          </label>
        </div>

        {/* Tarjetas de Cultivo 2x2 Elegantes con Imagen Real */}
        <div className="grid grid-cols-2 gap-2.5 w-full min-w-0">
          {Object.entries(datosCultivos).map(([key, datos]) => {
            const isSelected = cultivo === key;
            return (
              <button
                key={key}
                onClick={() => setCultivo(key)}
                type="button"
                className={`relative flex items-center gap-2.5 p-2 rounded-xl border text-left transition-all min-w-0 w-full overflow-hidden ${
                  isSelected 
                    ? 'bg-[#dcfce7] border-[#22c55e] ring-1 ring-[#22c55e] text-primary shadow-sm' 
                    : 'bg-surface-container-low/60 border-outline-variant/30 text-on-surface hover:bg-surface-container-low'
                }`}
              >
                <div className="w-10 h-10 rounded-lg overflow-hidden shrink-0 relative bg-surface-container-high shadow-inner">
                  <img 
                    src={`/crops/${key}.jpg`} 
                    alt={datos.nombre}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className={`text-[13px] font-bold truncate leading-tight ${isSelected ? 'text-primary' : 'text-on-surface'}`}>
                    {datos.nombre}
                  </span>
                  <span className="text-[10px] text-on-surface-variant truncate">
                    {datos.distPlanta}m × {datos.distSurco}m
                  </span>
                </div>
                {isSelected && (
                  <div className="w-5 h-5 rounded-full bg-[#166534] text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Check size={12} strokeWidth={3} />
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Selector de Variedad Personalizado (Custom UI Dropdown) */}
        <div className="flex flex-col gap-1.5 pt-1 w-full min-w-0 relative">
          <label className="text-[11px] font-bold tracking-wider uppercase text-on-surface-variant">
            Variedad Específica
          </label>

          <button
            type="button"
            onClick={() => setIsVariedadOpen(!isVariedadOpen)}
            className="w-full h-11 px-3.5 flex items-center justify-between bg-[#eaf7ee] hover:bg-[#dcfce7] transition-all rounded-xl border border-[#22c55e]/30 text-[13px] font-semibold text-primary shadow-sm active:scale-[0.99] text-left"
          >
            <span className="truncate">{selectedVariedadObj?.nombre}</span>
            <ChevronDown size={18} className={`text-primary font-bold shrink-0 transition-transform duration-200 ${isVariedadOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* Menú Flotante Personalizado */}
          {isVariedadOpen && (
            <>
              {/* Backdrop transparente para cerrar */}
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsVariedadOpen(false)} 
              />
              <div className="absolute top-full left-0 right-0 mt-1 z-50 bg-white rounded-xl border border border-[#22c55e]/30 shadow-xl overflow-hidden py-1 flex flex-col gap-0.5">
                {(variedadesPorCultivo[cultivo] || []).map((v) => {
                  const isSelected = v.id === variedad;
                  return (
                    <button
                      key={v.id}
                      type="button"
                      onClick={() => {
                        setVariedad(v.id);
                        setIsVariedadOpen(false);
                      }}
                      className={`w-full px-3.5 py-2.5 flex items-center justify-between text-left text-[13px] font-medium transition-colors ${
                        isSelected 
                          ? 'bg-[#dcfce7] text-primary font-bold' 
                          : 'text-on-surface hover:bg-surface-container-low'
                      }`}
                    >
                      <span className="truncate">{v.nombre}</span>
                      {isSelected && <Check size={16} className="text-[#166534] shrink-0 ml-2" />}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 3. MANEJO DE PRESUPUESTO (REDISEÑADO SEGÚN PROTOTIPO Y CAPTURA) */}
      <section className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-4 w-full min-w-0">
        <div className="flex items-center justify-between pb-1 border-b border-outline-variant/20">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#dcfce7] flex items-center justify-center text-primary shrink-0">
              <Coins size={20} />
            </div>
            <h2 className="text-[14px] font-bold text-on-surface">Gestión de Presupuesto</h2>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#166534]">Calculadora activa</span>
        </div>

        {/* Inputs de Presupuesto en Soles */}
        <div className="flex flex-col gap-3 w-full min-w-0">
          <div className="flex flex-col gap-1 w-full min-w-0">
            <div className="flex justify-between items-baseline">
              <label className="text-[13px] sm:text-[14px] font-semibold text-on-surface" htmlFor="presupuesto-input">
                Presupuesto disponible
              </label>
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase">SOLES</span>
            </div>
            <div className="relative flex items-center w-full min-w-0">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-primary text-[18px] font-bold">
                S/.
              </div>
              <input 
                id="presupuesto-input"
                type="text"
                inputMode="decimal"
                value={presupuesto}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
                    setPresupuesto(val);
                  }
                }}
                onBlur={() => {
                  if (presupuesto === '' || isNaN(parseFloat(presupuesto))) {
                    setPresupuesto(0);
                  }
                }}
                className="w-full h-12 pl-12 pr-12 rounded-xl bg-[#eaf7ee] text-primary text-[18px] font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-inner border border-[#22c55e]/20"
              />
              <span className="absolute right-3.5 flex items-center pointer-events-none text-primary/70">
                <Coins size={22} />
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full min-w-0">
            <div className="flex justify-between items-baseline">
              <label className="text-[13px] sm:text-[14px] font-semibold text-on-surface" htmlFor="costo-unitario-input">
                Costo unitario por plantón/semilla
              </label>
              <span className="text-[10px] font-bold text-primary tracking-wider uppercase">SOLES</span>
            </div>
            <div className="relative flex items-center w-full min-w-0">
              <div className="absolute left-3.5 flex items-center pointer-events-none text-primary text-[16px] font-bold">
                S/.
              </div>
              <input 
                id="costo-unitario-input"
                type="text"
                inputMode="decimal"
                value={costoUnitarioUser}
                onChange={(e) => {
                  const val = e.target.value;
                  if (val === '' || /^[0-9]*\.?[0-9]*$/.test(val)) {
                    setCostoUnitarioUser(val);
                  }
                }}
                onBlur={() => {
                  if (costoUnitarioUser === '' || isNaN(parseFloat(costoUnitarioUser))) {
                    setCostoUnitarioUser(0.1);
                  }
                }}
                className="w-full h-12 pl-12 pr-14 rounded-xl bg-[#eaf7ee] text-primary text-[18px] font-bold focus:outline-none focus:ring-2 focus:ring-primary shadow-inner border border-[#22c55e]/20"
              />
              <span className="absolute right-3.5 text-[14px] font-bold text-primary/80 pointer-events-none">/ un</span>
            </div>
          </div>
        </div>

        {/* Resumen de Compras con Presupuesto */}
        <div className="grid grid-cols-2 gap-2 pt-1 w-full min-w-0">
          <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] sm:text-[11px] font-bold text-on-surface-variant uppercase truncate">Plantones Comprables</span>
            <span className="text-[18px] sm:text-[20px] font-bold text-primary leading-tight truncate">
              {plantonesComprables.toLocaleString('es-PE')}
            </span>
            <span className="text-[11px] text-on-surface-variant truncate">unidades</span>
          </div>

          <div className="p-3 rounded-xl bg-[#dcfce7] border border-[#22c55e]/30 flex flex-col gap-0.5 min-w-0">
            <span className="text-[10px] sm:text-[11px] font-bold text-[#166534] uppercase truncate">Alcanza para</span>
            <span className="text-[18px] sm:text-[20px] font-bold text-primary leading-tight truncate">
              {hectareasCubiertas.toFixed(2)}
            </span>
            <span className="text-[11px] text-[#166534] font-semibold truncate">hectáreas (ha)</span>
          </div>
        </div>
      </section>

      {/* 4. TAMAÑO DEL TERRENO */}
      <section className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-3 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Crop size={20} className="text-primary shrink-0" />
            <h2 className="text-[12px] font-bold uppercase tracking-wide text-on-surface-variant">
              Tamaño de tu Parcela o Terreno
            </h2>
          </div>
          <span className="text-[11px] text-[#166534] bg-[#dcfce7] px-2.5 py-0.5 rounded-full font-bold shrink-0">
            Área útil
          </span>
        </div>

        <div className="flex items-baseline justify-between py-1">
          <span className="text-[13px] text-on-surface-variant">Superficie calculada</span>
          <div className="flex items-baseline gap-1">
            <span className="text-[24px] font-bold text-primary">{selectedHectares.toFixed(1)}</span>
            <span className="text-[14px] font-bold text-primary">hectáreas</span>
          </div>
        </div>

        {/* Slider táctil y Presets */}
        <div className="flex flex-col gap-3 w-full min-w-0">
          <input 
            type="range"
            min="0.5"
            max="20.0"
            step="0.5"
            value={selectedHectares}
            onChange={(e) => setSelectedHectares(parseFloat(e.target.value))}
            className="w-full h-2 bg-[#c5e1cb] rounded-lg cursor-pointer accent-primary"
          />
          <div className="grid grid-cols-4 gap-2 w-full min-w-0">
            {[1.0, 2.5, 5.0, 20.0].map((ha) => (
              <button
                key={ha}
                type="button"
                onClick={() => setSelectedHectares(ha)}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all ${
                  selectedHectares === ha
                    ? 'bg-primary text-white shadow-sm'
                    : 'bg-surface-container-low border border-outline-variant/40 text-on-surface hover:bg-surface-container'
                }`}
              >
                {ha} ha
              </button>
            ))}
          </div>

          {/* Indicador Diagnóstico: Relación Presupuesto vs Terreno */}
          <div className={`p-3 rounded-xl border flex flex-col gap-2 transition-all text-xs mt-1 ${
            coberturaPorcentaje < 100 
              ? 'bg-amber-50/90 border-amber-300 text-amber-950' 
              : 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
          }`}>
            <div className="flex items-center justify-between font-bold gap-2">
              <div className="flex items-center gap-1.5 text-[12px]">
                {coberturaPorcentaje < 100 ? (
                  <TriangleAlert size={16} className="text-amber-600 shrink-0" />
                ) : (
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                )}
                <span>
                  {coberturaPorcentaje < 100 
                    ? `⚠️ Tu presupuesto solo cubre el ${coberturaPorcentaje < 10 ? coberturaPorcentaje.toFixed(1) : Math.round(coberturaPorcentaje)}% de tu terreno`
                    : `✅ Tu presupuesto cubre el 100% de tu terreno`
                  }
                </span>
              </div>
              <span className="shrink-0 font-extrabold text-[11px] bg-white/80 px-2 py-0.5 rounded-md border border-black/10">
                {hectareasCubiertas.toFixed(2)} / {selectedHectares.toFixed(1)} ha
              </span>
            </div>

            {/* Barra Visual de Cobertura */}
            <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
              <div 
                className={`h-full rounded-full transition-all duration-300 ${
                  coberturaPorcentaje < 20 ? 'bg-amber-500' : coberturaPorcentaje < 100 ? 'bg-amber-600' : 'bg-emerald-600'
                }`}
                style={{ width: `${Math.max(4, Math.min(100, coberturaPorcentaje))}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECCIÓN ¿CÓMO SEMBRASTE? (ENTRADA DE DENSIDAD) */}
      <section className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-3 w-full min-w-0">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-[17px] font-semibold text-on-surface">¿Cómo sembraste en campo?</h2>
          <p className="text-[13px] text-on-surface-variant">Selecciona el método con el que mides tus surcos o árboles.</p>
        </div>

        {/* Toggle segmentado */}
        <div className="grid grid-cols-2 p-1 bg-surface-container-high rounded-xl text-center w-full min-w-0">
          <button
            type="button"
            onClick={() => setTabInputMode('spacing')}
            className={`py-2 px-2 rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${
              tabInputMode === 'spacing'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Ruler size={16} />
            <span>Conozco mi espaciado</span>
          </button>
          <button
            type="button"
            onClick={() => setTabInputMode('quantity')}
            className={`py-2 px-2 rounded-lg text-[12px] font-bold flex items-center justify-center gap-1.5 transition-all ${
              tabInputMode === 'quantity'
                ? 'bg-primary text-white shadow-sm'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <Tag size={16} />
            <span>Cantidad de plantas</span>
          </button>
        </div>

        {/* Panel Opción A: Espaciado */}
        {tabInputMode === 'spacing' && (
          <div className="flex flex-col gap-4 pt-1 w-full min-w-0">
            {/* Distancia plantas */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-semibold text-on-surface">Distancia entre plantas (en la hilera)</label>
                <span className="text-[11px] font-bold text-primary">Planta a Planta</span>
              </div>
              <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant/30">
                <button 
                  type="button" 
                  onClick={() => setPlantDist(prev => Math.max(1.0, +(prev - 0.25).toFixed(2)))}
                  className="w-11 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface shadow-sm active:scale-95 shrink-0"
                >
                  <Minus size={18} />
                </button>
                <div className="flex-1 text-center text-[17px] font-bold text-primary">
                  {plantDist.toFixed(2)} m
                </div>
                <button 
                  type="button" 
                  onClick={() => setPlantDist(prev => Math.min(6.0, +(prev + 0.25).toFixed(2)))}
                  className="w-11 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface shadow-sm active:scale-95 shrink-0"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Distancia surcos */}
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[12px] font-semibold text-on-surface">Distancia entre surcos o hileras</label>
                <span className="text-[11px] font-bold text-primary">Callejón</span>
              </div>
              <div className="flex items-center bg-surface-container-low rounded-xl p-1 border border-outline-variant/30">
                <button 
                  type="button" 
                  onClick={() => setRowDist(prev => Math.max(1.0, +(prev - 0.25).toFixed(2)))}
                  className="w-11 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface shadow-sm active:scale-95 shrink-0"
                >
                  <Minus size={18} />
                </button>
                <div className="flex-1 text-center text-[17px] font-bold text-primary">
                  {rowDist.toFixed(2)} m
                </div>
                <button 
                  type="button" 
                  onClick={() => setRowDist(prev => Math.min(6.0, +(prev + 0.25).toFixed(2)))}
                  className="w-11 h-10 flex items-center justify-center rounded-lg bg-white text-on-surface shadow-sm active:scale-95 shrink-0"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Resultado de cálculo dinámico */}
            <div className="flex items-center gap-2.5 p-3 rounded-xl bg-[#eaf7ee] border border-[#22c55e]/30">
              <Sprout size={20} className="text-primary shrink-0" />
              <div className="text-[13px] text-on-surface">
                Equivale a <strong className="text-primary font-bold">{densityCalculated.toLocaleString('es-PE')} plantas</strong> por hectárea sembrada.
              </div>
            </div>
          </div>
        )}

        {/* Panel Opción B: Cantidad Total */}
        {tabInputMode === 'quantity' && (
          <div className="flex flex-col gap-3 pt-1 w-full min-w-0">
            <label className="text-[12px] font-semibold text-on-surface">Número total de plantas sembradas en el lote</label>
            <div className="flex items-center bg-surface-container-low rounded-xl px-4 py-2 border border-outline-variant/40 w-full min-w-0">
              <Tag size={18} className="text-on-surface-variant mr-2 shrink-0" />
              <input 
                type="text"
                inputMode="numeric"
                value={totalPlantsInput}
                onChange={(e) => {
                  const valStr = e.target.value;
                  if (valStr === '' || /^[0-9]*$/.test(valStr)) {
                    setTotalPlantsInput(valStr);
                    const val = parseInt(valStr, 10) || 0;
                    if (val > 0 && selectedHectares > 0) {
                      const calcDens = Math.round(val / selectedHectares);
                      const origPlant = datosCultivo.distPlanta || 2.5;
                      const origRow = datosCultivo.distSurco || 3.0;
                      const ratio = origPlant / origRow;
                      const area = 10000 / (calcDens || 1);
                      const newRow = Math.sqrt(area / ratio);
                      const newPlant = ratio * newRow;
                      setPlantDist(Math.round(newPlant * 100) / 100);
                      setRowDist(Math.round(newRow * 100) / 100);
                    }
                  }
                }}
                onBlur={() => {
                  if (totalPlantsInput === '' || isNaN(parseInt(totalPlantsInput))) {
                    setTotalPlantsInput(Math.round(densityCalculated * selectedHectares));
                  }
                }}
                className="w-full bg-transparent text-[18px] font-bold text-primary focus:outline-none"
              />
              <span className="text-[12px] font-semibold text-on-surface-variant shrink-0">plantas</span>
            </div>
            <p className="text-[12px] text-on-surface-variant">
              Dividido entre tus {selectedHectares} ha resultará en tu densidad neta de plantación.
            </p>
          </div>
        )}
      </section>

      {/* 6. GRÁFICO COMPARATIVO DE DISTRIBUCIÓN ESPACIAL (MAPA DE DISTRIBUCIÓN EN PARCELA) */}
      <section className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm border border-outline-variant/40 flex flex-col gap-3 w-full min-w-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#dcfce7] flex items-center justify-center text-primary shrink-0">
              <Grid size={20} />
            </div>
            <div>
              <h3 className="text-[15px] sm:text-[16px] font-bold text-primary leading-tight">Mapa de Distribución en Parcela</h3>
              <p className="text-[11px] text-on-surface-variant">Comparativa en 10 m × 10 m de campo</p>
            </div>
          </div>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-md bg-surface-container-high text-on-surface-variant shrink-0">
            Interactivo
          </span>
        </div>

        {/* Selector de vista de parcela */}
        <div className="grid grid-cols-2 p-1 bg-surface-container-high rounded-xl text-center text-xs font-semibold w-full min-w-0">
          <button
            type="button"
            onClick={() => setViewModeSvg('comparison')}
            className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              viewModeSvg === 'comparison'
                ? 'bg-white text-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0"></span>
            <span className="truncate">Comparativa directa</span>
          </button>
          <button
            type="button"
            onClick={() => setViewModeSvg('recommended')}
            className={`py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
              viewModeSvg === 'recommended'
                ? 'bg-white text-primary shadow-sm font-bold'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#166534] shrink-0"></span>
            <span className="truncate">Solo recomendada</span>
          </button>
        </div>

        {/* Contenedor del Mapa / Grid SVG */}
        <div className="relative bg-[#f2f7f1] rounded-xl p-3 border border-outline-variant/30 overflow-hidden flex flex-col gap-2 w-full min-w-0">
          {/* Leyenda visual flotante */}
          <div className="flex items-center justify-between text-[11px] pb-2 border-b border-outline-variant/30 font-medium w-full min-w-0">
            {viewModeSvg === 'comparison' && (
              <div className="flex items-center gap-1.5 truncate">
                <span className="w-3 h-3 rounded-full bg-amber-500 border border-amber-700 shadow-sm flex items-center justify-center text-[9px] text-white font-bold shrink-0">●</span>
                <span className="text-on-surface font-semibold truncate">
                  Tu siembra actual ({plantDist.toFixed(2)}m × {rowDist.toFixed(2)}m)
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5 shrink-0 ml-auto">
              <span className="w-3 h-3 rounded-full bg-[#166534] border border-emerald-900 shadow-sm flex items-center justify-center text-[9px] text-white font-bold shrink-0">+</span>
              <span className="text-primary font-bold">Ideal {datosCultivo.forma}</span>
            </div>
          </div>

          {/* Lienzo SVG Dinámico Generado por Fórmula */}
          <div className="w-full flex justify-center py-2 min-w-0">
            {(() => {
              // Canvas offsets and scale formulas
              const startX = 65;
              const startY = 42;
              
              // Scale step pixels proportional to plantDist and rowDist
              const stepX = Math.max(30, Math.min(95, Math.round((plantDist / 2.5) * 65)));
              const stepY = Math.max(28, Math.min(65, Math.round((rowDist / 3.0) * 50)));

              // Calculate grid rows & cols to fill canvas
              const rows = [startY, startY + stepY, startY + stepY * 2].filter(y => y <= 165);
              const cols = [startX, startX + stepX, startX + stepX * 2, startX + stepX * 3].filter(x => x <= 285);

              // Recommended (ideal) grid positions
              const recDistPlant = datosCultivo.distPlanta || 2.5;
              const recDistRow = datosCultivo.distSurco || 3.0;
              const recStepX = Math.max(30, Math.min(95, Math.round((recDistPlant / 2.5) * 65)));
              const recStepY = Math.max(28, Math.min(65, Math.round((recDistRow / 3.0) * 50)));
              const recRows = [startY + 15, startY + 15 + recStepY, startY + 15 + recStepY * 2].filter(y => y <= 165);

              // Build actual user plant dots
              const actualPlants = [];
              rows.forEach((y) => {
                cols.forEach((x) => {
                  actualPlants.push({ x, y });
                });
              });

              // Build recommended plant dots (with Tresbolillo offset on alternate rows)
              const recommendedPlants = [];
              const isTresbolillo = datosCultivo.forma === 'Tresbolillo' || datosCultivo.forma === 'Triángulo';
              recRows.forEach((y, rIdx) => {
                const offsetX = (isTresbolillo && rIdx % 2 === 1) ? recStepX / 2 : 0;
                const recCols = [startX + 18 + offsetX, startX + 18 + recStepX + offsetX, startX + 18 + recStepX * 2 + offsetX].filter(x => x >= 40 && x <= 285);
                recCols.forEach((x) => {
                  recommendedPlants.push({ x, y });
                });
              });

              return (
                <svg className="w-full max-w-[320px] h-48 rounded-lg bg-[#eaf3ea] shadow-inner transition-all duration-300" viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="soilGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#d5e4d5" strokeWidth="0.75" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#soilGrid)" />
                  
                  {/* Dynamic row guide lines */}
                  {rows.map((y, idx) => (
                    <line key={`row-line-${idx}`} x1="20" y1={y} x2="285" y2={y} stroke="#ccdccb" strokeWidth="1.5" strokeDasharray="3,3" className="transition-all duration-300" />
                  ))}

                  {/* Dynamic Cotas / Dimension markers */}
                  {rows.length >= 2 && (
                    <g className="transition-all duration-300">
                      <line x1="30" y1={rows[0]} x2="30" y2={rows[1]} stroke="#9c7516" strokeWidth="1.5" />
                      <polygon points={`27,${rows[0] + 5} 30,${rows[0]} 33,${rows[0] + 5}`} fill="#9c7516" />
                      <polygon points={`27,${rows[1] - 5} 30,${rows[1]} 33,${rows[1] - 5}`} fill="#9c7516" />
                      <text x="35" y={(rows[0] + rows[1]) / 2 + 3} fill="#8c5804" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="start">
                        {rowDist.toFixed(2)} m
                      </text>
                    </g>
                  )}

                  {cols.length >= 2 && (
                    <g className="transition-all duration-300">
                      <line x1={cols[0]} y1="22" x2={cols[1]} y2="22" stroke="#9c7516" strokeWidth="1.5" />
                      <polygon points={`${cols[0] + 5},19 ${cols[0]},22 ${cols[0] + 5},25`} fill="#9c7516" />
                      <polygon points={`${cols[1] - 5},19 ${cols[1]},22 ${cols[1] - 5},25`} fill="#9c7516" />
                      <text x={(cols[0] + cols[1]) / 2} y="16" fill="#8c5804" fontFamily="Inter" fontSize="10" fontWeight="700" textAnchor="middle">
                        {plantDist.toFixed(2)} m
                      </text>
                    </g>
                  )}

                  {/* Dynamic User Plants (Amber) */}
                  {viewModeSvg === 'comparison' && (
                    <g id="currentPlantsGroup">
                      {actualPlants.map((pt, idx) => (
                        <g key={`user-pt-${idx}`} transform={`translate(${pt.x}, ${pt.y})`} className="transition-all duration-300">
                          <circle r="9" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
                          <circle r="2.5" fill="#ffffff" />
                        </g>
                      ))}
                    </g>
                  )}

                  {/* Dynamic Recommended Plants (Green +) */}
                  <g id="recommendedPlantsGroup">
                    {recommendedPlants.map((pt, idx) => (
                      <g key={`rec-pt-${idx}`} transform={`translate(${pt.x}, ${pt.y})`} className="transition-all duration-300">
                        <circle r="8.5" fill="#166534" stroke="#002711" strokeWidth="1.5" />
                        <line x1="-3.5" y1="0" x2="3.5" y2="0" stroke="#ffffff" strokeWidth="1.5" />
                        <line x1="0" y1="-3.5" x2="0" y2="3.5" stroke="#ffffff" strokeWidth="1.5" />
                      </g>
                    ))}
                  </g>
                </svg>
              );
            })()}
          </div>

          {/* Resumen técnico al pie del mapa */}
          <div className="pt-2 border-t border-outline-variant/30 flex items-center justify-between text-xs w-full min-w-0">
            <span className="text-on-surface-variant font-medium truncate">Diseño técnico sugerido:</span>
            <span className="font-bold text-primary flex items-center gap-1 shrink-0 ml-1">
              <Sparkles size={14} className="text-primary shrink-0" />
              <span>{datosCultivo.distPlanta}m × {datosCultivo.distSurco}m en {datosCultivo.forma}</span>
            </span>
          </div>

          {/* Estimación de Surcos (Opciones A y C combinadas) */}
          <div className="pt-2 mt-1 border-t border-outline-variant/30 flex flex-col gap-1.5 text-xs w-full min-w-0">
            <div className="flex items-center gap-1.5 text-primary">
              <Ruler size={14} className="shrink-0" />
              <span className="font-bold">Estimación de Campo (Asumiendo terreno cuadrado)</span>
            </div>
            {(() => {
              const areaM2 = hectareasCubiertas * 10000;
              const lado = Math.sqrt(areaM2);
              const numSurcos = Math.max(1, Math.floor(lado / rowDist));
              const metrosLineales = numSurcos * lado;
              return (
                <p className="text-on-surface-variant leading-relaxed">
                  Para abarcar tu área útil de <strong className="text-on-surface">{hectareasCubiertas.toFixed(2)} ha</strong>, tendrías que trazar aproximadamente <strong className="text-on-surface">{numSurcos} surcos</strong> de {lado.toFixed(0)}m de largo. Esto equivale a trabajar <strong className="text-on-surface">{metrosLineales.toLocaleString('es-PE', {maximumFractionDigits: 0})} metros lineales</strong> totales.
                </p>
              );
            })()}
          </div>
        </div>
      </section>

      {/* 7. PLAN DE ACCIÓN Y RESULTADOS DEL DIAGNÓSTICO */}
      <section className="bg-[#fefce8] border border-amber-300 p-4 rounded-2xl shadow-sm flex flex-col gap-3 w-full min-w-0">
        <div className="flex items-center gap-2 text-amber-900">
          <div className="w-8 h-8 rounded-lg bg-amber-200 flex items-center justify-center shrink-0">
            <Lightbulb size={20} className="text-amber-950" />
          </div>
          <h3 className="text-[16px] font-bold text-amber-950">Plan de acción: Resiembra estratégica</h3>
        </div>

        <div className="flex flex-col gap-2 text-amber-950 text-[13px]">
          <div className="flex items-start gap-2">
            <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
            <p className="leading-snug">
              Con tu presupuesto de <strong className="font-bold text-primary">S/. {presupuesto}</strong>, puedes adquirir <strong className="font-bold text-primary">{plantonesComprables.toLocaleString('es-PE')} plantones</strong>.
            </p>
          </div>
          <div className="flex items-start gap-2">
            {coberturaPorcentaje < 100 ? (
              <TriangleAlert size={18} className="text-amber-700 mt-0.5 shrink-0" />
            ) : (
              <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
            )}
            <p className="leading-snug">
              Cubre <strong className="font-bold text-primary">{hectareasCubiertas.toFixed(2)} hectáreas</strong> ({coberturaPorcentaje < 10 ? coberturaPorcentaje.toFixed(1) : Math.round(coberturaPorcentaje)}% de tu terreno total de {selectedHectares.toFixed(1)} ha) con densidad de {densityCalculated.toLocaleString('es-PE')} plantas/ha.
            </p>
          </div>
          <div className="flex items-start gap-2">
            <Info size={18} className="text-primary mt-0.5 shrink-0" />
            <p className="leading-snug">
              <strong className="font-bold text-primary">Ventana ideal:</strong> Iniciar hoyos con compost 3 semanas antes de las lluvias principales de Selva/Sierra.
            </p>
          </div>
        </div>

        {/* Alerta Destacada de Diagnóstico si la Cobertura es Limitada */}
        {coberturaPorcentaje < 100 && (
          <div className="p-3 bg-amber-100 border border-amber-400/70 rounded-xl text-amber-950 flex items-start gap-2 text-[12px]">
            <TriangleAlert size={18} className="text-amber-700 mt-0.5 shrink-0" />
            <div className="flex flex-col gap-0.5">
              <span className="font-bold text-amber-950">Alerta Diagnóstica: Cobertura Parcial</span>
              <span>
                Tu presupuesto solo cubre el <strong>{coberturaPorcentaje < 10 ? coberturaPorcentaje.toFixed(1) : Math.round(coberturaPorcentaje)}%</strong> de tu terreno. Te sugerimos ejecutar tu siembra en etapas o evaluar financiamiento.
              </span>
            </div>
          </div>
        )}

        {/* Caja de Inversión Estimada */}
        <div className="p-3.5 bg-white rounded-xl border border-amber-300 shadow-sm flex flex-col gap-2 w-full min-w-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <Coins size={20} className="text-primary shrink-0" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant truncate">Inversión Calculada</span>
            </div>
            <span className="text-[20px] font-bold text-primary">S/. {presupuesto.toLocaleString('es-PE')}</span>
          </div>
          <div className="flex items-center justify-between pt-1 border-t border-outline-variant/30 text-[11px] text-on-surface-variant font-medium w-full min-w-0">
            <span className="truncate">Plantones: <strong className="text-primary font-bold">~S/. {(plantonesComprables * costoUnitarioUser).toFixed(0)}</strong></span>
            <span className="truncate ml-1">Unidades: <strong className="text-primary font-bold">{plantonesComprables} plantones</strong></span>
          </div>
        </div>
      </section>

      {/* 8. BOTONES DE ACCIÓN */}
      <section className="flex flex-col gap-2.5 pt-1 w-full min-w-0">
        <button 
          type="button"
          onClick={handleSiguiente}
          className="w-full h-14 bg-primary hover:bg-primary/90 text-white font-bold text-[16px] rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
        >
          <span>Generar mi Calendario de Cultivo</span>
          <CalendarPlus size={22} />
        </button>

        <button 
          type="button"
          onClick={() => setShowFichaTecnica(true)}
          className="w-full h-11 bg-surface-container-lowest hover:bg-surface-container text-primary font-bold text-[13px] rounded-xl flex items-center justify-center gap-1.5 border border-outline-variant/40 shadow-sm transition-colors active:scale-[0.99]"
        >
          <FileText size={18} className="shrink-0" />
          <span>Ver Ficha Técnica del Cultivo</span>
        </button>
      </section>

      {/* MODAL FICHA TÉCNICA */}
      {showFichaTecnica && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm" 
            onClick={() => setShowFichaTecnica(false)} 
          />
          <div className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[70] bg-white rounded-2xl shadow-2xl max-w-md mx-auto max-h-[80vh] overflow-y-auto">
            <div className="sticky top-0 bg-white rounded-t-2xl px-4 pt-4 pb-3 border-b border-outline-variant/30 flex items-center justify-between z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-[#dcfce7] flex items-center justify-center">
                  <FileText size={18} className="text-primary" />
                </div>
                <h3 className="text-[16px] font-bold text-on-surface">Ficha Técnica: {datosCultivo.nombre}</h3>
              </div>
              <button 
                type="button" 
                onClick={() => setShowFichaTecnica(false)} 
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-on-surface-variant hover:text-on-surface text-[18px] font-bold"
              >
                ✕
              </button>
            </div>
            <div className="p-4 flex flex-col gap-3">
              {selectedVariedadObj && (
                <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#eaf7ee] border border-[#22c55e]/20">
                  <Sprout size={16} className="text-primary shrink-0" />
                  <span className="text-[13px] font-semibold text-primary">{selectedVariedadObj.nombre}</span>
                </div>
              )}
              <div className="grid grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Distancia Planta</span>
                  <span className="text-[18px] font-bold text-primary">{datosCultivo.distPlanta} m</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Distancia Surco</span>
                  <span className="text-[18px] font-bold text-primary">{datosCultivo.distSurco} m</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Densidad Óptima</span>
                  <span className="text-[18px] font-bold text-primary">{datosCultivo.densidadOptima?.toLocaleString('es-PE')}</span>
                  <span className="text-[11px] text-on-surface-variant">plantas/ha</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Patrón</span>
                  <span className="text-[18px] font-bold text-primary">{datosCultivo.forma}</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Precio Mercado</span>
                  <span className="text-[18px] font-bold text-primary">S/. {datosCultivo.precioMercado}</span>
                  <span className="text-[11px] text-on-surface-variant">por kg</span>
                </div>
                <div className="p-3 rounded-xl bg-surface-container-low border border-outline-variant/30 flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold text-on-surface-variant uppercase">Costo Unitario</span>
                  <span className="text-[18px] font-bold text-primary">S/. {datosCultivo.costoUnitario}</span>
                  <span className="text-[11px] text-on-surface-variant">por plantón</span>
                </div>
              </div>
              <div className="p-3 rounded-xl bg-[#eaf7ee] border border-[#22c55e]/20 flex flex-col gap-1">
                <span className="text-[10px] font-bold text-[#166534] uppercase">Etapas de Cultivo</span>
                <span className="text-[14px] font-bold text-primary">{datosCultivo.etapasTotales} etapas</span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-on-surface-variant">
                <Info size={14} className="shrink-0" />
                <span>Fuente: <strong className="text-on-surface">{datosCultivo.fuente}</strong></span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
