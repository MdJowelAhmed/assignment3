import express from 'express';
import cors from 'cors';
import bookRoutes from './app/routes/bookRoutes';
import borrowRoutes from './app/routes/borrowRoutes';
import { errorHandler, notFound } from './app/middleware/errorMiddleware';


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/borrow', borrowRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Library Management API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Library Management API',
    version: '1.0.0',
    endpoints: {
      books: '/api/books',
      borrow: '/api/borrow',
      health: '/health'
    }
  });
});

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;