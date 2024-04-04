import { Request, Response } from "express";
import Tasks from "./task.model.js";
import Users from "../users/user.model.js";

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Tasks.find();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const createTask = async (req: Request, res: Response) => {
  try {
    const userExists = await Users.findById(req.body.author);
    if (!userExists)
      return res.status(404).json({ message: "User does not exist" });

    const task = await Tasks.create(req.body);

    await Users.findByIdAndUpdate(req.body.author, {
      $push: { tasks: task._id },
    });

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTaskById = async (req: Request, res: Response) => {};
const updateTask = async (req: Request, res: Response) => {};
const deleteTask = async (req: Request, res: Response) => {};
const getTasksByAuthor = async (req: Request, res: Response) => {};

export {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByAuthor,
};
