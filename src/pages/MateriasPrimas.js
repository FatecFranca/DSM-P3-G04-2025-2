import React, { useState, useEffect } from 'react';

const MateriasPrimas = () => {
  const [materias, setMaterias] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    unidade_medida: 'kg'
  });

  // Mock de dados iniciais
  useEffect(() => {
    const materiasMock = [
      {
        id_materia: 'M-001',
        nome: 'Aço Inoxidável',
        descricao: 'Aço inoxidável AISI 304',
        unidade_medida: 'kg'
      },
      {
        id_materia: 'M-002',
        nome: 'Plástico ABS',
        descricao: 'Resina ABS para moldagem',
        unidade_medida: 'kg'
      },
      {
        id_materia: 'M-003',
        nome: 'Tinta Epóxi',
        descricao: 'Tinta de acabamento industrial',
        unidade_medida: 'litro'
      }
    ];
    setMaterias(materiasMock);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nome || !formData.unidade_medida) {
      alert('Nome e Unidade de Medida são obrigatórios!');
      return;
    }
    
    const novaMateria = {
      id_materia: `M-${String(materias.length + 1).padStart(3, '0')}`,
      ...formData
    };
    
    setMaterias([...materias, novaMateria]);
    setFormData({ nome: '', descricao: '', unidade_medida: 'kg' });
    alert('Matéria-prima cadastrada com sucesso!');
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
              <label htmlFor="descricao">Descrição</label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                rows="3"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="unidade_medida">Unidade de Medida *</label>
              <select
                id="unidade_medida"
                name="unidade_medida"
                value={formData.unidade_medida}
                onChange={handleChange}
                required
              >
                <option value="kg">Quilograma (kg)</option>
                <option value="litro">Litro (L)</option>
                <option value="metro">Metro (m)</option>
                <option value="unidade">Unidade (un)</option>
              </select>
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
              <th>Unidade de Medida</th>
            </tr>
          </thead>
          <tbody>
            {materias.map((materia) => (
              <tr key={materia.id_materia}>
                <td>{materia.id_materia}</td>
                <td>{materia.nome}</td>
                <td>{materia.descricao || '-'}</td>
                <td>{materia.unidade_medida}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MateriasPrimas;
