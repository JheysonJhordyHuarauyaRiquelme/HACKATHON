import React, { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgroContext } from '../context/AgroContext';
import { 
  Sprout, 
  ShieldCheck, 
  ChevronRight, 
  ChevronDown,
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  FlaskConical, 
  Calendar, 
  Target, 
  Sparkles,
  Info,
  Clock,
  ArrowRight,
  Link,
  Leaf
} from 'lucide-react';

export const TableroCampana = () => {
  const navigate = useNavigate();
  const { campanaActual, actualizarCampanaActual, datosCultivos } = useContext(AgroContext);
  
  const claveCultivo = campanaActual.cultivo || 'cacao';
  const cultivoInfo = datosCultivos[claveCultivo] || datosCultivos['cacao'];
  const etapasLista = cultivoInfo.etapas || [];

  const [etapasEstado, setEtapasEstado] = useState(
    etapasLista.map(e => ({
      ...e,
      aplicado: null
    }))
  );

  const [abierto, setAbierto] = useState(0);

  const etapasCompletadas = etapasEstado.filter(e => e.aplicado === true).length;
  const totalEtapas = etapasLista.length;
  const porcentajeSalud = totalEtapas > 0 ? Math.round((etapasCompletadas / totalEtapas) * 100) : 0;

  const handleEtapa = (index, valor) => {
    const copia = [...etapasEstado];
    copia[index].aplicado = valor;
    setEtapasEstado(copia);
    const completadas = copia.filter(e => e.aplicado === true).length;
    actualizarCampanaActual({ etapas_nutricion_completadas: completadas });
  };

  const toggleAcordeon = (index) => {
    setAbierto(prev => (prev === index ? -1 : index));
  };

  // Verifica si una etapa dependiente puede habilitarse
  const puedeAplicar = (etapa) => {
    if (!etapa.dependeDe) return true;
    const etapaPadre = etapasEstado.find(e => e.id === etapa.dependeDe);
    return etapaPadre && etapaPadre.aplicado === true;
  };

  const getNombreEtapa = (id) => {
    const e = etapasEstado.find(et => et.id === id);
    return e ? e.fase : '';
  };

  const proyeccionCalculada = (campanaActual.costoEstimado || 3000) * 3.2 * (0.4 + (porcentajeSalud / 100) * 0.6);

  return (
    <div className="flex flex-col w-full gap-5 pb-10 max-w-xl mx-auto">
      {/* Encabezado */}
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-primary/10 text-primary">
          <Calendar size={15} />
          <span className="text-[11px] font-bold tracking-wider uppercase">Calendario de Cultivo</span>
        </div>
        <h2 className="text-[26px] leading-[32px] font-extrabold text-on-surface">
          {cultivoInfo.nombre}: Paso a Paso
        </h2>
        <p className="text-[13px] leading-[18px] text-on-surface-variant">
          Toca cada paso para ver qué necesita tu planta y cuándo aplicarlo.
        </p>
      </div>

      {/* Tarjeta Resumen */}
      <div className="bg-gradient-to-br from-primary via-[#165a36] to-[#0d3b23] rounded-2xl p-5 shadow-lg text-white flex flex-col gap-4 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
          <Sprout size={150} />
        </div>

        <div className="flex justify-between items-center z-10">
          <div className="flex items-center gap-2">
            <ShieldCheck size={22} className="text-[#6bff8f]" />
            <span className="text-[14px] font-bold">Salud del Cultivo</span>
          </div>
          <span className="text-[28px] font-extrabold text-[#6bff8f]">{porcentajeSalud}%</span>
        </div>

        {/* Mini stepper */}
        <div className="flex items-center gap-1 z-10">
          {etapasEstado.map((e, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className={`w-full h-2.5 rounded-full transition-all duration-300 ${
                e.aplicado === true ? 'bg-[#6bff8f]' 
                : e.aplicado === false ? 'bg-red-400/70' 
                : 'bg-white/20'
              }`} />
              <span className="text-[9px] text-white/60 font-medium">{i + 1}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/15 z-10">
          <div className="flex flex-col">
            <span className="text-[10px] text-emerald-200 uppercase font-semibold tracking-wider">Ingreso Proyectado</span>
            <span className="text-[20px] font-bold">S/. {Math.round(proyeccionCalculada).toLocaleString('es-PE')}</span>
          </div>
          <div className="flex flex-col items-end text-right">
            <span className="text-[10px] text-emerald-200 uppercase font-semibold tracking-wider">Avance</span>
            <span className="text-[13px] font-bold text-[#6bff8f]">
              {etapasCompletadas}/{totalEtapas} pasos
            </span>
          </div>
        </div>
      </div>

      {/* Título */}
      <div className="flex items-center justify-between">
        <h3 className="text-[16px] font-bold text-on-surface flex items-center gap-2">
          <Target size={17} className="text-primary" />
          Pasos del Cultivo
        </h3>
        <span className="text-[11px] font-semibold text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-full">
          Toca para abrir ▼
        </span>
      </div>

      {/* Acordeón Timeline */}
      <div className="flex flex-col relative">
        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-200 z-0" />

        {etapasEstado.map((etapa, index) => {
          const estaAbierto = abierto === index;
          const estaAplicado = etapa.aplicado === true;
          const estaOmitido = etapa.aplicado === false;
          const esUltimo = index === etapasEstado.length - 1;
          const habilitado = puedeAplicar(etapa);
          const esDependiente = etapa.tipo === 'dependiente';

          return (
            <div key={etapa.id} className={`relative z-10 ${!esUltimo ? 'pb-3' : ''}`}>
              {/* Dot */}
              <div className={`absolute left-[11px] top-[14px] w-[18px] h-[18px] rounded-full border-[3px] transition-all duration-300 z-20 ${
                estaAplicado ? 'bg-emerald-500 border-emerald-200' 
                : estaOmitido ? 'bg-red-500 border-red-200' 
                : estaAbierto ? 'bg-primary border-primary/30' 
                : 'bg-white border-slate-300'
              }`} />

              {/* Tarjeta */}
              <div className={`ml-10 rounded-2xl border shadow-sm overflow-hidden transition-all duration-300 ${
                !habilitado && !estaAplicado && !estaOmitido
                  ? 'border-slate-200 bg-slate-50 opacity-75'
                  : estaAplicado ? 'border-emerald-300 bg-white' 
                  : estaOmitido ? 'border-red-200 bg-white' 
                  : estaAbierto ? 'border-primary/40 bg-white shadow-md' 
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}>
                
                {/* Cabecera */}
                <button
                  type="button"
                  onClick={() => toggleAcordeon(index)}
                  className="w-full flex items-center justify-between gap-2 p-3.5 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center ${
                      estaAplicado ? 'bg-emerald-100 text-emerald-700' 
                      : estaOmitido ? 'bg-red-100 text-red-600' 
                      : 'bg-primary/10 text-primary'
                    }`}>
                      {estaAplicado ? <CheckCircle2 size={18} /> : estaOmitido ? <XCircle size={18} /> : <Sprout size={18} />}
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-[14px] font-bold text-slate-800 leading-tight truncate">
                        {etapa.fase}
                      </h4>
                      <span className="text-[11px] text-slate-500 font-medium">
                        {etapa.duracion}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {estaAplicado && (
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">✓ Listo</span>
                    )}
                    {estaOmitido && (
                      <span className="text-[10px] font-bold text-red-600 bg-red-100 px-2 py-0.5 rounded-full">Omitido</span>
                    )}
                    {etapa.aplicado === null && habilitado && (
                      <span className="text-[10px] font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full">Pendiente</span>
                    )}
                    {etapa.aplicado === null && !habilitado && (
                      <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                        <Link size={10} /> Bloqueado
                      </span>
                    )}
                    <ChevronDown 
                      size={18} 
                      className={`text-slate-400 transition-transform duration-300 ${estaAbierto ? 'rotate-180' : ''}`} 
                    />
                  </div>
                </button>

                {/* Contenido expandible */}
                <AccordionBody isOpen={estaAbierto}>
                  <div className="px-3.5 pb-4 flex flex-col gap-2.5 border-t border-slate-100 pt-3">

                    {/* Dependencia */}
                    {esDependiente && (
                      <div className={`flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg ${
                        habilitado 
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/50' 
                          : 'bg-orange-50 text-orange-700 border border-orange-200/50'
                      }`}>
                        <Link size={13} />
                        {habilitado 
                          ? <>Paso previo completado ✓ — Puedes aplicar este paso</>
                          : <>Primero completa: {getNombreEtapa(etapa.dependeDe)}</>
                        }
                      </div>
                    )}

                    {/* Etapa independiente */}
                    {!esDependiente && (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/50">
                        <Leaf size={13} />
                        Paso independiente — Puedes aplicar en cualquier momento
                      </div>
                    )}

                    {/* Meta */}
                    <div className="text-[13px] text-slate-700 flex items-start gap-1.5">
                      <Sparkles size={15} className="text-amber-500 shrink-0 mt-0.5" />
                      <span><strong>¿Para qué sirve?</strong> {etapa.objetivo}</span>
                    </div>

                    {/* Cuándo aplicar */}
                    <div className="bg-primary/5 rounded-xl p-2.5 border border-primary/10 flex items-start gap-2 text-[12px]">
                      <Clock size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-primary block">¿Cuándo aplicar?</span>
                        <span className="text-slate-700">{etapa.cuandoAplicar}</span>
                      </div>
                    </div>

                    {/* Producto principal */}
                    <div className="bg-slate-50 rounded-xl p-2.5 border border-slate-100 flex items-start gap-2 text-[12px]">
                      <FlaskConical size={15} className="text-primary shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold text-slate-700 block">Producto recomendado:</span>
                        <span className="text-slate-600">{etapa.insumoRecomendado}</span>
                      </div>
                    </div>

                    {/* Alternativa */}
                    {etapa.alternativa && (
                      <div className="bg-emerald-50/60 rounded-xl p-2.5 border border-emerald-200/40 flex items-start gap-2 text-[12px]">
                        <ArrowRight size={15} className="text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-emerald-800 block">¿No lo consigues? Alternativa:</span>
                          <span className="text-emerald-700">{etapa.alternativa}</span>
                        </div>
                      </div>
                    )}

                    {/* Alerta de riesgo */}
                    <div className="bg-amber-50/70 border border-amber-200/50 rounded-xl p-2.5 flex items-start gap-2 text-[12px] text-amber-900">
                      <AlertTriangle size={15} className="text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">⚠ Si no aplicas:</span>
                        <span>{etapa.alertaRiesgo}</span>
                      </div>
                    </div>

                    {/* Acciones */}
                    <div className="pt-1">
                      {etapa.aplicado === null ? (
                        habilitado ? (
                          <div className="grid grid-cols-2 gap-2">
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleEtapa(index, true); }}
                              className="bg-primary hover:bg-primary/90 text-white font-bold text-[13px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 shadow-sm active:scale-[0.97] transition-all"
                            >
                              <CheckCircle2 size={16} />
                              Ya apliqué ✓
                            </button>
                            <button 
                              onClick={(e) => { e.stopPropagation(); handleEtapa(index, false); }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold text-[13px] py-2.5 rounded-xl flex items-center justify-center gap-1.5 active:scale-[0.97] transition-all"
                            >
                              <XCircle size={16} />
                              Omitir
                            </button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 bg-orange-50 border border-orange-200/50 p-2.5 rounded-xl text-[12px] text-orange-800 font-semibold">
                            <Link size={15} className="text-orange-500" />
                            Completa el paso anterior primero para desbloquear este
                          </div>
                        )
                      ) : (
                        <div className="flex items-center justify-between bg-slate-50 p-2.5 rounded-xl">
                          <span className={`text-[12px] font-bold flex items-center gap-1.5 ${
                            estaAplicado ? 'text-emerald-700' : 'text-red-600'
                          }`}>
                            {estaAplicado ? (
                              <><CheckCircle2 size={14} /> Registrado ✓</>
                            ) : (
                              <><AlertTriangle size={14} /> No aplicado</>
                            )}
                          </span>
                          <button 
                            onClick={(e) => { e.stopPropagation(); handleEtapa(index, null); }} 
                            className="text-[11px] font-bold text-primary underline px-2 py-1"
                          >
                            Cambiar
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </AccordionBody>
              </div>
            </div>
          );
        })}
      </div>

      {/* Tip */}
      <div className="flex items-start gap-2 bg-blue-50 border border-blue-200/60 p-3 rounded-2xl text-[12px] text-blue-900">
        <Info size={16} className="text-blue-600 shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Tip:</strong> Aplica temprano en la mañana o al atardecer para que la planta absorba mejor los nutrientes.
        </p>
      </div>

      {/* Botón Liquidación */}
      <button 
        onClick={() => navigate('/liquidacion')}
        className="w-full h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white text-[16px] font-extrabold flex items-center justify-center gap-2 shadow-lg shadow-primary/20 transition-all active:scale-[0.99]" 
        type="button"
      >
        Ir a Liquidación de Cosecha
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

function AccordionBody({ isOpen, children }) {
  const ref = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      setHeight(ref.current.scrollHeight);
    }
  }, [isOpen, children]);

  return (
    <div
      style={{
        maxHeight: isOpen ? `${height}px` : '0px',
        opacity: isOpen ? 1 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.35s ease, opacity 0.25s ease',
      }}
    >
      <div ref={ref}>
        {children}
      </div>
    </div>
  );
}
