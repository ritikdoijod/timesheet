import { Router } from "express";
import { getAllCustomers, createCustomer } from "./customers.controllers.js";

const router = Router();

router.route("/").get(getAllCustomers).post(createCustomer);

export default router;
