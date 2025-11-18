import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cpf_cnpj: '',
    contato: ''
  });

  useEffect(() => {
    fetchClientes();
  }, []);

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome) {
      alert('Nome é obrigatório!');
      return;
    }
    
    try {
      const res = await fetch(`${API_BASE}/api/clientes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error('Erro ao criar cliente');
      
      await fetchClientes();
      setFormData({ nome: '', cpf_cnpj: '', contato: '' });
      alert('Cliente cadastrado com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
      alert('Falha ao cadastrar cliente');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja remover?')) return;
    try {
      const res = await fetch(`${API_BASE}/api/clientes/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Erro ao remover');
      await fetchClientes();
      alert('Cliente removido com sucesso!');
    } catch (err) {
      console.error('Erro:', err);
      alert('Falha ao remover cliente');
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Clientes</h2>
      
      <div className="section">
        <div className="form-minimal">
          <h3>Cadastrar Novo Cliente</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="cpf_cnpj">CPF/CNPJ</label>
              <input
                type="text"
                id="cpf_cnpj"
                name="cpf_cnpj"
                value={formData.cpf_cnpj}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="contato">Contato</label>
              <input
                type="text"
                id="contato"
                name="contato"
                value={formData.contato}
                onChange={handleChange}
              />
            </div>
            
            <button type="submit">Cadastrar Cliente</button>
          </form>
        </div>
      </div>

      <div className="section">
        <h3>Lista de Clientes</h3>
        {clientes.length === 0 && <p>Nenhum cliente cadastrado.</p>}
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Contato</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf_cnpj || '-'}</td>
                <td>{cliente.contato || '-'}</td>
                <td>
                  <button onClick={() => handleDelete(cliente.id_cliente)} style={{ color: 'red' }}>
                    Remover
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
