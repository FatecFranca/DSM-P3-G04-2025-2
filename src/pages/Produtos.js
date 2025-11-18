import React, { useState, useEffect } from 'react';
import FichaTecnica from '../components/FichaTecnica';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProdutoId, setSelectedProdutoId] = useState(null);

  useEffect(() => {
    fetchProdutos();
  }, []);

  const fetchProdutos = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/produtos`);
      if (!res.ok) throw new Error('Erro ao buscar produtos');
      const data = await res.json();
      setProdutos(data);
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  const handleVerFicha = (id_produto) => {
    setSelectedProdutoId(id_produto);
  };

  return (
    <div>
      <h2>Gerenciamento de Produtos Finais</h2>
      
      <div className="section">
        <h3>Lista de Produtos</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Preço Unitário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map((produto) => (
              <tr key={produto.id_produto}>
                <td>{produto.id_produto}</td>
                <td>{produto.nome}</td>
                <td>R$ {produto.preco_unitario.toFixed(2)}</td>
                <td>
                  <button 
                    className="btn-action"
                    onClick={() => handleVerFicha(produto.id_produto)}
                  >
                    Ver Ficha Técnica
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedProdutoId && (
        <div className="section">
          <FichaTecnica id_produto={selectedProdutoId} />
        </div>
      )}
    </div>
  );
};

export default Produtos;
