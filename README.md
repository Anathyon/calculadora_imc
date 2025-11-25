# 🏥 Calculadora de IMC

Uma aplicação moderna para calcular o Índice de Massa Corporal (IMC) com design baseado nas especificações fornecidas.

## ✨ Funcionalidades

- 🧮 **Cálculo de IMC**: Interface limpa com campos de peso e altura
- 📊 **Classificação automática**: Exibição clara da classificação do IMC
- 📈 **Histórico integrado**: Visualização dos cálculos anteriores na mesma tela
- 🎨 **Design fiel**: Interface baseada exatamente no design fornecido
- 📱 **Responsivo**: Layout adaptável para diferentes tamanhos de tela
- ⚡ **Performance**: Otimizado com Next.js e Tailwind CSS

## 🛠️ Tecnologias Utilizadas

- **Next.js 15** - Framework React para produção
- **TypeScript** - Tipagem estática para JavaScript
- **Tailwind CSS** - Framework CSS utilitário
- **Framer Motion** - Biblioteca de animações
- **Zustand** - Gerenciamento de estado global
- **Jest** - Framework de testes
- **Testing Library** - Utilitários para testes de componentes

## 🚀 Como executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd calculadora_imc
```

2. Instale as dependências:
```bash
npm install --legacy-peer-deps
```

3. Execute em modo de desenvolvimento:
```bash
npm run dev
```

4. Acesse http://localhost:3000

## 🧪 Testes

Execute os testes:
```bash
npm test
```

Execute os testes em modo watch:
```bash
npm run test:watch
```

## 🏗️ Build

Para fazer o build de produção:
```bash
npm run build
```

Para executar a versão de produção:
```bash
npm start
```

## 📋 Scripts Disponíveis

- `npm run dev` - Executa em modo de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Executa versão de produção
- `npm run lint` - Executa linting do código
- `npm test` - Executa testes
- `npm run test:watch` - Executa testes em modo watch

## 🎯 Funcionalidades Implementadas

### ✅ Cálculo de IMC
- Entrada de peso e altura com validação
- Cálculo automático do IMC
- Classificação baseada nos padrões da OMS

### ✅ Interface Moderna
- Design baseado no Figma fornecido
- Animações suaves com Framer Motion
- Tema escuro elegante
- Componentes reutilizáveis

### ✅ Gerenciamento de Estado
- Estado global com Zustand
- Persistência do histórico
- Sincronização entre componentes

### ✅ Histórico
- Armazenamento de cálculos anteriores
- Exibição com data e hora
- Funcionalidade de limpeza

### ✅ Testes
- Testes unitários com Jest
- Testes de componentes com Testing Library
- Cobertura do store e componentes principais

## 🎨 Design

O design foi baseado nas imagens fornecidas, implementando:
- Layout em grid responsivo
- Cards com glassmorphism
- Animações de entrada e hover
- Tipografia moderna com Inter
- Ícones do Bootstrap Icons

## 📱 Responsividade

A aplicação é totalmente responsiva, adaptando-se a:
- Desktop (1024px+)
- Tablet (768px - 1023px)
- Mobile (até 767px)

## 🔧 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
├── pages/              # Páginas Next.js
│   └── components/     # Componentes específicos de páginas
├── store/              # Store Zustand
└── styles/             # Estilos globais

__tests__/              # Testes
├── imcStore.test.ts    # Testes do store
└── Resultado.test.tsx  # Testes de componentes
```

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ por [Seu Nome]

---

⭐ Se este projeto te ajudou, considere dar uma estrela!