# Lista de Tarefas - Teste Técnico da Zaine

Esta é uma aplicação de lista de tarefas desenvolvida como parte do teste técnico para a vaga de Estágio de Desenvolvedor Full Stack da Zaine. A aplicação permite **gerenciar tarefas**, incluindo adição, remoção, marcação como concluída e filtragem de tarefas, com persistência local no navegador via **LocalStorage**.

A aplicação também possui **modo claro e escuro**, além de ser responsiva.

---

## 🛠️ Tecnologias Utilizadas

* **React.js:** Biblioteca para construção da interface de usuário.
* **HTML e CSS:** Estrutura e estilos da aplicação.
* **JavaScript (ES6+):** Lógica e manipulação de estados.
* **LocalStorage:** Persistência das tarefas no navegador.

---

## 🏗️ Arquitetura e Organização do Projeto

O projeto segue o princípio da **Separação de Responsabilidades**, onde cada componente tem uma função específica. Isso facilita manutenção, testes e futuras expansões.

#### Estrutura do Projeto `src/`

- **componentes/**  
  Contém os componentes React reutilizáveis:  
  - `FormularioTarefa.jsx` → formulário para adicionar tarefas  
  - `FiltrosTarefas.jsx` → botões de filtro (Todas, Concluídas, Pendentes)  
  - `ListaTarefas.jsx` → lista de tarefas com itens individuais  

- **App.jsx**  
  Componente principal que gerencia estados, funções e integra todos os componentes filhos.

- **main.jsx**  
  Ponto de entrada da aplicação que renderiza o App.

- **index.css**  
  Estilo global, incluindo responsividade e suporte a modo escuro.

---

## 🔐 Funcionalidades Implementadas

1. **Adicionar tarefa:**  
   Usuário pode digitar uma tarefa no formulário e adicioná-la à lista.

2. **Remover tarefa:**  
   Cada tarefa possui um botão de remoção que exclui a tarefa da lista.

3. **Marcar como concluída:**  
   Tarefas concluídas são riscadas e mudam de cor para indicar status.

4. **Filtros:**  
   Filtragem por: Todas | Concluídas | Pendentes.

5. **Persistência local:**  
   Todas as tarefas são salvas no LocalStorage e permanecem ao atualizar a página.

6. **Modo claro e escuro:**  
   Usuário pode alternar entre modos, alterando cores de fundo, textos e elementos da interface.

7. **Responsividade:**  
   Layout adaptável a telas pequenas, com botões e inputs ajustados.

---

## 🏗️ Arquitetura de Componentes

- **App.jsx:** Estado central e handlers (adicionar, remover, alternar conclusão, filtro).  
- **FormularioTarefa.jsx:** Formulário de entrada controlado pelo estado do App.  
- **FiltrosTarefas.jsx:** Botões de filtro com estado controlado pelo App.  
- **ListaTarefas.jsx:** Renderiza itens filtrados, repassando funções para cada ItemTarefa.  
- **ItemTarefa.jsx:** Representa cada tarefa individual, com botões de toggle e remover.
  
---

## 🚀 Como Executar Localmente

### Pré-requisitos
- Node.js instalado
- Git instalado (opcional, para clonar o repositório)

### Passos
1. Clone o repositório:
   
```bash
git clone https://github.com/Lucavinini/Teste-Tecnico-Zaine/tree/main/teste-zaine-estagio
cd meu-todo-app
npm install
npm run dev
```

2. Abra o navegador em http://localhost:(portaIndicadaPeloSeuTerminal).
