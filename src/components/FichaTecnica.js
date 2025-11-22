import React, { useState, useEffect } from 'react';

const FichaTecnica = ({ id_produto }) => {
  const [materiasDisponiveis, setMateriasDisponiveis] = useState([]);
  const [fichaTecnica, setFichaTecnica] = useState([]);
  const [formData, setFormData] = useState({
    id_materia_prima: '',
    quantidade_necessaria: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  // Mock de matérias-primas disponíveis - Fábrica de Cartonagem
  useEffect(() => {
    const materiasMock = [
      { id_materia: 'M-001', nome: 'Papelão Ondulado Simples', unidade_medida: 'm²' },
      { id_materia: 'M-002', nome: 'Papelão Ondulado Duplo', unidade_medida: 'm²' },
      { id_materia: 'M-003', nome: 'Papel Kraft', unidade_medida: 'kg' },
      { id_materia: 'M-004', nome: 'Cola Branca Industrial', unidade_medida: 'kg' },
      { id_materia: 'M-005', nome: 'Tinta Flexográfica', unidade_medida: 'litro' },
      { id_materia: 'M-006', nome: 'Fita Adesiva Kraft', unidade_medida: 'metro' },
      { id_materia: 'M-007', nome: 'Grampos Metálicos', unidade_medida: 'unidade' },
      { id_materia: 'M-008', nome: 'Verniz Protetor', unidade_medida: 'litro' }
    ];
    setMateriasDisponiveis(materiasMock);

    // Mock de ficha técnica inicial (varia por produto)
    const fichaMock = {
      'P-001': [
        { id_materia_prima: 'M-001', nome: 'Papelão Ondulado Simples', quantidade_necessaria: 0.12, unidade: 'm²' },
        { id_materia_prima: 'M-004', nome: 'Cola Branca Industrial', quantidade_necessaria: 0.05, unidade: 'kg' },
        { id_materia_prima: 'M-007', nome: 'Grampos Metálicos', quantidade_necessaria: 4, unidade: 'unidade' }
      ],
      'P-002': [
        { id_materia_prima: 'M-002', nome: 'Papelão Ondulado Duplo', quantidade_necessaria: 0.35, unidade: 'm²' },
        { id_materia_prima: 'M-004', nome: 'Cola Branca Industrial', quantidade_necessaria: 0.08, unidade: 'kg' },
        { id_materia_prima: 'M-007', nome: 'Grampos Metálicos', quantidade_necessaria: 6, unidade: 'unidade' }
      ],
      'P-003': [
        { id_materia_prima: 'M-002', nome: 'Papelão Ondulado Duplo', quantidade_necessaria: 0.8, unidade: 'm²' },
        { id_materia_prima: 'M-004', nome: 'Cola Branca Industrial', quantidade_necessaria: 0.15, unidade: 'kg' },
        { id_materia_prima: 'M-006', nome: 'Fita Adesiva Kraft', quantidade_necessaria: 1.5, unidade: 'metro' },
        { id_materia_prima: 'M-007', nome: 'Grampos Metálicos', quantidade_necessaria: 8, unidade: 'unidade' }
      ],
      'P-004': [
        { id_materia_prima: 'M-002', nome: 'Papelão Ondulado Duplo', quantidade_necessaria: 0.5, unidade: 'm²' },
        { id_materia_prima: 'M-005', nome: 'Tinta Flexográfica', quantidade_necessaria: 0.2, unidade: 'litro' },
        { id_materia_prima: 'M-004', nome: 'Cola Branca Industrial', quantidade_necessaria: 0.1, unidade: 'kg' },
        { id_materia_prima: 'M-008', nome: 'Verniz Protetor', quantidade_necessaria: 0.1, unidade: 'litro' }
      ],
      'P-005': [
        { id_materia_prima: 'M-002', nome: 'Papelão Ondulado Duplo', quantidade_necessaria: 1.2, unidade: 'm²' },
        { id_materia_prima: 'M-005', nome: 'Tinta Flexográfica', quantidade_necessaria: 0.3, unidade: 'litro' },
        { id_materia_prima: 'M-004', nome: 'Cola Branca Industrial', quantidade_necessaria: 0.2, unidade: 'kg' },
        { id_materia_prima: 'M-008', nome: 'Verniz Protetor', quantidade_necessaria: 0.15, unidade: 'litro' }
      ]
    };
    
    setFichaTecnica(fichaMock[id_produto] || []);
  }, [id_produto]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.id_materia_prima || !formData.quantidade_necessaria) {
      alert('Todos os campos são obrigatórios!');
      return;
    }

    const materiaSelecionada = materiasDisponiveis.find(
      m => m.id_materia === formData.id_materia_prima
    );

    const novoItem = {
      id_materia_prima: formData.id_materia_prima,
      nome: materiaSelecionada.nome,
      quantidade_necessaria: parseFloat(formData.quantidade_necessaria),
      unidade: materiaSelecionada.unidade_medida
    };

    if (editingIndex !== null) {
      // Editando item existente
      const novaFicha = [...fichaTecnica];
      novaFicha[editingIndex] = novoItem;
      setFichaTecnica(novaFicha);
      setEditingIndex(null);
      alert('Item atualizado com sucesso!');
    } else {
      // Adicionando novo item
      setFichaTecnica([...fichaTecnica, novoItem]);
      alert('Item adicionado à ficha técnica!');
    }
    
    setFormData({ id_materia_prima: '', quantidade_necessaria: '' });
  };

  const handleEdit = (index) => {
    const item = fichaTecnica[index];
    setFormData({
      id_materia_prima: item.id_materia_prima,
      quantidade_necessaria: item.quantidade_necessaria
    });
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    if (!window.confirm('Deseja remover este item da composição?')) {
      return;
    }
    const novaFicha = fichaTecnica.filter((_, i) => i !== index);
    setFichaTecnica(novaFicha);
    alert('Item removido com sucesso!');
  };

  const handleCancelEdit = () => {
    setFormData({ id_materia_prima: '', quantidade_necessaria: '' });
    setEditingIndex(null);
  };

  return (
    <div className="ficha-tecnica">
      <h3>Ficha Técnica - Produto {id_produto}</h3>
      
      <div>
        <h4>Composição Atual:</h4>
        {fichaTecnica.length > 0 ? (
          <table style={{ width: '100%', marginTop: '10px', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #dee2e6' }}>
                <th style={{ padding: '10px', textAlign: 'left' }}>Matéria-Prima</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Quantidade</th>
                <th style={{ padding: '10px', textAlign: 'left' }}>Unidade</th>
                <th style={{ padding: '10px', textAlign: 'center' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {fichaTecnica.map((item, index) => (
                <tr key={index} style={{ borderBottom: '1px solid #dee2e6' }}>
                  <td style={{ padding: '10px' }}>{item.nome}</td>
                  <td style={{ padding: '10px' }}>{item.quantidade_necessaria}</td>
                  <td style={{ padding: '10px' }}>{item.unidade}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button
                      type="button"
                      onClick={() => handleEdit(index)}
                      style={{
                        padding: '5px 10px',
                        marginRight: '5px',
                        backgroundColor: '#ffc107',
                        color: '#000',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(index)}
                      style={{
                        padding: '5px 10px',
                        backgroundColor: '#dc3545',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                      }}
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Nenhum item na ficha técnica ainda.</p>
        )}
      </div>

      <div className="form-minimal" style={{ marginTop: '20px' }}>
        <h4>{editingIndex !== null ? 'Editar Item' : 'Adicionar Item à Ficha Técnica'}</h4>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id_materia_prima">Matéria-Prima</label>
            <select
              id="id_materia_prima"
              name="id_materia_prima"
              value={formData.id_materia_prima}
              onChange={handleChange}
              required
            >
              <option value="">-- Selecione --</option>
              {materiasDisponiveis.map((materia) => (
                <option key={materia.id_materia} value={materia.id_materia}>
                  {materia.nome} ({materia.unidade_medida})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="quantidade_necessaria">Quantidade Necessária</label>
            <input
              type="number"
              id="quantidade_necessaria"
              name="quantidade_necessaria"
              value={formData.quantidade_necessaria}
              onChange={handleChange}
              step="0.01"
              min="0.01"
              required
            />
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              type="submit"
              style={{
                padding: '8px 16px',
                backgroundColor: editingIndex !== null ? '#007bff' : '#28a745',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {editingIndex !== null ? 'Atualizar Item' : 'Adicionar à Ficha'}
            </button>
            {editingIndex !== null && (
              <button 
                type="button"
                onClick={handleCancelEdit}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6c757d',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default FichaTecnica;
