// Importo o React, necessário para o JSX.
import React from "react";

// Aqui, eu importo o componente filho, o 'ItemTarefa'.
// Eu tomei a decisão de separar as responsabilidades: este componente 
// 'ListaTarefas' é um "container" que gerencia o *loop* e a lista em si, 
// enquanto o 'ItemTarefa' será responsável por renderizar a UI de *cada* // item individualmente.
import ItemTarefa from "./ItemTarefa";

/**
 * Este é o componente 'ListaTarefas'.
 * Ele é responsável por renderizar a coleção de tarefas.
 * * Ele recebe três props do componente pai (provavelmente o App.js):
 * 1. 'tarefas': O array de objetos de tarefas que deve ser exibido.
 * 2. 'onRemover': A função callback do pai para lidar com a remoção de uma tarefa.
 * 3. 'onAlternar': A função callback do pai para lidar com a mudança de status (concluída/pendente).
 * * Este componente atua como um "intermediário", passando as funções de callback 
 * para os filhos ('ItemTarefa') que realmente irão acioná-las. 
 * Isso é conhecido como "prop drilling".
 */
function ListaTarefas({ tarefas, onRemover, onAlternar }) {
  
  return (
    // Eu uso uma tag <ul> (lista não ordenada) aqui, pois semanticamente 
    // é a tag correta para renderizar uma lista de itens (que serão <li> dentro do ItemTarefa).
    <ul className="task-list">
      
      {/* * Aqui está o núcleo da renderização de listas no React.
       * Eu uso a função .map() do JavaScript diretamente dentro do JSX.
       * Para cada objeto 't' (tarefa) dentro do meu array 'tarefas' (recebido via props),
       * eu retorno uma instância do componente <ItemTarefa />.
       * Este é o padrão declarativo do React: eu transformo um array de dados 
       * em um array de elementos de UI.
       */}
      {tarefas.map((t) => (
        
        <ItemTarefa
          /*
           * A prop 'key' é essencial para o React. Eu uso o 't.id' (ID único da tarefa) 
           * como chave. Isso é crucial para o algoritmo de reconciliação do React.
           * A 'key' permite que o React identifique de forma única qual item é qual, 
           * otimizando drasticamente a performance ao adicionar, remover ou reordenar itens na lista, 
           * e evitando bugs de estado nos componentes filhos.
           */
          key={t.id}
          
          // Eu passo o objeto de tarefa inteiro ('t') para o componente filho através da prop 'tarefa'.
          // O ItemTarefa usará isso para exibir o texto e seu estado (concluído/pendente).
          tarefa={t}
          
          // Aqui eu "perfuro" (drill down) as props. Eu passo as funções 'onRemover' e onAlternar' 
          // que recebi do meu pai diretamente para o componente filho (ItemTarefa).
          // É o ItemTarefa que conterá o botão de deletar ou o checkbox e, quando clicado, 
          // ele chamará essas funções (passando seu próprio ID).
          onRemover={onRemover}
          onAlternar={onAlternar}
        />
      ))}
    </ul>
  );
}

// Eu exporto o componente para que o componente pai possa importá-lo.
export default ListaTarefas;