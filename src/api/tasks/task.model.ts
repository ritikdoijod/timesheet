import * as z from "zod";
import { ObjectId } from "mongodb";
import { db } from "../../configs/db.js";

const Task = z.object({
  name: z.string().min(3),
  description: z.string(),
  status: z.string().min(3),
  author: z.instanceof(ObjectId),
});

export type Task = z.infer<typeof Task>;

export const Tasks = db.collection<Task>("tasks");
