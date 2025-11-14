import React from 'react';
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="app-container">
      <nav className="sidebar">
        <h1>Gestão de Fábrica</h1>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/ordens">Ordens de Produção</Link>
          </li>
          <li>
            <Link to="/produtos">Produtos Finais</Link>
          </li>
          <li>
            <Link to="/materias-primas">Matérias-Primas</Link>
          </li>
          <li>
            <Link to="/clientes">Clientes</Link>
          </li>
        </ul>
      </nav>
      <main className="content">
        {children}
      </main>
    </div>
  );
};

export default Layout;
