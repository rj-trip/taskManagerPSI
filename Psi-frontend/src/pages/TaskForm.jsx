import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export default function TaskForm() {
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get("id");
  const { tasks, createTask, updateTask } = useTasks();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Pending",
    priority: "Low",
    dueDate: "",
    documents: [],
  });

  useEffect(() => {
    if (taskId) {
      const existingTask = tasks.find((t) => t._id === taskId);
      if (existingTask) {
        setFormData({
          ...existingTask,
          documents: [], // Do not prefill documents
        });
      }
    }
  }, [taskId, tasks]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (taskId) {
      await updateTask(taskId, formData);
    } else {
      await createTask(formData);
    }
    navigate("/dashboard");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">{taskId ? "Edit Task" : "Create Task"}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border px-4 py-2 rounded"
        />
        <div className="flex gap-4">
          <select name="status" value={formData.status} onChange={handleChange} className="w-full border px-4 py-2 rounded">
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
          <select name="priority" value={formData.priority} onChange={handleChange} className="w-full border px-4 py-2 rounded">
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate?.slice(0, 10)}
          onChange={handleChange}
          required
          className="w-full border px-4 py-2 rounded"
        />
        <input
          type="file"
          name="documents"
          multiple
          accept="application/pdf"
          onChange={handleChange}
          className="w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          {taskId ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
