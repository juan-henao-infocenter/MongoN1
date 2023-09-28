import React from "react";
import ReactDOM from "react-dom/client";
import {App} from './app'
import {TaskContextProvider} from './Context/TaskContext'


ReactDOM.createRoot(document.getElementById("root")).render(
  <TaskContextProvider>
    <App/>
  </TaskContextProvider>
);
