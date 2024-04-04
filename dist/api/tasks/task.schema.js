import * as z from "zod";
// export const Task = z.object({
//   title: z.string().min(3),
//   description: z.string(),
//   status: z.string().min(3),
//   author: z.instanceof(ObjectId),
//   customer: z.instanceof(ObjectId),
// });
export const Task = z
    .object({
    title: z.string().min(3),
    description: z.string(),
    status: z.string().min(3),
    author: z.string().min(3),
    customer: z.string().min(3),
})
    .strip();
