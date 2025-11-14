import React, { useState, useEffect } from 'react';

const Ordens = () => {
  const [ordens, setOrdens] = useState([]);
  const [produtos, setProdutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    id_produto: '',
    id_cliente: '',
    data_inicio: '',
    status: 'Pendente',
    quantidade_planejada: ''
  });

  // Mock de dados
  useEffect(() => {
    const produtosMock = [
      { id_produto: 'P-001', nome: 'Mesa de Aço' },
      { id_produto: 'P-002', nome: 'Cadeira Plástica' },
      { id_produto: 'P-003', nome: 'Armário Industrial' }
    ];
    setProdutos(produtosMock);

    const clientesMock = [
      { id_cliente: 'C-001', nome: 'João Silva Ltda' },
      { id_cliente: 'C-002', nome: 'Maria Comércio S.A.' }
    ];
    setClientes(clientesMock);

    const ordensMock = [
      {
        id_ordem: 'OP-001',
        id_produto: 'P-001',
        nome_produto: 'Mesa de Aço',
        id_cliente: 'C-001',
        nome_cliente: 'João Silva Ltda',
        data_inicio: '2025-10-20',
        status: 'Em Produção',
        quantidade_planejada: 50
      },
      {
        id_ordem: 'OP-002',
        id_produto: 'P-002',
        nome_produto: 'Cadeira Plástica',
        id_cliente: '',
        nome_cliente: 'Para Estoque',
        data_inicio: '2025-10-25',
        status: 'Pendente',
        quantidade_planejada: 100
      }
    ];
    setOrdens(ordensMock);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id_produto || !formData.data_inicio || !formData.quantidade_planejada) {
      alert('Produto, Data de Início e Quantidade são obrigatórios!');
      return;
    }

    const produtoSelecionado = produtos.find(p => p.id_produto === formData.id_produto);
    const clienteSelecionado = clientes.find(c => c.id_cliente === formData.id_cliente);

    const novaOrdem = {
      id_ordem: `OP-${String(ordens.length + 1).padStart(3, '0')}`,
      ...formData,
      nome_produto: produtoSelecionado.nome,
      nome_cliente: formData.id_cliente ? clienteSelecionado.nome : 'Para Estoque',
      quantidade_planejada: parseInt(formData.quantidade_planejada)
    };

    setOrdens([...ordens, novaOrdem]);
    setFormData({
      id_produto: '',
      id_cliente: '',
      data_inicio: '',
      status: 'Pendente',
      quantidade_planejada: ''
    });
    alert('Ordem de Produção criada com sucesso!');
  };

  return (
    <div>
      <h2>Gerenciamento de Ordens de Produção</h2>
      
      <div className="section">
        <div className="form-minimal">
          <h3>Criar Nova Ordem de Produção</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="id_produto">Produto *</label>
              <select
                id="id_produto"
                name="id_produto"
                value={formData.id_produto}
                onChange={handleChange}
                required
              >
                <option value="">-- Selecione o Produto --</option>
                {produtos.map((produto) => (
                  <option key={produto.id_produto} value={produto.id_produto}>
                    {produto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="id_cliente">Cliente (Opcional - Deixe em branco para estoque)</label>
              <select
                id="id_cliente"
                name="id_cliente"
                value={formData.id_cliente}
                onChange={handleChange}
              >
                <option value="">-- Para Estoque --</option>
                {clientes.map((cliente) => (
                  <option key={cliente.id_cliente} value={cliente.id_cliente}>
                    {cliente.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="quantidade_planejada">Quantidade Planejada *</label>
              <input
                type="number"
                id="quantidade_planejada"
                name="quantidade_planejada"
                value={formData.quantidade_planejada}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="data_inicio">Data de Início *</label>
              <input
                type="date"
                id="data_inicio"
                name="data_inicio"
                value={formData.data_inicio}
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
                <option value="Pendente">Pendente</option>
                <option value="Em Produção">Em Produção</option>
                <option value="Concluída">Concluída</option>
                <option value="Cancelada">Cancelada</option>
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
              <th>Cliente</th>
              <th>Quantidade</th>
              <th>Data Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {ordens.map((ordem) => (
              <tr key={ordem.id_ordem}>
                <td>{ordem.id_ordem}</td>
                <td>{ordem.nome_produto}</td>
                <td>{ordem.nome_cliente}</td>
                <td>{ordem.quantidade_planejada}</td>
                <td>{new Date(ordem.data_inicio).toLocaleDateString('pt-BR')}</td>
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
