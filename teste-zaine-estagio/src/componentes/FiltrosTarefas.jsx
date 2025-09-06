// Importo o React, o que é padrão para criar qualquer componente React e usar JSX.
import React from "react";

/**
 * Eu criei este componente funcional, 'FiltrosTarefas'.
 * Este é um exemplo clássico de um "componente controlado" ou "presentational/dumb component".
 * * Ele não possui seu próprio estado interno (observe a ausência de 'useState' aqui).
 * Em vez disso, ele recebe o estado atual ('filtro') e a função para alterar 
 * esse estado ('setFiltro') diretamente do componente pai (via props).
 * * Eu fiz essa escolha de design (lifting state up) porque o componente pai 
 * (que provavelmente renderiza a lista de tarefas) precisa *saber* qual é o filtro ativo 
 * para poder exibir a lista correta. Este componente aqui apenas dispara a mudança de estado
 * no pai e reflete visualmente o estado atual.
 */
function FiltrosTarefas({ filtro, setFiltro }) {
  
  // O retorno do JSX:
  return (
    // Um container div simples para agrupar e estilizar os botões de filtro.
    <div className="filter-controls">
      
      {/* Botão para "Todas" */}
      <button
        /*
         * A classe deste botão é dinâmica. Eu uso uma template string (crases)
         * para definir as classes. Ele sempre terá "filter-btn".
         * Além disso, eu uso um operador ternário: 
         * Se a prop 'filtro' (que vem do pai) for exatamente igual a "todas", 
         * eu adiciono a classe "active". Caso contrário, eu não adiciono nada (string vazia).
         * Isso garante que apenas o botão correspondente ao estado atual fique destacado.
         */
        className={`filter-btn ${filtro === "todas" ? "active" : ""}`}
        
        /*
         * No evento 'onClick', eu chamo a função 'setFiltro' (que recebi via props)
         * e passo o valor "todas". Isso vai atualizar o estado no componente pai,
         * o que fará com que este componente seja re-renderizado com o novo valor de 'filtro'.
         * Eu uso uma arrow function aqui para garantir que o setFiltro('todas') só seja 
         * executado no momento do clique, e não durante a renderização.
         */
        onClick={() => setFiltro("todas")}
      >
        Todas
      </button>

      {/* * Botão para "Pendentes".
       * Eu aplico exatamente o mesmo padrão lógico do botão anterior.
       * A classe 'active' só é aplicada se a prop 'filtro' for "pendentes",
       * e o clique chama setFiltro("pendentes").
       */
      }
      <button
        className={`filter-btn ${filtro === "pendentes" ? "active" : ""}`}
        onClick={() => setFiltro("pendentes")}
      >
        Pendentes
      </button>

      {/* * Botão para "Concluídas".
       * Novamente, o mesmo padrão: verifico se filtro === "concluidas" para a classe
       * e chamo setFiltro("concluidas") ao clicar.
       */
      }
      <button
        className={`filter-btn ${filtro === "concluidas" ? "active" : ""}`}
        onClick={() => setFiltro("concluidas")}
      >
        Concluídas
      </button>
    </div>
  );
}

// Eu exporto o componente FiltrosTarefas para que o componente pai (como App.js) 
// possa importá-lo e utilizá-lo.
export default FiltrosTarefas;