import "./TaskList.css";

/* Componente que receberá uma lista de tarefas (via props) e renderiza cada uma delas */

function TaskList() {
  // Lista de tarefas estática para começar
  const tasks = [
    { id: 1, title: "Estudar React", completed: false },
    { id: 2, title: "Fazer compras", completed: true },
    { id: 3, title: "Lavar o carro", completed: false },
  ];

  return (
    // Usa o método map() para iterar sobre a lista e renderizar um <li> para cada tarefa.
    // A tag span servirá para possibilitar a estilização dos textos

    <div>
      <h2>Minhas Tarefas</h2>

      <ul>
        {tasks.map(task => (
          <li
            key={task.id}
            className={task.completed ? "completed" : "pending"}
          >
            {task.title}
            <span className="status">
              {task.completed ? "(Concluída)" : "(Pendente)"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
