import dotenv from 'dotenv';
import app from './app';
import connectDB from './app/config/mongodb';


// Load environment variables
dotenv.config();

const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📚 Library Management API is ready!`);
});