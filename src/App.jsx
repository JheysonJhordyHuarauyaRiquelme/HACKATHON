import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AgroProvider } from './context/AgroContext';
import { Layout } from './components/Layout';
import { PlanificadorSiembra } from './views/PlanificadorSiembra';
import { TableroCampana } from './views/TableroCampana';
import { LiquidacionCosecha } from './views/LiquidacionCosecha';
import { Soporte } from './views/Soporte';
import { Historial } from './views/Historial';

function App() {
  return (
    <AgroProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<PlanificadorSiembra />} />
            <Route path="tablero" element={<TableroCampana />} />
            <Route path="liquidacion" element={<LiquidacionCosecha />} />
            <Route path="soporte" element={<Soporte />} />
            <Route path="historial" element={<Historial />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AgroProvider>
  );
}

export default App;
