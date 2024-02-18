import { Request, Response } from "express";
import { Tasks } from "./task.model.js";
import { Users } from "../users/user.model";
import { ObjectId } from "mongodb";

const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Tasks.find().toArray();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const createTask = async (req: Request, res: Response) => {
  try {
    const user = await Users.findOne(
      { _id: new ObjectId(req.params.author) },
      { projection: { password: 0 } },
    );
    if (!user) return res.status(404).json({ message: "User not found" });

    const task = await Tasks.insertOne(req.body);
    return res.status(201).json({ task });
  } catch (error) {
    return res.status(500).json(error);
  }
};

const getTaskById = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.findOne({ _id: new ObjectId(req.params.id) });
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const updateTask = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.findOneAndUpdate(
      { _id: new ObjectId(req.params.id) },
      { $set: req.body },
      { returnDocument: "after" },
    );
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.status(200).json(task);
  } catch (error) {
    return res.status(500).json(error);
  }
};
const deleteTask = async (req: Request, res: Response) => {
  try {
    const task = await Tasks.findOneAndDelete({
      _id: new ObjectId(req.params.id),
    });
    if (!task) return res.status(404).json({ message: "Task not found" });
    return res.status(204).end();
  } catch (error) {
    return res.status(500).json(error);
  }
};
const getTasksByAuthor = async (req: Request, res: Response) => {
  try {
    const tasks = await Tasks.find({
      author: new ObjectId(req.params.author),
    }).toArray();
    return res.status(200).json(tasks);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export {
  getAllTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
  getTasksByAuthor,
};
