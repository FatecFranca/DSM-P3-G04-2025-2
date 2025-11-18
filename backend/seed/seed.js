require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../config/db');
const Cliente = require('../models/Cliente');
const MateriaPrima = require('../models/MateriaPrima');
const Notificacao = require('../models/Notificacao');
const Produto = require('../models/Produto');

(async () => {
  try {
    await connectDB();

    // Limpar coleções
    await Cliente.deleteMany({});
    await MateriaPrima.deleteMany({});
    await Notificacao.deleteMany({});
    await Produto.deleteMany({});

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

    await Cliente.insertMany(clientesMock);

    // Inserir matérias-primas com estoques de exemplo
    const materiasMock = [
      {
        id_materia: 'M-001',
        nome: 'Placa circuito XYZ',
        descricao: 'Placas para montagem de painéis',
        unidade_medida: 'placa',
        estoque: 360
      },
      {
        id_materia: 'M-002',
        nome: 'Plástico ABS',
        descricao: 'Resina ABS para moldagem',
        unidade_medida: 'kg',
        estoque: 120
      },
      {
        id_materia: 'M-003',
        nome: 'Placa sinalização',
        descricao: 'Placas pequenas para acabamento',
        unidade_medida: 'placa',
        estoque: 350
      }
    ];

    await MateriaPrima.insertMany(materiasMock);

    // Criar notificações para matérias-primas com estoque baixo (<= 350 placas)
    for (const m of materiasMock) {
      if (m.unidade_medida && m.unidade_medida.toLowerCase().includes('placa') && m.estoque <= 350) {
        await Notificacao.create({
          tipo: 'estoque_baixo',
          mensagem: `Matéria-prima "${m.nome}" (ID ${m.id_materia}) está com ${m.estoque} placas — estoque baixo.`,
          referencia: m.id_materia
        });
      }
    }

    // Inserir produtos de exemplo
    const produtosMock = [
      { id_produto: 'P-001', nome: 'Mesa de Aço', descricao: 'Mesa de aço inoxidável', preco: 350.00 },
      { id_produto: 'P-002', nome: 'Cadeira Plástica', descricao: 'Cadeira feita com plástico ABS', preco: 120.00 },
      { id_produto: 'P-003', nome: 'Armário Industrial', descricao: 'Armário para armazenamento industrial', preco: 890.00 }
    ];

    await Produto.insertMany(produtosMock);

    console.log('✅ Seed finalizado com sucesso!');
    console.log('   - 2 clientes inseridos');
    console.log('   - 3 matérias-primas inseridas');
    console.log('   - 3 produtos inseridos');
    console.log('   - Notificações de estoque baixo criadas');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erro no seed:', err.message);
    process.exit(1);
  }
})();
