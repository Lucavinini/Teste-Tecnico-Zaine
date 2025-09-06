// Importo o React e o hook 'useState'.
// O useState é essencial aqui para que eu possa gerenciar o estado interno do formulário, 
// especificamente o texto que o usuário digita no input.
import React, { useState } from "react";

/**
 * Este é um componente funcional que chamei de FormularioTarefa.
 * A responsabilidade dele é apenas renderizar o formulário e capturar a entrada do usuário.
 * * Ele recebe uma prop: 'onAdicionar'. Esta é uma função callback que vem do componente pai.
 * Eu uso esse padrão (lifting state up) para que este componente não precise saber *como* a 
 * tarefa é adicionada à lista global; ele apenas informa ao pai *que* uma nova tarefa 
 * (com o texto X) deve ser adicionada.
 */
function FormularioTarefa({ onAdicionar }) {
  
  // Aqui, eu inicializo o estado 'texto' usando o hook useState.
  // 'texto' vai armazenar o valor atual do campo de input.
  // 'setTexto' é a função que eu uso para atualizar esse estado.
  // Começa como uma string vazia.
  const [texto, setTexto] = useState("");

  // Esta é a função que eu criei para manipular o evento de submit do formulário.
  const handleSubmit = (e) => {
    
    // Eu chamo e.preventDefault() primeiro. Isso é crucial para impedir o comportamento 
    // padrão do HTML de recarregar a página inteira quando o formulário é enviado.
    // Eu quero que o React controle o DOM.
    e.preventDefault();

    // Aqui eu faço uma validação simples (um guard clause).
    // Eu uso .trim() para remover espaços em branco no início e no fim.
    // Se o texto (após o trim) estiver vazio, eu simplesmente retorno 
    // e não executo o resto da função. Isso evita tarefas vazias.
    if (texto.trim() === "") return;

    // Se a validação passar, eu chamo a função 'onAdicionar' que recebi via props.
    // Passo o estado 'texto' (o valor atual do input) como argumento.
    // Isso "eleva o estado" para o componente pai, que gerencia a lista de tarefas.
    onAdicionar(texto);

    // Após adicionar a tarefa (enviar os dados para o pai),
    // eu limpo o campo de input resetando o meu estado 'texto' para uma string vazia.
    // Como o input é um "componente controlado" por mim, isso atualiza a UI automaticamente.
    setTexto("");
  };

  // Aqui eu retorno o JSX (a estrutura do componente).
  return (
    // Eu ligo a minha função handleSubmit ao evento onSubmit do formulário.
    // Isso garante que ela seja chamada tanto ao clicar no botão 'submit' 
    // quanto ao pressionar 'Enter' no campo de input.
    <form className="task-form" onSubmit={handleSubmit}>
      
      {/* Eu construí isso como um "Componente Controlado" (Controlled Component).
        Isso significa que o React (através do meu estado) é a "única fonte da verdade" 
        para o valor deste input.
        
        1. 'value={texto}': O valor exibido no input é sempre o que está no meu estado 'texto'.
        2. 'onChange={...}': Toda vez que o usuário digita, eu imediatamente atualizo 
           o estado (usando setTexto) com o novo valor (e.target.value).
           
        Isso me dá controle total sobre os dados do formulário.
      */}
      <input
        type="text"
        className="task-input"
        placeholder="Digite uma tarefa"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
      />
      
      {/* Um botão padrão do tipo 'submit'. Quando clicado dentro de um <form>, 
        ele aciona o evento 'onSubmit' do <form> (que eu capturei acima).
      */}
      <button type="submit">Adicionar</button>
    </form>
  );
}

// Eu exporto o componente para que ele possa ser importado e usado em outros 
// lugares da aplicação (como no App.js ou no componente pai).
export default FormularioTarefa;