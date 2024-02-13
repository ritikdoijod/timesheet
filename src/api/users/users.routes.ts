import { Router } from "express";
import { ParamsWithId } from "../../interfaces/params.js";
import { validate } from "../../middlewares/validate.js";
import { User, UserUpdateSchema } from "./user.model.js";
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "./users.controllers.js";

const router = Router();

router
  .route("/")
  .post(validate({ body: User }), createUser)
  .get((req, res) => res.status(200).json({ message: "hello" }));

router
  .route("/:id")
  .get(validate({ params: ParamsWithId }), getUserById)
  .put(validate({ params: ParamsWithId, body: UserUpdateSchema }), updateUser)
  .delete(deleteUser);

export default router;
