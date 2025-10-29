# DSM-P3-G04-2025-2

## 📋 Sobre o Projeto

Repositório do **GRUPO 04** do Projeto Interdisciplinar do 3º semestre DSM 2025/2.

**Sistema de Gerenciamento de Fábrica** - Aplicação web para gerenciar processos de produção, incluindo cadastro de clientes, matérias-primas, produtos finais e ordens de produção.

### 👥 Equipe

- Daniel Victor Olimpio Souza Morais
- Gabriel Andrade Cintra
- Kaio Leandro Rissato

---

## 🚀 Como Executar o Projeto

### 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) (geralmente vem com Node.js)
- Um navegador web moderno (Chrome, Firefox, Edge, etc.)

### 🔧 Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/FatecFranca/DSM-P3-G04-2025-2.git
   ```

2. **Navegue até o diretório do projeto:**
   ```bash
   cd DSM-P3-G04-2025-2
   ```

3. **Instale as dependências:**
   ```bash
   npm install
   ```

### ▶️ Executando a Aplicação

Para iniciar o servidor de desenvolvimento:

```bash
npm start
```

A aplicação será aberta automaticamente no navegador em:
- **Local:** [http://localhost:3000](http://localhost:3000)

### 📦 Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `build/`.

---

## 🏗️ Estrutura do Projeto

```
DSM-P3-G04-2025-2/
├── public/
│   └── index.html          # HTML principal
├── src/
│   ├── components/         # Componentes reutilizáveis
│   │   ├── Layout.js       # Layout principal com sidebar
│   │   └── FichaTecnica.js # Gerenciamento de ficha técnica
│   ├── pages/              # Páginas da aplicação
│   │   ├── Dashboard.js    # Página inicial
│   │   ├── Clientes.js     # Gerenciamento de clientes
│   │   ├── MateriasPrimas.js # Gerenciamento de matérias-primas
│   │   ├── Produtos.js     # Gerenciamento de produtos
│   │   └── Ordens.js       # Gerenciamento de ordens de produção
│   ├── App.css             # Estilos globais
│   ├── App.js              # Configuração de rotas
│   └── index.js            # Ponto de entrada da aplicação
├── package.json            # Dependências e scripts
└── README.md               # Este arquivo
```

---

## 🎯 Funcionalidades

### ✅ Módulos Implementados

1. **Dashboard**
   - Página inicial com boas-vindas ao sistema

2. **Gerenciamento de Clientes**
   - Cadastro de clientes (nome obrigatório)
   - Listagem de clientes cadastrados
   - Campos opcionais: CPF/CNPJ e contato

3. **Gerenciamento de Matérias-Primas**
   - Cadastro de matérias-primas
   - Campos: nome, descrição e unidade de medida
   - Listagem de matérias cadastradas

4. **Gerenciamento de Produtos Finais**
   - Listagem de produtos
   - Visualização de ficha técnica por produto
   - Associação de matérias-primas aos produtos

5. **Ficha Técnica**
   - Composição detalhada de cada produto
   - Adição de matérias-primas com quantidades
   - Visualização de ingredientes necessários

6. **Gerenciamento de Ordens de Produção**
   - Criação de ordens de produção
   - Associação opcional com clientes
   - **Regra de negócio:** Ordens sem cliente = reposição de estoque
   - Controle de status e quantidades planejadas

---

## 🛠️ Tecnologias Utilizadas

- **React** (v18.2.0) - Biblioteca JavaScript para interfaces
- **React Router DOM** (v6.20.0) - Navegação entre páginas
- **CSS3** - Estilização minimalista
- **React Hooks** - useState, useEffect para gerenciamento de estado

---

## 📝 Observações Importantes

### Dados Mockados

⚠️ **Atenção:** Atualmente, todos os dados são **mockados** (simulados) diretamente nos componentes React. 

Não há persistência de dados - ao recarregar a página, as informações adicionadas serão perdidas.

### Próximas Etapas

- [ ] Implementação do back-end (API REST)
- [ ] Conexão com banco de dados
- [ ] Persistência real dos dados
- [ ] Autenticação de usuários
- [ ] Relatórios e dashboards analíticos

---

## 🐛 Solução de Problemas

### Porta 3000 já está em uso

Se aparecer erro de porta em uso:

**Windows (PowerShell):**
```powershell
netstat -ano | findstr :3000
taskkill /PID <número_do_processo> /F
```

**Linux/Mac:**
```bash
lsof -i :3000
kill -9 <PID>
```

### Erro ao instalar dependências

Tente limpar o cache do npm:

```bash
npm cache clean --force
npm install
```

---

## 📄 Licença

Este projeto é de propriedade acadêmica da FATEC Franca - Curso de Desenvolvimento de Software Multiplataforma.

---

## 📞 Contato

Para dúvidas ou sugestões, entre em contato com a equipe do Grupo 04.

**FATEC Franca - 2025**
