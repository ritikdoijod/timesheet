import { Router } from "express";
import {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} from "./tasks.controllers.js";
import { validate } from "../../middlewares/validate.js";
import { Task } from "./task.schema.js";

const router = Router();

router
  .route("/")
  .get(getAllTasks)
  .post(
    validate({
      body: Task.partial().required({
        title: true,
        author: true,
      }),
    }),
    createTask,
  );

router.route("/:id").get(getTaskById).put(updateTask).delete(deleteTask);

export default router;
