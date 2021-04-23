import React, { useEffect, useState } from "react";
import TaskForm from "./components/task-form";
import TaskList from "./components/task-list";
import TaskItem from "./components/task-item";
import useLocalStorage from "./hooks/use-local-storage";
import useDocumentTitle from "./hooks/use-document-title";

import api from "./helper/api";

function App() {
  const [tasks, setTasks] = useLocalStorage("storedTasks", []);

  const [serverTasks, setServerTasks] = useState([]);

  useEffect(async () => {
    setServerTasks(await api.getAllTasks());
  }, []);

  const pendingTasksCount = serverTasks.filter((task) => !task.completed).length;
  const completedTasksCount = serverTasks.length - pendingTasksCount;

  useDocumentTitle(`${pendingTasksCount} tasks left`);

  const createTask = async (task) => {
    await api.createTask(task);
    const tasks = await api.getAllTasks()
    setServerTasks(tasks);
  };

  const removeTask = async (id) => {
    const response = await api.deleteTask(id);
    alert(response.message);
    const tasks = await api.getAllTasks()
    setServerTasks(tasks);
  };

  const completeTask = async (id, completed) => {
    await api.patchTask(id, { completed: !completed });
    const tasks = await api.getAllTasks()
    setServerTasks(tasks);
  };

  const clearCompleted = async () => {
    await api.clearCompleted();
    const tasks = await api.getAllTasks()
    setServerTasks(tasks);
  };

  return (
    <div>
      <h1>Todo List</h1>
      <p>Pending tasks: {pendingTasksCount}</p>
      <TaskForm onSubmit={createTask} />
      <TaskList>
        {serverTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            title={task.title}
            completed={task.completed}
            onClick={completeTask}
            onRemove={removeTask}
          />
        ))}
      </TaskList>
      {completedTasksCount > 0 && (
        <button onClick={clearCompleted}>Clear completed tasks</button>
      )}
    </div>
  );
}

export default App;
