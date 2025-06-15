
// import { useTasks } from "../context/TaskContext";
// import TaskCard from "../components/TaskCard";
// import { Link } from "react-router-dom";

// export default function Dashboard() {
//   const { tasks, loading, deleteTask } = useTasks();

//   return (
//     <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-indigo-100 to-purple-50 py-10 px-4">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
//           <h2 className="text-3xl font-bold text-gray-800">My Tasks</h2>
//           <Link
//             to="/tasks/create"
//             className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 shadow transition"
//           >
//             + Create Task
//           </Link>
//         </div>

//         {loading ? (
//           <p className="text-center text-gray-600">Loading tasks...</p>
//         ) : tasks.length === 0 ? (
//           <p className="text-center text-gray-500">No tasks yet. Start by creating one!</p>
//         ) : (
//           <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//             {tasks.map((task) => (
//               <TaskCard key={task._id} task={task} onDelete={() => deleteTask(task._id)} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useTasks } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";

export default function Dashboard() {
  const { tasks, loading, deleteTask } = useTasks();

  // State for filtering & sorting
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("none");

  // Filtered & Sorted tasks
  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];

    if (statusFilter !== "All") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    if (priorityFilter !== "All") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }
    if (sortOrder !== "none") {
      filtered.sort((a, b) => {
        const dateA = new Date(a.dueDate);
        const dateB = new Date(b.dueDate);
        return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
      });
    }

    return filtered;
  }, [tasks, statusFilter, priorityFilter, sortOrder]);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-indigo-100 to-purple-50 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Tasks</h2>
          <Link
            to="/tasks/create"
            className="mt-4 md:mt-0 bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 shadow transition"
          >
            + Create Task
          </Link>
        </div>

        {/* Filter + Sort Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>

          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
          >
            <option value="All">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="w-full border border-gray-300 rounded px-4 py-2 shadow-sm"
          >
            <option value="none">No Sort</option>
            <option value="asc">Due Date: Ascending</option>
            <option value="desc">Due Date: Descending</option>
          </select>
        </div>

        {/* Task Grid */}
        {loading ? (
          <p className="text-center text-gray-600">Loading tasks...</p>
        ) : filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No matching tasks found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredTasks.map((task) => (
              <TaskCard key={task._id} task={task} onDelete={() => deleteTask(task._id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}


