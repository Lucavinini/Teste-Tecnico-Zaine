import React, { useState, useEffect } from "react";
import FormularioTarefa from "./componentes/FormularioTarefa";
import FiltrosTarefas from "./componentes/FiltrosTarefas";
import ListaTarefas from "./componentes/ListaTarefas";
import "./index.css";

function App() {
  const [tarefas, setTarefas] = useState([]);
  const [filtro, setFiltro] = useState("todas");

  return (
    <div className="app-container">
      <header>
        <h1>Minhas Tarefas</h1>
      </header>

      <FormularioTarefa />
      <FiltrosTarefas filtro={filtro} setFiltro={setFiltro} />
      <ListaTarefas tarefas={[]} />
    </div>
  );
}

export default App;
