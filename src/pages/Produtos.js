import React, { useState, useEffect } from 'react';
import FichaTecnica from '../components/FichaTecnica';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Produtos = () => {
  const [produtos, setProdutos] = useState([]);
  const [selectedProdutoId, setSelectedProdutoId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: ''
  });
  const [editingId, setEditingId] = useState(null);

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
      alert('Erro ao buscar produtos');
    }
  };

  const handleVerFicha = (id_produto) => {
    setSelectedProdutoId(id_produto);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.nome || !formData.preco) {
      alert('Nome e Preço são obrigatórios!');
      return;
    }

    try {
      const url = editingId 
        ? `${API_BASE}/api/produtos/${editingId}`
        : `${API_BASE}/api/produtos`;
      
      const method = editingId ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          nome: formData.nome,
          descricao: formData.descricao,
          preco: parseFloat(formData.preco)
        })
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Erro ao salvar produto');
      }

      alert(editingId ? 'Produto atualizado com sucesso!' : 'Produto criado com sucesso!');
      setFormData({ nome: '', descricao: '', preco: '' });
      setShowForm(false);
      setEditingId(null);
      fetchProdutos();
    } catch (err) {
      console.error('Erro:', err);
      alert(err.message);
    }
  };

  const handleEdit = (produto) => {
    setFormData({
      nome: produto.nome,
      descricao: produto.descricao || '',
      preco: produto.preco
    });
    setEditingId(produto.id_produto);
    setShowForm(true);
    setSelectedProdutoId(null);
  };

  const handleDelete = async (id_produto) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) {
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/produtos/${id_produto}`, {
        method: 'DELETE'
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Erro ao deletar produto');
      }

      alert('Produto removido com sucesso!');
      fetchProdutos();
      if (selectedProdutoId === id_produto) {
        setSelectedProdutoId(null);
      }
    } catch (err) {
      console.error('Erro:', err);
      alert(err.message);
    }
  };

  const handleCancelForm = () => {
    setFormData({ nome: '', descricao: '', preco: '' });
    setShowForm(false);
    setEditingId(null);
  };

  const handleNovoProtudo = () => {
    setFormData({ nome: '', descricao: '', preco: '' });
    setEditingId(null);
    setShowForm(true);
    setSelectedProdutoId(null);
  };

  return (
    <div>
      <h2>Gerenciamento de Produtos Finais</h2>
      
      <div className="section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3>Lista de Produtos</h3>
          <button 
            className="btn-action"
            onClick={handleNovoProtudo}
            style={{ backgroundColor: '#28a745' }}
          >
            + Novo Produto
          </button>
        </div>

        {showForm && (
          <div style={{ 
            backgroundColor: '#f8f9fa', 
            padding: '20px', 
            borderRadius: '5px', 
            marginBottom: '20px',
            border: '1px solid #dee2e6'
          }}>
            <h4>{editingId ? 'Editar Produto' : 'Novo Produto'}</h4>
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Nome *
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  required
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc' 
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Descrição
                </label>
                <textarea
                  name="descricao"
                  value={formData.descricao}
                  onChange={handleInputChange}
                  rows="3"
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc' 
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
                  Preço (R$) *
                </label>
                <input
                  type="number"
                  name="preco"
                  value={formData.preco}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                  style={{ 
                    width: '100%', 
                    padding: '8px', 
                    borderRadius: '4px', 
                    border: '1px solid #ccc' 
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  type="submit" 
                  className="btn-action"
                  style={{ backgroundColor: '#007bff' }}
                >
                  {editingId ? 'Atualizar' : 'Cadastrar'}
                </button>
                <button 
                  type="button" 
                  className="btn-action"
                  onClick={handleCancelForm}
                  style={{ backgroundColor: '#6c757d' }}
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Preço Unitário</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                  Nenhum produto cadastrado
                </td>
              </tr>
            ) : (
              produtos.map((produto) => (
                <tr key={produto.id_produto}>
                  <td>{produto.id_produto}</td>
                  <td>{produto.nome}</td>
                  <td>{produto.descricao || '-'}</td>
                  <td>R$ {produto.preco?.toFixed(2) || '0.00'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      <button 
                        className="btn-action"
                        onClick={() => handleVerFicha(produto.id_produto)}
                        style={{ backgroundColor: '#17a2b8' }}
                      >
                        Ficha Técnica
                      </button>
                      <button 
                        className="btn-action"
                        onClick={() => handleEdit(produto)}
                        style={{ backgroundColor: '#ffc107', color: '#000' }}
                      >
                        Editar
                      </button>
                      <button 
                        className="btn-action"
                        onClick={() => handleDelete(produto.id_produto)}
                        style={{ backgroundColor: '#dc3545' }}
                      >
                        Excluir
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
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
