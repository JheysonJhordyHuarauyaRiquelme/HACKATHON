// src/services/db.js

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const db = {
  async inicializarDB() {
    await delay(300); // Simulando asincronía
    
    let parcelas = JSON.parse(localStorage.getItem('yachay_parcelas'));
    let campanas = JSON.parse(localStorage.getItem('yachay_campanas'));

    if (!parcelas || parcelas.length === 0) {
      parcelas = [
        {
          id: 'p1',
          nombre: 'Parcela El Naranjo',
          cultivo: 'cacao',
          area: 3.5
        }
      ];
      localStorage.setItem('yachay_parcelas', JSON.stringify(parcelas));
    }

    if (!campanas || campanas.length === 0) {
      campanas = [
        {
          id: 'c1',
          parcela_id: 'p1',
          cultivo: 'cacao',
          area: 3.5,
          anio: new Date().getFullYear() - 1,
          densidad_planeada: 1111,
          etapas_nutricion_completadas: 2, // De 3
          rendimiento_real: 800, // kg/ha
          ganancia_neta: 15000,
          dinero_perdido: 2000
        }
      ];
      localStorage.setItem('yachay_campanas', JSON.stringify(campanas));
    }
  },

  async obtenerParcelas() {
    await delay(200);
    return JSON.parse(localStorage.getItem('yachay_parcelas')) || [];
  },

  async obtenerCampanas() {
    await delay(200);
    return JSON.parse(localStorage.getItem('yachay_campanas')) || [];
  },

  async insertarCampana(datosCampana) {
    await delay(400);
    const campanas = JSON.parse(localStorage.getItem('yachay_campanas')) || [];
    const nuevaCampana = {
      id: `c_${Date.now()}`,
      ...datosCampana
    };
    campanas.push(nuevaCampana);
    localStorage.setItem('yachay_campanas', JSON.stringify(campanas));
    return nuevaCampana;
  }
};
