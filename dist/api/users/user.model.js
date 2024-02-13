import * as z from "zod";
import { ObjectId } from "mongodb";
import { db } from "../../configs/db.js";
export const User = z
    .object({
    username: z
        .string()
        .trim()
        .min(3, { message: "username must be at least 3 characters long" }),
    password: z
        .string()
        .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, {
        message: "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number and one special character",
    }),
    email: z.string().email({ message: "Invalid email address" }),
    phone: z
        .string()
        .regex(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/, {
        message: "Must be a valid phone number",
    }),
    fullName: z
        .string()
        .trim()
        .min(3, { message: "Full name must be at least 3 characters long" }),
    tasks: z.array(z.instanceof(ObjectId)).optional(),
})
    .strict();
export const UserUpdateSchema = User.extend({
    username: z.string().min(3),
}).partial();
export const Users = db.collection("users");
