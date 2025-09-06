// Importo o React e os hooks que são a base desta aplicação:
// 'useState' para gerenciar o estado (tarefas, filtro e tema).
// 'useEffect' para criar efeitos colaterais, como salvar no localStorage e alterar o tema.
import React, { useState, useEffect } from "react";

// Importo os componentes filhos (presentational)
import FormularioTarefa from "./componentes/FormularioTarefa";
import FiltrosTarefas from "./componentes/FiltrosTarefas";
import ListaTarefas from "./componentes/ListaTarefas";

// Importo o CSS global
import "./index.css";

function App() {
  /* --- ESTADOS --- */

  // Lista de tarefas (carrega do localStorage se houver)
  const [tarefas, setTarefas] = useState(() => {
    const salvas = localStorage.getItem("tarefas");
    return salvas ? JSON.parse(salvas) : [];
  });

  // Filtro atual ('todas', 'pendentes', 'concluidas')
  const [filtro, setFiltro] = useState("todas");

  // Tema: false = claro, true = escuro
  const [modoEscuro, setModoEscuro] = useState(false);

  /* --- SIDE EFFECTS --- */

  // Salva tarefas no localStorage
  useEffect(() => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  // Atualiza a classe 'dark' no body quando o tema muda
  useEffect(() => {
    if (modoEscuro) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [modoEscuro]);

  /* --- HANDLERS --- */

  // Adiciona nova tarefa
  const adicionarTarefa = (texto) => {
    const novaTarefa = { id: Date.now(), texto, concluida: false };
    setTarefas([...tarefas, novaTarefa]);
  };

  // Remove tarefa
  const removerTarefa = (id) => {
    setTarefas(tarefas.filter((t) => t.id !== id));
  };

  // Alterna conclusão da tarefa
  const alternarConclusao = (id) => {
    setTarefas(
      tarefas.map((t) =>
        t.id === id ? { ...t, concluida: !t.concluida } : t
      )
    );
  };

  /* --- ESTADO DERIVADO --- */

  const tarefasFiltradas = tarefas.filter((t) => {
    if (filtro === "concluidas") return t.concluida;
    if (filtro === "pendentes") return !t.concluida;
    return true;
  });

  /* --- RENDERIZAÇÃO --- */
  return (
    <div className="app-container">
      <header>
        <h1>Minhas Tarefas</h1>

        {/* Botão de alternar tema */}
        <button
          onClick={() => setModoEscuro(!modoEscuro)}
          style={{ marginBottom: "20px", cursor: "pointer" }}
        >
          {modoEscuro ? "🌞 Claro" : "🌙 Escuro"}
        </button>
      </header>

      {/* Formulário */}
      <FormularioTarefa onAdicionar={adicionarTarefa} />

      {/* Filtros */}
      <FiltrosTarefas filtro={filtro} setFiltro={setFiltro} />

      {/* Lista */}
      <ListaTarefas
        tarefas={tarefasFiltradas}
        onRemover={removerTarefa}
        onAlternar={alternarConclusao}
      />
    </div>
  );
}

export default App;
