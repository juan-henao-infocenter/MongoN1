import { createContext, useState, useEffect } from "react";
import { tasks as data } from "../data/tasks";

export const TaskContext = createContext();

export function TaskContextProvider(props) {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    setTasks(data);
  }, []);
  
  function createTask(task) {
    task.id = tasks.length;
    setTasks([...tasks, task]);
  }

  function borrarTask(id) {
    setTasks(tasks.filter((x) => x.id !== id));
  }
  return (
    <TaskContext.Provider
      value={{
        tasks,
        createTask,
        borrarTask,
      }}
    >
      {props.children}
    </TaskContext.Provider>
  );
}
