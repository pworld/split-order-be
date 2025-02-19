import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productRoutes from './routes/product.routes';
import { initializeDatabase } from './database/connection';
import { authenticateToken } from './middleware/authMiddleware';

const app = express();
const HOST = process.env.HOST;
const HOST_PORT = process.env.HOST_PORT;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// Protect API routes with the token authentication middleware
app.use("/api", authenticateToken, productRoutes);

// Start server
initializeDatabase()
  .then(() => {
    app.listen(HOST_PORT, () => {
      console.log(`Server is running on ${HOST}:${HOST_PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });
