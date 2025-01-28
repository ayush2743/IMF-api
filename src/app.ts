import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../swagger.json';
import gadgetRoutes from "./routes/gadgetRoutes";
import userRoutes from "./routes/userRoutes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/gadgets", gadgetRoutes);
app.use("/user", userRoutes)

export default app;
1 