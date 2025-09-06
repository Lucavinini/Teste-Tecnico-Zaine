// Importação básica
import React from "react";

/**
 * Este é o componente 'ItemTarefa', o componente "filho" final.
 * Ele é puramente "apresentacional" (presentational/dumb). Sua única responsabilidade 
 * é renderizar a UI para *uma* única tarefa, baseado exatamente no que ele recebe via props.
 * * Ele recebe:
 * 1. 'tarefa': O objeto *específico* da tarefa que ele deve renderizar.
 * 2. 'onRemover': A função callback (vinda do pai) para deletar.
 * 3. 'onAlternar': A função callback (vinda do pai) para alternar o status (concluído/pendente).
 * * É neste componente que as funções (que foram passadas por 'prop drilling') 
 * são finalmente *invocadas* em resposta a eventos do usuário (cliques).
 */
function ItemTarefa({ tarefa, onRemover, onAlternar }) {
  
  return (
    /* * Eu renderizo um <li>, o que é semanticamente correto, já que o pai (ListaTarefas) é um <ul>.
     * A classe dele é dinâmica: Eu uso uma template literal e um operador ternário.
     * Se 'tarefa.concluida' for true, eu adiciono a classe "completed".
     * Eu usaria essa classe no CSS para aplicar estilos, como um 'text-decoration: line-through'.
     * Isso garante que a UI sempre reflita o estado atual da 'tarefa'.
     */
    <li className={`task-item ${tarefa.concluida ? "completed" : ""}`}>
      
      {/* Este é o botão de "toggle" (alternar status) */}
      <button className="toggle-btn" 
        /* * No 'onClick', eu chamo a função 'onAlternar' que recebi via props.
         * Crucialmente, eu passo o 'tarefa.id' como argumento.
         * Eu preciso usar uma arrow function '() =>' aqui para garantir que 
         * 'onAlternar' só seja chamado *quando* o usuário clicar, e para que eu possa 
         * passar o ID específico desta tarefa.
         * Isso "levanta o estado": o pai receberá o ID e saberá qual item atualizar.
         */
        onClick={() => onAlternar(tarefa.id)}
      >
        {/* O conteúdo do botão também é dinâmico: se a tarefa estiver concluída, 
          eu mostro um 'check' (✓), senão, mostro um círculo (○). */}
        {tarefa.concluida ? "✓" : "○"}
      </button>

      {/* Eu simplesmente renderizo o texto da tarefa, que recebi via 'tarefa.texto' */}
      <span className="task-text">{tarefa.texto}</span>

      {/* Botão de Remover */}
      <button className="remove-btn" 
        /* * A lógica é idêntica ao botão de toggle. No clique, eu chamo a função 'onRemover' (prop)
         * e passo o 'tarefa.id' deste item. 
         * O componente pai que gerencia o estado da lista completa irá receber este ID 
         * e usá-lo para filtrar o array, removendo esta tarefa.
         */
        onClick={() => onRemover(tarefa.id)}
      >
        🗑️
      </button>
    </li>
  );
}

// Eu exporto o ItemTarefa para que o componente 'ListaTarefas' possa importá-lo e usá-lo 
// dentro do seu loop .map().
export default ItemTarefa;