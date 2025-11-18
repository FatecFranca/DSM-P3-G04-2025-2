const mongoose = require('mongoose');

const connectDB = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gestao_fabrica';
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB conectado');
  } catch (err) {
    console.error('Erro ao conectar MongoDB:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
