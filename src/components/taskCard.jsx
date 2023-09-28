import { useContext } from "react";
import {TaskContext} from '../Context/TaskContext'
function TaskCard({task}) {
  const {borrarTask} = useContext(TaskContext)

  return (
    <div >
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <button onClick={()=>borrarTask(task.id)}>Eliminar</button>
    </div>
  );
}

export default TaskCard;
