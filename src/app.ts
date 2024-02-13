import express from "express";
import morgan from "morgan";

import users from "./api/users/users.routes.js";
import tasks from "./api/tasks/tasks.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/api/v1/users", users);
app.use("/api/v1/tasks", tasks);

export default app;
