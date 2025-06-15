import { createContext, useContext, useState, useEffect } from "react";
import TaskService from "../services/TaskService";

const TaskContext = createContext();

export const useTasks = () => useContext(TaskContext);

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const data = await TaskService.getAll();
      setTasks(data);
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (taskData) => {
    const newTask = await TaskService.create(taskData);
    setTasks(prev => [...prev, newTask]);
  };

  const updateTask = async (id, data) => {
    const updated = await TaskService.update(id, data);
    setTasks(prev => prev.map(t => (t._id === id ? updated : t)));
  };

  const deleteTask = async (id) => {
    await TaskService.remove(id);
    setTasks(prev => prev.filter(t => t._id !== id));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, loading, fetchTasks, createTask, updateTask, deleteTask }}>
      {children}
    </TaskContext.Provider>
  );
};
