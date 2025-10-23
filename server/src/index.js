import express, { json } from "express";
import orgRouter from "./routers/org.route.js";
import userRouter from "./routers/user.route.js";
const app = express();
app.use(json());
app.use("/org", orgRouter);
app.use("/user", userRouter);
app.listen(3010, () => {
    console.log("server is up and running");
})