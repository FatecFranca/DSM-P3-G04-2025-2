import React, { useState, useEffect } from 'react';

const FichaTecnica = ({ id_produto }) => {
  const [materiasDisponiveis, setMateriasDisponiveis] = useState([]);
  const [fichaTecnica, setFichaTecnica] = useState([]);
  const [formData, setFormData] = useState({
    id_materia_prima: '',
    quantidade_necessaria: ''
  });

  // Mock de matérias-primas disponíveis
  useEffect(() => {
    const materiasMock = [
      { id_materia: 'M-001', nome: 'Aço Inoxidável', unidade_medida: 'kg' },
      { id_materia: 'M-002', nome: 'Plástico ABS', unidade_medida: 'kg' },
      { id_materia: 'M-003', nome: 'Tinta Epóxi', unidade_medida: 'litro' }
    ];
    setMateriasDisponiveis(materiasMock);

    // Mock de ficha técnica inicial (varia por produto)
    const fichaMock = {
      'P-001': [
        { id_materia_prima: 'M-001', nome: 'Aço Inoxidável', quantidade_necessaria: 0.5, unidade: 'kg' },
        { id_materia_prima: 'M-003', nome: 'Tinta Epóxi', quantidade_necessaria: 0.1, unidade: 'litro' }
      ],
      'P-002': [
        { id_materia_prima: 'M-002', nome: 'Plástico ABS', quantidade_necessaria: 1.0, unidade: 'kg' }
      ],
      'P-003': [
        { id_materia_prima: 'M-001', nome: 'Aço Inoxidável', quantidade_necessaria: 2.0, unidade: 'kg' },
        { id_materia_prima: 'M-002', nome: 'Plástico ABS', quantidade_necessaria: 0.5, unidade: 'kg' }
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

    setFichaTecnica([...fichaTecnica, novoItem]);
    setFormData({ id_materia_prima: '', quantidade_necessaria: '' });
    alert('Item adicionado à ficha técnica!');
  };

  return (
    <div className="ficha-tecnica">
      <h3>Ficha Técnica - Produto {id_produto}</h3>
      
      <div>
        <h4>Composição Atual:</h4>
        {fichaTecnica.length > 0 ? (
          <ul>
            {fichaTecnica.map((item, index) => (
              <li key={index}>
                {item.nome}: {item.quantidade_necessaria} {item.unidade}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum item na ficha técnica ainda.</p>
        )}
      </div>

      <div className="form-minimal" style={{ marginTop: '20px' }}>
        <h4>Adicionar Item à Ficha Técnica</h4>
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

          <button type="submit">Adicionar à Ficha</button>
        </form>
      </div>
    </div>
  );
};

export default FichaTecnica;
