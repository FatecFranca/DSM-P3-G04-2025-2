import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Ordens = () => {
  const [ordens, setOrdens] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    produto: '',
    cliente: '',
    dataInicio: '',
    status: 'pendente',
    quantidade: ''
  });

  useEffect(() => {
    fetchProdutos();
    fetchClientes();
    fetchOrdens();
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

  const fetchClientes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/clientes`);
      if (!res.ok) throw new Error('Erro ao buscar clientes');
      const data = await res.json();
      setClientes(data);
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  const fetchOrdens = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/ordens-producao`);
      if (!res.ok) throw new Error('Erro ao buscar ordens');
      const data = await res.json();
      setOrdens(data);
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.produto || !formData.dataInicio || !formData.quantidade) {
      alert('Produto, Data de Início e Quantidade são obrigatórios!');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/ordens-producao`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          produto: formData.produto,
          quantidade: parseInt(formData.quantidade),
          dataInicio: new Date(formData.dataInicio).toISOString(),
          status: formData.status,
          pedidoRelacionado: formData.cliente || null
        })
      });
      if (!res.ok) throw new Error('Erro ao criar ordem');
      
      await fetchOrdens();
      setFormData({
        produto: '',
        cliente: '',
        dataInicio: '',
        status: 'pendente',
        quantidade: ''
      });
      alert('Ordem de Produção criada com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
      alert('Falha ao criar ordem');
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Ordens de Produção</h2>
      
      <div className="section">
        <div className="form-minimal">
          <h3>Criar Nova Ordem de Produção</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="produto">Produto *</label>
              <select
                id="produto"
                name="produto"
                value={formData.produto}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecione o Produto --</option>
                {produtos.map((produto) => (
                  <option key={produto._id || produto.id_produto} value={produto._id || produto.id_produto}>
                    {produto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="cliente">Cliente (Opcional - Deixe em branco para estoque)</label>
              <select
                id="cliente"
                name="cliente"
                value={formData.cliente}
                onChange={handleChange}
              >
                <option value="">-- Para Estoque --</option>
                {clientes.map((cliente) => (
                  <option key={cliente._id || cliente.id_cliente} value={cliente._id || cliente.id_cliente}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantidade">Quantidade Planejada *</label>
              <input
                type="number"
                id="quantidade"
                name="quantidade"
                value={formData.quantidade}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dataInicio">Data de Início *</label>
              <input
                type="date"
                id="dataInicio"
                name="dataInicio"
                value={formData.dataInicio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="status">Status *</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                required
              >
                <option value="pendente">Pendente</option>
                <option value="em_producao">Em Produção</option>
                <option value="finalizado">Finalizado</option>
              </select>
            </div>

            <button type="submit">Criar Ordem de Produção</button>
          </form>
        </div>
      </div>

      <div className="section">
        <h3>Lista de Ordens de Produção</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Produto</th>
              <th>Quantidade</th>
              <th>Data Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ordens.map((ordem) => (
              <tr key={ordem._id || ordem.id}>
                <td>{ordem._id ? ordem._id.substring(0, 8) : ordem.id}</td>
                <td>{ordem.produto?.nome || 'N/A'}</td>
                <td>{ordem.quantidade}</td>
                <td>{new Date(ordem.dataInicio).toLocaleDateString('pt-BR')}</td>
                <td>{ordem.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Ordens;
