import TaskCard from './taskCard'
import {TaskContext} from '../Context/TaskContext'
import { useContext } from "react";

function TaskList() {

  const {tasks} = useContext(TaskContext)

  if (tasks.length === 0) return <h1>No hay tareas</h1>;

  return (
    <div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task}/>
      ))}
    </div>
  );
}

export default TaskList;
