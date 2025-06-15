import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, status, priority, dueDate, assignedTo } = req.body;

    const documents = req.files?.map(file => ({
      filename: file.originalname,
      path: file.path,
      mimetype: file.mimetype,
    }));

    const task = await Task.create({
      title,
      description,
      status,
      priority,
      dueDate,
      assignedTo,
      documents,
      createdBy: req.user._id
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", error: err.message });
  }
};

// export const getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find({ createdBy: req.user._id }).populate("assignedTo", "email");
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch tasks" });
//   }
// };
export const getTasks = async (req, res) => {
    try {
      const tasks = await Task.find({ createdBy: req.user._id }).populate("assignedTo", "email");
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  };
  

export const getTaskById = async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) return res.status(404).json({ message: "Task not found" });
  res.json(task);
};

export const updateTask = async (req, res) => {
  try {
    const updates = { ...req.body };
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    // If updating files
    if (req.files?.length > 0) {
      updates.documents = req.files.map(file => ({
        filename: file.originalname,
        path: file.path,
        mimetype: file.mimetype
      }));
    }

    const updated = await Task.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task" });
  }
};

// export const deleteTask = async (req, res) => {
//   const task = await Task.findById(req.params.id);
//   if (!task) return res.status(404).json({ message: "Task not found" });

//   await task.remove();
//   res.json({ message: "Task deleted", id: task._id });
// };

export const deleteTask = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).json({ message: "Task not found" });
  
      // Optional: Check if current user owns the task
      if (task.createdBy.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not authorized to delete this task" });
      }
  
      await task.deleteOne();
      res.status(200).json({ message: "Task deleted", id: task._id });
    } catch (error) {
      console.error("Delete error:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  