import React, { createContext, useState, useEffect } from 'react';
import { db } from '../services/db';

export const AgroContext = createContext();

export const datosCultivos = {
  cacao: { 
    nombre: 'Cacao', 
    distSurco: 3.5, 
    distPlanta: 3.5, 
    forma: 'Cuadrado', 
    densidadOptima: 1111, 
    etapasTotales: 4, 
    precioMercado: 12.5, 
    costoUnitario: 4.50, 
    fuente: 'Devida / INIA',
    etapas: [
      {
        id: 1,
        fase: '🌱 Plantación en campo',
        duracion: 'Mes 1 - 2',
        objetivo: 'Que la plantita agarre bien la raíz y no se muera',
        cuandoAplicar: 'Al momento de plantar, echar al fondo del hoyo',
        insumoRecomendado: 'Guano de Isla (un puñado por hoyo)',
        alternativa: 'Si no hay Guano de Isla, usar compost bien descompuesto o gallinaza seca',
        alertaRiesgo: 'La plantita tarda el doble en prender y se puede morir en las primeras semanas.',
        dependeDe: null,
        tipo: 'independiente',
        costoPromedio: 180,
        icono: 'Sprout'
      },
      {
        id: 2,
        fase: '🌿 Crecimiento de ramas y hojas',
        duracion: 'Mes 3 - 6',
        objetivo: 'Que la planta crezca con bastante rama y hoja verde',
        cuandoAplicar: 'A los 3 meses de plantado. Repetir a los 5 meses',
        insumoRecomendado: 'Urea (un puñado alrededor de la planta) + Compost',
        alternativa: 'Estiércol de cuy o ganado bien podrido. También sirve biol casero',
        alertaRiesgo: 'Las hojas se ponen amarillas y la planta se queda chiquita, no crece bien.',
        dependeDe: 1,
        tipo: 'dependiente',
        costoPromedio: 260,
        icono: 'Trees'
      },
      {
        id: 3,
        fase: '🌸 Floración (Sale la flor)',
        duracion: 'Mes 7 - 9',
        objetivo: 'Que las flores cuajen y no se caigan',
        cuandoAplicar: 'Cuando veas las primeras flores. Aplicar cada 15 días por 2 meses',
        insumoRecomendado: 'Abono foliar con Calcio y Boro (rociar a las hojas)',
        alternativa: 'Ceniza de cocina disuelta en agua + cáscara de huevo molida al suelo',
        alertaRiesgo: 'Las flores se caen y no se forman mazorcas. Pierdes gran parte de la cosecha.',
        dependeDe: 2,
        tipo: 'dependiente',
        costoPromedio: 320,
        icono: 'Flower2'
      },
      {
        id: 4,
        fase: '🍫 Llenado de mazorca',
        duracion: 'Mes 10 - 12',
        objetivo: 'Que la mazorca llene bien, pese más y tenga buen aroma',
        cuandoAplicar: 'Cuando la mazorca tenga 3-4 meses en la planta. Una sola aplicación',
        insumoRecomendado: 'Sulfato de Potasio (al suelo, alrededor de la planta)',
        alternativa: 'Ceniza de leña o cáscara de plátano seca picada al suelo',
        alertaRiesgo: 'Las mazorcas salen chiquitas y el grano queda vacío (vano), pagan menos.',
        dependeDe: null,
        tipo: 'independiente',
        costoPromedio: 390,
        icono: 'Apple'
      }
    ]
  },
  cafe: { 
    nombre: 'Café', 
    distSurco: 2.0, 
    distPlanta: 1.0, 
    forma: 'Tresbolillo', 
    densidadOptima: 5000, 
    etapasTotales: 4, 
    precioMercado: 8.0, 
    costoUnitario: 1.50, 
    fuente: 'Junta Nacional del Café / INIA',
    etapas: [
      {
        id: 1,
        fase: '🌱 Vivero y Trasplante',
        duracion: 'Mes 1 - 2',
        objetivo: 'Que el plantín agarre buena raíz al trasplantar',
        cuandoAplicar: 'Al momento de trasplantar al campo definitivo',
        insumoRecomendado: 'Roca Fosfórica o Guano de Isla al fondo del hoyo',
        alternativa: 'Compost maduro o humus de lombriz al fondo del hoyo',
        alertaRiesgo: 'Las raíces crecen torcidas y débiles, la planta nunca agarra fuerza.',
        dependeDe: null,
        tipo: 'independiente',
        costoPromedio: 150,
        icono: 'Sprout'
      },
      {
        id: 2,
        fase: '🌿 Crecimiento y formación',
        duracion: 'Mes 3 - 7',
        objetivo: 'Que salgan ramas fuertes con bastantes nudos para cargar',
        cuandoAplicar: 'A los 3 meses y repetir a los 6 meses del trasplante',
        insumoRecomendado: 'Abono completo (NPK 20-10-10) o Guano tamizado',
        alternativa: 'Compost + Biol casero (a base de estiércol fermentado)',
        alertaRiesgo: 'Las ramas crecen débiles y no cargan bien cereza.',
        dependeDe: 1,
        tipo: 'dependiente',
        costoPromedio: 280,
        icono: 'Trees'
      },
      {
        id: 3,
        fase: '🌸 Floración',
        duracion: 'Mes 8 - 9',
        objetivo: 'Que las flores se mantengan y no se caigan con la lluvia',
        cuandoAplicar: 'Apenas aparecen las primeras flores. Rociar cada 15 días',
        insumoRecomendado: 'Foliar con Calcio, Boro y Magnesio (rociar a las hojas)',
        alternativa: 'Agua con ceniza de fogón + cáscara de huevo molida al suelo',
        alertaRiesgo: 'La flor se cae antes de cuajar y la cosecha baja hasta un 40%.',
        dependeDe: 2,
        tipo: 'dependiente',
        costoPromedio: 290,
        icono: 'Flower2'
      },
      {
        id: 4,
        fase: '☕ Llenado de cereza (grano)',
        duracion: 'Mes 10 - 12',
        objetivo: 'Que el grano sea grande, pesado y con buen sabor en taza',
        cuandoAplicar: 'Cuando la cereza esté verde, 2 meses antes de cosechar',
        insumoRecomendado: 'Sulfato de Potasio + Zinc foliar',
        alternativa: 'Ceniza de leña al suelo + Biol foliar casero',
        alertaRiesgo: 'El grano sale arrugado y liviano, pagan menos por quintal.',
        dependeDe: null,
        tipo: 'independiente',
        costoPromedio: 360,
        icono: 'Coffee'
      }
    ]
  },
  maiz: { 
    nombre: 'Maíz', 
    distSurco: 0.8, 
    distPlanta: 0.2, 
    forma: 'Líneas', 
    densidadOptima: 62500, 
    etapasTotales: 3, 
    precioMercado: 1.5, 
    costoUnitario: 0.20, 
    fuente: 'INIA (Manual Maíz Amarillo Duro)',
    etapas: [
      {
        id: 1,
        fase: '🌱 Siembra y nacimiento',
        duracion: 'Día 1 al 20',
        objetivo: 'Que todas las semillas nazcan parejas y fuertes',
        cuandoAplicar: 'Al momento de sembrar, echar abono al fondo del surco',
        insumoRecomendado: 'Fosfato Diamónico (DAP) al fondo del surco',
        alternativa: 'Guano de Isla al fondo del surco (2 puñados por metro)',
        alertaRiesgo: 'Las plantas nacen disparejas y unas tapan a otras, baja el rendimiento.',
        dependeDe: null,
        tipo: 'independiente',
        costoPromedio: 200,
        icono: 'Sprout'
      },
      {
        id: 2,
        fase: '🌿 Aporque y abonado',
        duracion: 'Día 21 al 50',
        objetivo: 'Que la caña crezca gruesa y aguante el peso de la mazorca',
        cuandoAplicar: 'A los 20-25 días del nacimiento, junto con el aporque. Segundo abonado a los 40 días',
        insumoRecomendado: 'Urea (al costado de la planta, tapado con tierra)',
        alternativa: 'Estiércol de ganado o gallinaza. Si hay cogollero, usar ceniza en el cogollo',
        alertaRiesgo: 'La caña sale delgada y la mazorca queda corta con pocos granos.',
        dependeDe: 1,
        tipo: 'dependiente',
        costoPromedio: 350,
        icono: 'Wheat'
      },
      {
        id: 3,
        fase: '🌽 Floración y llenado de grano',
        duracion: 'Día 51 al 90',
        objetivo: 'Que la mazorca llene bien hasta la punta',
        cuandoAplicar: 'Cuando aparece la panoja (flor arriba). Una sola aplicación basta',
        insumoRecomendado: 'Cloruro de Potasio al suelo',
        alternativa: 'Ceniza de leña al pie de la planta (3 puñados por planta)',
        alertaRiesgo: 'La mazorca queda incompleta en la punta, se pierde peso y calidad.',
        dependeDe: null,
        tipo: 'independiente',
        costoPromedio: 300,
        icono: 'Apple'
      }
    ]
  },
  papa: { 
    nombre: 'Papa', 
    distSurco: 0.9, 
    distPlanta: 0.3, 
    forma: 'Líneas', 
    densidadOptima: 37000, 
    etapasTotales: 3, 
    precioMercado: 1.2, 
    costoUnitario: 0.50, 
    fuente: 'INIA / SENASA',
    etapas: [
      {
        id: 1,
        fase: '🌱 Siembra y brotamiento',
        duracion: 'Día 1 al 30',
        objetivo: 'Que la semilla brote rápido y con fuerza',
        cuandoAplicar: 'Al momento de sembrar, mezclar el abono con la tierra del surco',
        insumoRecomendado: 'Guano de Isla (un puñado por mata)',
        alternativa: 'Compost maduro o estiércol seco de cuy o gallina',
        alertaRiesgo: 'Sale poca papa por mata porque no se formaron suficientes raíces.',
        dependeDe: null,
        tipo: 'independiente',
        costoPromedio: 250,
        icono: 'Sprout'
      },
      {
        id: 2,
        fase: '🌿 Aporque y formación de papa',
        duracion: 'Día 31 al 70',
        objetivo: 'Que se formen bastantes papas debajo de la tierra',
        cuandoAplicar: 'Al momento del aporque (cuando la planta tiene 20cm). Solo una vez',
        insumoRecomendado: 'Urea + Cal agrícola (alrededor de la planta, antes de aporcar)',
        alternativa: 'Estiércol bien podrido + ceniza de fogón. Aporcar bien alto',
        alertaRiesgo: 'Las papas se ponen verdes por el sol o les entra polilla.',
        dependeDe: 1,
        tipo: 'dependiente',
        costoPromedio: 400,
        icono: 'Trees'
      },
      {
        id: 3,
        fase: '🥔 Engorde de papa',
        duracion: 'Día 71 al 120',
        objetivo: 'Que las papas crezcan de tamaño grande (para vender como Primera)',
        cuandoAplicar: 'Cuando la planta empieza a florecer. Una sola aplicación',
        insumoRecomendado: 'Sulfato de Potasio al suelo',
        alternativa: 'Ceniza de leña + cáscara de plátano seca molida al suelo',
        alertaRiesgo: 'Las papas salen chiquitas (Segunda o Descarte), se venden a bajo precio.',
        dependeDe: null,
        tipo: 'independiente',
        costoPromedio: 380,
        icono: 'Apple'
      }
    ]
  }
};

export const AgroProvider = ({ children }) => {
  const [parcelas, setParcelas] = useState([]);
  const [campanas, setCampanas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado temporal de la campaña en curso
  const [campanaActual, setCampanaActual] = useState({
    presupuesto: '',
    costoUnitarioUser: '',
    area: '',
    plantonesComprables: 0,
    cultivo: '',
    distSurco: '',
    distPlanta: '',
    densidadCalculada: 0,
    costoEstimado: 0,
    etapas_nutricion_completadas: 0,
  });

  useEffect(() => {
    const inicializar = async () => {
      await db.inicializarDB();
      const p = await db.obtenerParcelas();
      const c = await db.obtenerCampanas();
      setParcelas(p);
      setCampanas(c);
      setLoading(false);
    };
    inicializar();
  }, []);

  const actualizarCampanaActual = (nuevosDatos) => {
    setCampanaActual(prev => ({ ...prev, ...nuevosDatos }));
  };

  const reiniciarCampanaActual = () => {
    setCampanaActual({
      presupuesto: '',
      costoUnitarioUser: '',
      area: '',
      plantonesComprables: 0,
      cultivo: '',
      distSurco: '',
      distPlanta: '',
      densidadCalculada: 0,
      costoEstimado: 0,
      etapas_nutricion_completadas: 0,
    });
  };

  return (
    <AgroContext.Provider value={{
      parcelas,
      campanas,
      loading,
      datosCultivos,
      campanaActual,
      actualizarCampanaActual,
      reiniciarCampanaActual,
      setCampanas
    }}>
      {children}
    </AgroContext.Provider>
  );
};
