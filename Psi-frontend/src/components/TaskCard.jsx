// import { Link } from "react-router-dom";

// export default function TaskCard({ task, onDelete }) {
//   return (
//     <div className="bg-white p-4 rounded shadow flex justify-between items-start">
//       <div>
//         <h3 className="text-lg font-semibold">{task.title}</h3>
//         <p className="text-sm text-gray-600">{task.description}</p>
//         <p className="text-sm mt-1">Status: <strong>{task.status}</strong></p>
//         <p className="text-sm">Priority: <strong>{task.priority}</strong></p>
//         <p className="text-sm">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
//       </div>
//       <div className="flex flex-col gap-1 text-right">
//         <Link to={`/tasks/${task._id}`} className="text-blue-500 hover:underline">View</Link>
//         <Link to={`/tasks/create?id=${task._id}`} className="text-green-600 hover:underline">Edit</Link>
//         <button onClick={onDelete} className="text-red-600 hover:underline">Delete</button>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";

export default function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 flex flex-col justify-between border border-gray-200">
      <div>
        <h3 className="text-xl font-bold text-indigo-700">{task.title}</h3>
        <p className="text-gray-600 mt-1 text-sm">{task.description}</p>
        <div className="mt-3 space-y-1 text-sm text-gray-700">
          <p>Status: <span className="font-medium">{task.status}</span></p>
          <p>Priority: <span className="font-medium">{task.priority}</span></p>
          <p>Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        </div>
      </div>
      <div className="mt-5 flex flex-wrap justify-between gap-3 text-sm font-medium">
        <Link
          to={`/tasks/${task._id}`}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200"
        >
          View
        </Link>
        <Link
          to={`/tasks/create?id=${task._id}`}
          className="bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200"
        >
          Edit
        </Link>
        <button
          onClick={onDelete}
          className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

