import React, { useState, useEffect } from 'react';

const Clientes = () => {
  const [clientes, setClientes] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    cpf_cnpj: '',
    contato: ''
  });

  // Mock de dados iniciais
  useEffect(() => {
    const clientesMock = [
      {
        id_cliente: 'C-001',
        nome: 'João Silva Ltda',
        cpf_cnpj: '12.345.678/0001-90',
        contato: '(16) 3333-4444'
      },
      {
        id_cliente: 'C-002',
        nome: 'Maria Comércio S.A.',
        cpf_cnpj: '98.765.432/0001-10',
        contato: '(16) 3555-6666'
      }
    ];
    setClientes(clientesMock);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome) {
      alert('Nome é obrigatório!');
      return;
    }
    
    const novoCliente = {
      id_cliente: `C-${String(clientes.length + 1).padStart(3, '0')}`,
      ...formData
    };
    
    setClientes([...clientes, novoCliente]);
    setFormData({ nome: '', cpf_cnpj: '', contato: '' });
    alert('Cliente cadastrado com sucesso!');
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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>CPF/CNPJ</th>
              <th>Contato</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map((cliente) => (
              <tr key={cliente.id_cliente}>
                <td>{cliente.id_cliente}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.cpf_cnpj || '-'}</td>
                <td>{cliente.contato || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clientes;
