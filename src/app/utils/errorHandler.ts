import { Response } from 'express';

export const handleError = (res: Response, error: any): void => {
  console.error('Error:', error);
  
  // MongoDB duplicate key error
  if (error.code === 11000) {
    const field = Object.keys(error.keyPattern)[0];
    res.status(400).json({
      success: false,
      message: `${field} already exists`,
      error: `Duplicate ${field} value`
    });
    return;
  }
  
  // Mongoose validation error
  if (error.name === 'ValidationError') {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      error: error
    });
    return;
  }
  
  // MongoDB CastError (invalid ObjectId)
  if (error.name === 'CastError') {
    res.status(400).json({
      success: false,
      message: 'Invalid ID format',
      error: 'The provided ID is not valid'
    });
    return;
  }
  
  // Generic server error
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: error.message || 'Something went wrong'
  });
};