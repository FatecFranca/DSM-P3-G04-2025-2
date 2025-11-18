import React, { useState, useEffect } from 'react';

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const MateriasPrimas = () => {
  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({ nome: '', descricao: '', unidade_medida: 'kg', estoque: 0 });
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    fetchMaterias();
    fetchNotificacoes();
  }, []);

  const fetchMaterias = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/materias`);
      const data = await res.json();
      setMaterias(data);
    } catch (err) {
      console.error('Erro ao buscar matérias-primas:', err);
    }
  };

  const fetchNotificacoes = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/notificacoes`);
      const data = await res.json();
      setNotificacoes(data);
    } catch (err) {
      console.error('Erro ao buscar notificações:', err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.unidade_medida) {
      alert('Nome e Unidade de Medida são obrigatórios!');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/materias`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, estoque: Number(formData.estoque) })
      });
      if (!res.ok) throw new Error('Erro ao criar matéria-prima');
      await fetchMaterias();
      setFormData({ nome: '', descricao: '', unidade_medida: 'kg', estoque: 0 });
      fetchNotificacoes();
      alert('Matéria-prima cadastrada com sucesso!');
    } catch (err) {
      console.error(err);
      alert('Falha ao cadastrar matéria-prima');
    }
  };

  const handleUpdateEstoque = async (id, novoEstoque) => {
    try {
      const res = await fetch(`${API_BASE}/api/materias/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estoque: Number(novoEstoque) })
      });
      if (!res.ok) throw new Error('Erro ao atualizar estoque');
      await fetchMaterias();
      fetchNotificacoes();
    } catch (err) {
      console.error(err);
      alert('Falha ao atualizar estoque');
    }
  };

  const markNotificationRead = async (id) => {
    try {
      const res = await fetch(`${API_BASE}/api/notificacoes/${id}/ler`, { method: 'PUT' });
      if (!res.ok) throw new Error('Erro ao marcar notificação');
      fetchNotificacoes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Gerenciamento de Matérias-Primas</h2>

      <div className="section">
        <div className="form-minimal">
          <h3>Cadastrar Nova Matéria-Prima</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nome">Nome *</label>
              <input type="text" id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label htmlFor="descricao">Descrição</label>
              <textarea id="descricao" name="descricao" value={formData.descricao} onChange={handleChange} rows="3" />
            </div>

            <div className="form-group">
              <label htmlFor="unidade_medida">Unidade de Medida *</label>
              <select id="unidade_medida" name="unidade_medida" value={formData.unidade_medida} onChange={handleChange} required>
                <option value="kg">Quilograma (kg)</option>
                <option value="litro">Litro (L)</option>
                <option value="metro">Metro (m)</option>
                <option value="unidade">Unidade (un)</option>
                <option value="placa">Placa (placa)</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="estoque">Estoque inicial</label>
              <input type="number" id="estoque" name="estoque" value={formData.estoque} onChange={handleChange} />
            </div>

            <button type="submit">Cadastrar Matéria-Prima</button>
          </form>
        </div>
      </div>

      <div className="section">
        <h3>Lista de Matérias-Primas</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Unidade</th>
              <th>Estoque</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.id_materia}>
                <td>{materia.id_materia}</td>
                <td>{materia.nome}</td>
                <td>{materia.descricao || '-'}</td>
                <td>{materia.unidade_medida}</td>
                <td>{materia.estoque ?? 0}</td>
                <td>
                  <button onClick={() => {
                    const novo = prompt('Novo valor de estoque (número):', String(materia.estoque ?? 0));
                    if (novo !== null) handleUpdateEstoque(materia.id_materia, Number(novo));
                  }}>Atualizar Estoque</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h3>Notificações</h3>
        {notificacoes.length === 0 && <p>Sem notificações.</p>}
        <ul>
          {notificacoes.map((n) => (
            <li key={n._id} style={{ marginBottom: 8 }}>
              <strong>{n.tipo}</strong>: {n.mensagem} {n.lida ? '(lida)' : ''}
              {!n.lida && <button style={{ marginLeft: 8 }} onClick={() => markNotificationRead(n._id)}>Marcar como lida</button>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MateriasPrimas;
