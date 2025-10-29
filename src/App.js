import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Produtos from './pages/Produtos';
import Ordens from './pages/Ordens';
import Clientes from './pages/Clientes';
import MateriasPrimas from './pages/MateriasPrimas';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="/ordens" element={<Ordens />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/materias-primas" element={<MateriasPrimas />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
