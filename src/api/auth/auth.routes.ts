import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { login } from "./auth.controllers.js";
import { User } from "../users/user.schema.js";

const router = Router();

router.route("/").post(
  validate({
    body: User.pick({ username: true, password: true }),
  }),
  login,
);

export default router;
