import express from "express";
import morgan from "morgan";
import cors from "cors";

import auth from "./api/auth/auth.routes.js";
import users from "./api/users/users.routes.js";
import tasks from "./api/tasks/tasks.routes.js";
import customers from "./api/customers/customers.routes.js";
import { connectToDB } from "./configs/mongoose.js";

import { authorize } from "./middlewares/auth.js";

connectToDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/login", auth);
app.use("/api/v1/users", users);

app.use(authorize);
app.use("/api/v1/tasks", tasks);
app.use("/api/v1/customers", customers);

export default app;
