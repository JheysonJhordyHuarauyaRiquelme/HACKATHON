import React, { createContext, useState, useEffect } from 'react';
import { db } from '../services/db';

export const AgroContext = createContext();

export const datosCultivos = {
  cacao: { nombre: 'Cacao', distSurco: 3.5, distPlanta: 3.5, forma: 'Cuadrado', densidadOptima: 1111, etapasTotales: 3, precioMercado: 12.5, fuente: 'Devida / INIA' },
  cafe: { nombre: 'Café', distSurco: 2.0, distPlanta: 1.0, forma: 'Tresbolillo', densidadOptima: 5000, etapasTotales: 3, precioMercado: 8.0, fuente: 'Junta Nacional del Café / INIA' },
  maiz: { nombre: 'Maíz', distSurco: 0.8, distPlanta: 0.2, forma: 'Líneas', densidadOptima: 62500, etapasTotales: 2, precioMercado: 1.5, fuente: 'INIA (Manual Maíz Amarillo Duro)' },
  papa: { nombre: 'Papa', distSurco: 0.9, distPlanta: 0.3, forma: 'Líneas', densidadOptima: 37000, etapasTotales: 2, precioMercado: 1.2, fuente: 'INIA / SENASA' }
};

export const AgroProvider = ({ children }) => {
  const [parcelas, setParcelas] = useState([]);
  const [campanas, setCampanas] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estado temporal de la campaña en curso
  const [campanaActual, setCampanaActual] = useState({
    area: '',
    presupuesto: '',
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
      area: '',
      presupuesto: '',
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
