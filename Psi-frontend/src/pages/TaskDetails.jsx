import { useParams } from "react-router-dom";
import { useTasks } from "../context/TaskContext";

export default function TaskDetails() {
  const { id } = useParams();
  const { tasks } = useTasks();
  const task = tasks.find((t) => t._id === id);

  if (!task) return <p className="text-center mt-10">Task not found.</p>;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-2">{task.title}</h2>
      <p className="mb-2 text-gray-700">{task.description}</p>
      <p className="mb-1">Status: <strong>{task.status}</strong></p>
      <p className="mb-1">Priority: <strong>{task.priority}</strong></p>
      <p className="mb-4">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>

      <div>
        <h4 className="font-semibold mb-2">Attached Documents:</h4>
        {task.documents?.length > 0 ? (
          task.documents.map((doc, index) => (
            <a
              key={index}
              href={`http://localhost:5000/${doc.path}`}
              target="_blank"
              rel="noreferrer"
              className="block text-blue-600 underline mb-1"
            >
              View Document {index + 1}
            </a>
          ))
        ) : (
          <p className="text-sm text-gray-500">No documents uploaded.</p>
        )}
      </div>
    </div>
  );
}
