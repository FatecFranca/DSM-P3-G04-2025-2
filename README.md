# 📦 Sistema de Gestão de Fábrica de Cartonagem

📋 **Sobre o Projeto**  
Repositório do **GRUPO 04** do Projeto Interdisciplinar do **3º semestre DSM 2025/2**.

Sistema de Gerenciamento de Fábrica de Cartonagem — aplicação full‑stack para gerenciamento de produção de embalagens de papelão, incluindo clientes, matérias‑primas, produtos finais, fichas técnicas e ordens de produção.

---

# 🎥 Demonstração em Vídeo + 🌐 Links Render

👉 **YouTube:** [https://youtu.be/8puKJahWwEw](https://youtu.be/8puKJahWwEw)
👉 **Frontend (Render):** [https://sistema-de-gestao-de-fabrica.onrender.com/](https://sistema-de-gestao-de-fabrica.onrender.com/) 
👉 **Backend (Render):** [https://sistema-de-gestao-de-fabrica-de.onrender.com](https://sistema-de-gestao-de-fabrica-de.onrender.com)

[![Vídeo de Demonstração](https://img.youtube.com/vi/8puKJahWwEw/0.jpg)](https://youtu.be/8puKJahWwEw)

---

# 👥 Equipe
- Daniel Victor Olímpio Souza Morais  
- Gabriel Andrade Cintra  
- Kaio Leandro Rissato

---

# 🚀 Como Executar o Projeto

## 📋 Pré‑requisitos
- Node.js (14+)
- npm
- MongoDB local ou Atlas
- Navegador moderno

## 🔧 Instalação

**Clonar o repositório:**
```bash
git clone https://github.com/FatecFranca/DSM-P3-G04-2025-2.git
cd DSM-P3-G04-2025-2
```

**Instalar dependências do frontend:**
```bash
npm install
```

**Instalar dependências do backend:**
```bash
cd backend
npm install
cd ..
```

**Configurar variáveis de ambiente (`backend/.env`):**
```
MONGODB_URI=mongodb+srv://seu_usuario:sua_senha@cluster.mongodb.net/gestao_fabrica
PORT=5000
```

---

# ▶️ Executando a Aplicação

**Backend:**
```bash
cd backend
npm start
```
Acessar: http://localhost:5000

**Frontend:**
```bash
npm start
```
Acessar: http://localhost:3000

---

# 🌱 Populando o Banco de Dados
```bash
cd backend
npm run seed
```

---

# 📦 Build para Produção
```bash
npm run build
```
Arquivos gerados em `build/`.

---

# ☁️ Implantação no Render

### 🔗 URLs do Sistema
- **Frontend:** https://sistema-de-gestao-de-fabrica.onrender.com/  
- **Backend:** https://sistema-de-gestao-de-fabrica-de.onrender.com

### 📦 Arquitetura
**Backend (Node + Express + MongoDB Atlas):** Web Service com variáveis `MONGODB_URI` e `PORT`.  
**Frontend (React):** deploy estático com `npm run build`.

**Regra SPA:**
```
/*  → /index.html (200)
```

### ▶️ Passo a Passo do Deploy
Backend → Web Service (Node)  
Frontend → Static Site (React Build)

---

# 🏗️ Estrutura do Projeto
```
DSM-P3-G04-2025-2/
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── seed/
│   ├── server.js
│   └── package.json
├── src/
│   ├── components/
│   ├── pages/
│   ├── App.js
│   └── index.js
└── public/
```

---

# 🎯 Funcionalidades

## 1. Painel de Controle
- Tela inicial com visão geral

## 2. Clientes
- Listar, cadastrar, editar e excluir

## 3. Matérias‑Primas
- CRUD completo
- Materiais como: kraft, cola, grampos, tinta etc.

## 4. Produtos Finais
- CRUD completo
- Caixas, embalagens, displays

## 5. Ficha Técnica
- Adicionar/remover matérias‑primas
- Quantidades por unidade

## 6. Ordens de Produção
- Criar ordens
- Associar cliente + produto
- Rastrear status

---

# 🛠️ Tecnologias
**Frontend:** React, React Router, CSS  
**Backend:** Node, Express, MongoDB, Mongoose, CORS, dotenv  
**Ferramentas:** Nodemon, React Scripts

---

# 📡 Endpoints da API
**Produtos:** GET/POST/PUT/DELETE  
**Clientes:** GET/POST/PUT/DELETE  
**Matérias‑primas:** GET/POST/PUT/DELETE  
**Ordens de produção:** GET/POST/PUT/DELETE  
**Notificações:** GET

---

# 📝 Observações
- Dados persistidos em MongoDB Atlas  
- IDs automáticos (P‑001 etc.)  
- Ordens controlam consumo de materiais

---

# 🐛 Solução de Problemas
Inclui: portas ocupadas, CORS, cache do npm, IP no Atlas.

---

# 🔄 Próximas Melhorias
- Auth  
- Estoque  
- Relatórios  
- Dashboard  
- Exportação PDF/Excel

---

# 📄 Licença
Uso acadêmico — FATEC Franca.

---

# 📞 Contato
Equipe do Grupo 04 — DSM 2025.

---

# 🙏 Agradecimentos
Aos professores e orientadores do curso DSM.
