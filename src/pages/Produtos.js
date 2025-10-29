import React, { useState, useEffect } from 'react';
import FichaTecnica from '../components/FichaTecnica';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProdutoId, setSelectedProdutoId] = useState(null);

  // Mock de produtos
  useEffect(() => {
    const produtosMock = [
      {
        id_produto: 'P-001',
        id_categoria: 'CAT-001',
        nome: 'Mesa de Aço',
        preco_unitario: 350.00
      },
      {
        id_produto: 'P-002',
        id_categoria: 'CAT-002',
        nome: 'Cadeira Plástica',
        preco_unitario: 120.00
      },
      {
        id_produto: 'P-003',
        id_categoria: 'CAT-001',
        nome: 'Armário Industrial',
        preco_unitario: 890.00
      }
    ];
    setProdutos(produtosMock);
  }, []);

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
