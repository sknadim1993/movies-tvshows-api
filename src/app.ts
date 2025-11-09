import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import entryRoutes from './routes/entryRoutes';
import { errorHandler, notFound } from './middlewares/errorHandler';

const app: Application = express();

// Security middleware
app.use(helmet());

// CORS middleware
app.use(cors());

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
  });
});

// API routes
app.use('/api/entries', entryRoutes);

// 404 handler
app.use(notFound);

// Error handler
app.use(errorHandler);

export default app;
