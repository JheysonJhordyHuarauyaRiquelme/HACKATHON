import React, { useState } from 'react';
import { 
  BadgeCheck, Headset, CheckCircle2, MessageCircle, PhoneCall, 
  CloudCheck, WifiOff, History, RefreshCw, Check, HelpCircle, 
  LayoutGrid, ChevronDown, AlertTriangle, AlertCircle, 
  CircleDollarSign, Building2, MapPin, Clock, Map, Handshake
} from 'lucide-react';

export const Soporte = () => {
  const [sincronizando, setSincronizando] = useState(false);
  const [sincronizado, setSincronizado] = useState(false);
  
  // Estado para acordeón (null = todos cerrados, número = índice abierto)
  const [preguntaActiva, setPreguntaActiva] = useState(1);

  const handleSincronizar = () => {
    setSincronizando(true);
    setTimeout(() => {
      setSincronizando(false);
      setSincronizado(true);
      setTimeout(() => {
        setSincronizado(false);
      }, 2500);
    }, 1200);
  };

  const togglePregunta = (id) => {
    setPreguntaActiva(preguntaActiva === id ? null : id);
  };

  return (
    <div className="flex flex-col w-full pb-8">
      {/* Encabezado de Sección */}
      <header className="flex flex-col gap-1 pt-1 mb-4">
        <div className="inline-flex items-center gap-1 self-start px-3 py-1 rounded-full bg-surface-container-high text-primary">
          <BadgeCheck size={16} className="text-secondary" />
          <span className="text-[10px] uppercase tracking-wider font-bold">Cooperativa Agraria Alto Huallaga • Canal Oficial</span>
        </div>
        <h2 className="text-[28px] leading-[34px] font-bold text-on-surface tracking-tight mt-1">
          Centro de Soporte YACHAY
        </h2>
        <p className="text-[14px] leading-[20px] text-on-surface-variant">
          Asistencia técnica directa con tu cooperativa y guía agronómica de campo en tiempo real.
        </p>
      </header>

      <div className="flex flex-col gap-4">
        {/* Sección 1: Asesoría Directa */}
        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-11 h-11 rounded-full bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <Headset size={24} />
              </div>
              <div className="flex flex-col min-w-0">
                <h3 className="text-[18px] font-semibold text-on-surface truncate">Asesoría Directa</h3>
                <p className="text-[12px] text-on-surface-variant line-clamp-1">Resuelve dudas sobre fertilización y alertas de tu lote.</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-bold uppercase shrink-0">En línea</span>
          </div>
          
          {/* Ingeniero asignado ficha */}
          <div className="flex items-center gap-2 p-3 rounded-lg bg-surface-container-low">
            <div className="relative shrink-0">
              <img 
                className="w-12 h-12 rounded-full object-cover shadow-sm" 
                alt="Retrato de ingeniero agrónomo" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCOkHq3bpgZfJAbb_83KHJ-CU9y8dEC-BFo8_OBfqBmiJF1U_CVRe3H9VZ2wCEW9W0-oe2Si0VOn3p2twIqfBeuZSomJqsFm5SdiQJrbGrIlA0HfWXIlrfcUAlKa0icx-ttRHYPsiJi0nSrZtfO6-JjlpJpQXaLsR4k8huoqg8h0veg1puEATNMvxGZoKljaXdDrqp08aOWqA5gv7s21gxiQMASMX1MlYdi2l4VVt8MEJeNyzL3AgzQ4w" 
              />
              <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-secondary-fixed-dim ring-2 ring-surface-container-low"></span>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[14px] font-semibold text-on-surface truncate">Ing. Carlos Mendoza</span>
                <CheckCircle2 size={16} className="text-secondary shrink-0" />
              </div>
              <p className="text-[12px] text-on-surface-variant flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse inline-block"></span>
                Responde en menos de 15 min
              </p>
            </div>
          </div>
          
          {/* WhatsApp Action Button */}
          <a 
            className="w-full h-14 rounded-lg bg-primary-container hover:bg-primary text-white font-semibold text-[14px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.98]" 
            href="https://wa.me/51962384102" 
            rel="noopener noreferrer" 
            target="_blank"
          >
            <MessageCircle size={24} />
            <span>Chatear con el Agrónomo de Guardia</span>
          </a>
          
          {/* Llamada de emergencia */}
          <a 
            className="w-full h-12 rounded-lg bg-surface-container text-primary font-semibold text-[14px] flex items-center justify-center gap-2 hover:bg-surface-container-high transition-colors" 
            href="tel:+51962384102"
          >
            <PhoneCall size={20} />
            <span>Llamar a línea directa técnica</span>
          </a>
        </section>

        {/* Sección 2: Estado de Conexión y Datos */}
        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <CloudCheck size={22} className="text-secondary" />
              <span className="text-[18px] font-semibold text-on-surface">Modo Campo & Datos</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-secondary-fixed/40 text-on-secondary-fixed text-[10px] font-bold">
              <WifiOff size={14} />
              <span>Offline Ready</span>
            </div>
          </div>
          <p className="text-[12px] text-on-surface-variant mb-2">
            Tus registros agronómicos se guardan de forma segura en este teléfono aunque no tengas cobertura celular en la quebrada.
          </p>
          <div className="p-3 rounded-lg bg-tertiary-fixed/30 flex items-center justify-between gap-2">
            <div className="flex items-center gap-1 min-w-0">
              <History size={20} className="text-tertiary shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-tertiary truncate">Última sincronización</span>
                <span className="text-[12px] text-on-surface truncate">Hoy, 07:45 AM • 14 registros listos</span>
              </div>
            </div>
            <button 
              className={`h-10 px-3 rounded-lg flex items-center gap-1.5 shadow-sm transition-all shrink-0 font-semibold text-[12px] ${
                sincronizando ? 'bg-surface-container text-primary-fixed opacity-80 cursor-wait' : 
                sincronizado ? 'bg-[#6bff8f]/20 text-[#006e2f]' : 
                'bg-surface-container-lowest text-primary active:bg-surface-container hover:shadow'
              }`}
              onClick={handleSincronizar} 
              disabled={sincronizando}
              type="button"
            >
              {sincronizando ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : sincronizado ? (
                <Check size={18} />
              ) : (
                <RefreshCw size={18} />
              )}
              <span>{sincronizando ? 'Actualizando...' : sincronizado ? '¡Al día!' : 'Sincronizar'}</span>
            </button>
          </div>
        </section>

        {/* Sección 3: Preguntas Frecuentes de Campo (Acordeón) */}
        <section className="bg-surface-container-lowest rounded-xl p-4 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-[18px] font-semibold text-on-surface">Preguntas Frecuentes</h3>
              <p className="text-[12px] text-on-surface-variant">Respuestas rápidas para labores en campo</p>
            </div>
            <HelpCircle size={24} className="text-primary" />
          </div>
          
          <div className="flex flex-col gap-1">
            {/* Item 1 */}
            <div className="rounded-lg bg-surface-container-low overflow-hidden transition-all duration-200">
              <button 
                className="w-full min-h-[48px] p-3 text-left flex items-center justify-between gap-2 focus:outline-none" 
                onClick={() => togglePregunta(1)} 
                type="button"
              >
                <span className="text-[14px] font-semibold text-on-surface flex items-center gap-2">
                  <LayoutGrid size={18} className="text-primary shrink-0" />
                  <span>¿Cómo calculo la distancia exacta si sembré a tresbolillo?</span>
                </span>
                <ChevronDown size={20} className={`text-on-surface-variant transition-transform duration-200 shrink-0 ${preguntaActiva === 1 ? 'transform rotate-180' : ''}`} />
              </button>
              
              <div className={`px-3 pb-3 pt-0 flex-col gap-2 ${preguntaActiva === 1 ? 'flex' : 'hidden'}`}>
                <div className="p-3 rounded-md bg-surface-container-lowest shadow-sm">
                  <p className="text-[14px] text-on-surface">
                    En la pestaña <strong>Planificador</strong>, selecciona el marco en triángulo equilátero (tresbolillo). La fórmula calcula automáticamente la densidad óptima:
                  </p>
                  <div className="my-2 p-2.5 rounded bg-surface-container text-primary font-mono text-[12px] font-semibold flex items-center gap-2">
                    <LayoutGrid size={16} />
                    <span>N° Plantas = Área / (Distancia² × 0.866)</span>
                  </div>
                  <p className="text-[12px] text-on-surface-variant">
                    Esto maximiza la captación solar foliar en laderas y evita el solapamiento de copas durante la fructificación.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="rounded-lg bg-surface-container-low overflow-hidden transition-all duration-200">
              <button 
                className="w-full min-h-[48px] p-3 text-left flex items-center justify-between gap-2 focus:outline-none" 
                onClick={() => togglePregunta(2)} 
                type="button"
              >
                <span className="text-[14px] font-semibold text-on-surface flex items-center gap-2">
                  <AlertTriangle size={18} className="text-primary shrink-0" />
                  <span>¿Qué hago si me salté la nutrición de fondo?</span>
                </span>
                <ChevronDown size={20} className={`text-on-surface-variant transition-transform duration-200 shrink-0 ${preguntaActiva === 2 ? 'transform rotate-180' : ''}`} />
              </button>
              
              <div className={`px-3 pb-3 pt-0 flex-col gap-2 ${preguntaActiva === 2 ? 'flex' : 'hidden'}`}>
                <div className="p-3 rounded-md bg-surface-container-lowest shadow-sm flex flex-col gap-2">
                  <div className="flex items-center gap-1.5 text-error">
                    <AlertCircle size={18} />
                    <span className="text-[10px] uppercase font-bold tracking-wider">Protocolo de Corrección</span>
                  </div>
                  <p className="text-[14px] text-on-surface">
                    En <strong>Mis Parcelas</strong>, puedes registrar un refuerzo foliar correctivo de fósforo asimilable y micronutrientes quelatados (Zn + B).
                  </p>
                  <p className="text-[12px] text-on-surface-variant">
                    Esta aspersión compensa hasta un 70% del cuajado radicular inicial sin perturbar el suelo compacto.
                  </p>
                </div>
              </div>
            </div>

            {/* Item 3 */}
            <div className="rounded-lg bg-surface-container-low overflow-hidden transition-all duration-200">
              <button 
                className="w-full min-h-[48px] p-3 text-left flex items-center justify-between gap-2 focus:outline-none" 
                onClick={() => togglePregunta(3)} 
                type="button"
              >
                <span className="text-[14px] font-semibold text-on-surface flex items-center gap-2">
                  <CircleDollarSign size={18} className="text-primary shrink-0" />
                  <span>¿Cómo edito el costo de mis plantones o jornales?</span>
                </span>
                <ChevronDown size={20} className={`text-on-surface-variant transition-transform duration-200 shrink-0 ${preguntaActiva === 3 ? 'transform rotate-180' : ''}`} />
              </button>
              
              <div className={`px-3 pb-3 pt-0 flex-col gap-2 ${preguntaActiva === 3 ? 'flex' : 'hidden'}`}>
                <div className="p-3 rounded-md bg-surface-container-lowest shadow-sm">
                  <p className="text-[14px] text-on-surface">
                    Ingresa al <strong>Planificador</strong> y ubica la sección de Inversión, allí podrás editar el costo unitario (S/.) en el cuadro respectivo.
                  </p>
                  <p className="text-[12px] text-on-surface-variant mt-1.5">
                    El sistema recalculará en automático las hectáreas que puedes cubrir según tu presupuesto y el punto de equilibrio de tu campaña.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección 4: Tarjeta Informativa Institucional de la Oficina Agraria */}
        <section className="bg-surface-container-high rounded-xl p-4 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0 shadow-sm">
              <Building2 size={22} />
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="text-[18px] font-semibold text-on-surface truncate">Oficina Técnica Zonal</h4>
              <span className="text-[10px] text-primary font-bold">Sede Tingo María / Alto Huallaga</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 pt-1">
            <div className="flex items-start gap-2.5">
              <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
              <span className="text-[12px] text-on-surface">Av. Alameda Perú 450, Tingo María, Huánuco</span>
            </div>
            <div className="flex items-start gap-2.5">
              <Clock size={18} className="text-primary shrink-0 mt-0.5" />
              <span className="text-[12px] text-on-surface">Lunes a Sábado: 06:30 AM – 02:00 PM (Horario de Campo)</span>
            </div>
            <div className="flex items-start gap-2.5">
              <PhoneCall size={18} className="text-primary shrink-0 mt-0.5" />
              <span className="text-[12px] text-on-surface">Central: (062) 562-840 • Celular: +51 962 384 102</span>
            </div>
          </div>
          <button className="mt-1 w-full h-11 rounded-lg bg-surface-container-lowest text-primary text-[12px] font-semibold flex items-center justify-center gap-1 shadow-sm hover:bg-surface-container transition-colors" type="button">
            <Map size={18} />
            <span>Ver ubicación de la agencia agraria</span>
          </button>
        </section>

        {/* Mensaje Callejero / Footer Comunitario */}
        <div className="p-3 rounded-lg bg-surface-container-lowest/60 text-center flex items-center justify-center gap-2">
          <Handshake size={18} className="text-secondary" />
          <span className="text-[12px] text-on-surface-variant">Juntos impulsando el rendimiento de tu tierra con AgroPlan Perú.</span>
        </div>
      </div>
    </div>
  );
};
