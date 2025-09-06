// Importo o React e os dois hooks que são a base desta aplicação:
// 'useState' para gerenciar o estado (a lista de tarefas e o filtro).
// 'useEffect' para criar um "efeito colateral" (side effect), que no meu caso 
// será salvar os dados no localStorage sempre que o estado mudar.
import React, { useState, useEffect } from "react";

// Importo os 3 componentes "filho" (presentational) que eu criei.
// O 'App.jsx' vai funcionar como o "container" ou "componente inteligente", 
// gerenciando todo o estado e passando os dados e funções para eles.
import FormularioTarefa from "./componentes/FormularioTarefa";
import FiltrosTarefas from "./componentes/FiltrosTarefas";
import ListaTarefas from "./componentes/ListaTarefas";

// Importo o CSS global que eu estilizei anteriormente.
import "./index.css";

// Este é o meu componente principal, que "abraça" toda a aplicação.
function App() {
  
  /* --- ESTADO (STATE) --- */

  // 1. Estado principal: O array de tarefas.
  // Eu uso 'useState', mas com uma técnica de otimização chamada "lazy initial state".
  // Eu passo uma FUNÇÃO '() => ...' para o useState. O React só executará esta função 
  // UMA VEZ, na montagem inicial do componente.
  // Isso é crucial para performance, pois ler o 'localStorage' (que é uma I/O síncrona) 
  // e fazer o 'JSON.parse' são operações que eu não quero que executem a cada re-render.
  // Se houver dados salvos, eu os carrego; senão, eu começo com um array vazio.
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem("tarefas");
    return salvas ? JSON.parse(salvas) : [];
  });

  // 2. Estado do Filtro: Qual filtro está ativo. Começa com 'todas'.
  const [filtro, setFiltro] = useState("todas");

  /* --- EFEITO COLATERAL (SIDE EFFECT) --- */

  // Eu uso 'useEffect' para persistir os dados.
  // Eu configuro este hook para "observar" o estado 'tarefas' (definido no array de dependências: [tarefas]).
  // Toda vez que o estado 'tarefas' mudar (adicionar, remover, alterar), 
  // esta função será executada *após* a renderização, salvando a nova lista no localStorage.
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  /* --- HANDLERS (Manipuladores de Ação) --- */
  // Estas são as funções que realmente alteram o estado. Eu as defino aqui no 'App' 
  // e as passo via props para os componentes filhos que precisam acioná-las.

  // Esta função será passada para o <FormularioTarefa />.
  const adicionarTarefa = (texto) => {
    // Eu crio o novo objeto de tarefa (usando Date.now() como um ID simples e único).
    const novaTarefa = { id: Date.now(), texto, concluida: false };
    
    // Para atualizar o estado (que deve ser imutável), eu crio um *novo* array,
    // copiando todas as tarefas antigas (...tarefas) e adicionando a nova no final.
    setTarefas([...tarefas, novaTarefa]);
  };

  // Esta função será "perfurada" (drilled down) até o <ItemTarefa />.
  const removerTarefa = (id) => {
    // Eu uso .filter() para criar um *novo* array (imutalibidade) contendo 
    // todas as tarefas, *exceto* aquela cujo ID corresponde ao que eu quero remover.
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  // Esta também será "perfurada" até o <ItemTarefa />.
  const alternarConclusao = (id) => {
    // Para manter a imutabilidade, eu uso .map() para criar um novo array.
    // Eu percorro o array: se o ID da tarefa 't' for o que eu quero alterar,
    // eu retorno um *novo objeto* ({ ...t }), copiando a tarefa antiga, 
    // mas invertendo (toggle) o valor de 'concluida'.
    // Se não for o ID, eu apenas retorno a tarefa original ('t').
    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  };

  /* --- ESTADO DERIVADO (Derived State) --- */

  // Esta é uma variável que eu calculo a cada renderização. 
  // Eu não preciso de um 'useState' para ela, pois ela *deriva* dos estados 'tarefas' e 'filtro'.
  // Esta é a lista que será efetivamente exibida na tela.
  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === "concluidas") return t.concluida;
    if (filtro === "pendentes") return !t.concluida;
    return true; // Se o filtro for "todas", retorna 'true' para todos os itens.
  });

  /* --- RENDERIZAÇÃO (JSX) --- */
  // Aqui eu monto a UI, conectando o estado e os handlers aos componentes filhos.
  return (
    <div className="app-container"> {/* O container que eu estilizei no CSS global */}
      <header>
        <h1>Minhas Tarefas</h1>
      </header>

      {/* Componente 1: Formulário.
        Eu pratico o "lifting state up": o formulário não sabe o que fazer.
        Eu passo para ele (na prop 'onAdicionar') a *minha* função 'adicionarTarefa'.
        Quando o formulário der "submit", ele vai chamar essa função.
      */}
      <FormularioTarefa onAdicionar={adicionarTarefa} />
      
      {/* Componente 2: Filtros.
        Este é um componente 100% controlado. Eu passo para ele o valor atual do filtro ('filtro')
        E também a função para alterar esse valor ('setFiltro'). Ele usa ambos.
      */}
      <FiltrosTarefas filtro={filtro} setFiltro={setFiltro} />
      
      {/* Componente 3: A Lista.
        1. Eu passo a lista já filtrada ('tarefasFiltradas'), não a lista completa.
        2. Eu passo as minhas funções 'removerTarefa' e 'alternarConclusao'. 
           A ListaTarefas então repassará (drill down) essas funções para cada ItemTarefa.
      */}
      <ListaTarefas
        tarefas={tarefasFiltradas}
        onRemover={removerTarefa}
        onAlternar={alternarConclusao}
      />
    </div>
  );
}

export default App;