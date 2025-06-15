import express from "express";
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask
} from "../controllers/taskController.js";
import { protect } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.route("/")
  .get(protect, getTasks)
  .post(protect, upload.array("documents", 3), createTask);

router.route("/:id")
  .get(protect, getTaskById)
  .put(protect, upload.array("documents", 3), updateTask)
  .delete(protect, deleteTask);

export default router;
