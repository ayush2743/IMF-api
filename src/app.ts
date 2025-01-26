import express from "express";
import gadgetRoutes from "./routes/gadgetRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use("/gadgets", gadgetRoutes);
app.use("/auth", userRoutes)

export default app;
