import { Router } from "express";
import { ParamsWithId } from "../../interfaces/params.js";
import { validate } from "../../middlewares/validate.js";
import { User } from "./user.schema.js";
import { createUser, deleteUser, getUserById, updateUser, } from "./users.controllers.js";
const router = Router();
router.route("/").post(validate({
    body: User.partial().required({
        username: true,
        password: true,
        confirmPassword: true,
        email: true,
    }),
}), createUser);
router
    .route("/:id")
    .get(validate({ params: ParamsWithId }), getUserById)
    .put(validate({ params: ParamsWithId, body: User.partial() }), updateUser)
    .delete(deleteUser);
export default router;
