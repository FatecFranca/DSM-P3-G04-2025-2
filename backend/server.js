require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const clientesRoutes = require('./routes/clientes');
const materiasRoutes = require('./routes/materias');
const notificacoesRoutes = require('./routes/notificacoes');
const ordemProducaoRoutes = require('./routes/ordemProducaoRoutes');
const produtosRoutes = require('./routes/produtos');

const app = express();

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas API
app.use('/api/clientes', clientesRoutes);
app.use('/api/materias', materiasRoutes);
app.use('/api/notificacoes', notificacoesRoutes);
app.use('/api/ordens-producao', ordemProducaoRoutes);
app.use('/api/produtos', produtosRoutes);

app.get('/', (req, res) => {
  res.send({ ok: true, message: 'API Gestão de Fábrica (backend)'});
});

// Middleware de erro simples
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
