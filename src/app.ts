import express from "express";
import gadgetRoutes from "./routes/gadgetRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use("/gadget", gadgetRoutes);
app.use("/user", userRoutes)

export default app;
