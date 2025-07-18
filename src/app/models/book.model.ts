import mongoose, { Schema, Document } from 'mongoose';

export enum Genre {
  FICTION = 'FICTION',
  NON_FICTION = 'NON_FICTION',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  BIOGRAPHY = 'BIOGRAPHY',
  FANTASY = 'FANTASY'
}

export interface IBook extends Document {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available: boolean;
  createdAt: Date;
  updatedAt: Date;
  updateAvailability(): Promise<void>;
}

export interface IBookModel extends mongoose.Model<IBook> {
  findAvailableBooks(): Promise<IBook[]>;
}

const bookSchema = new Schema<IBook>({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true
  },
  author: {
    type: String,
    required: [true, 'Author is required'],
    trim: true
  },
  genre: {
    type: String,
    enum: Object.values(Genre),
    required: [true, 'Genre is required']
  },
  isbn: {
    type: String,
    required: [true, 'ISBN is required'],
    unique: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  copies: {
    type: Number,
    required: [true, 'Copies is required'],
    min: [0, 'Copies must be a positive number']
  },
  available: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Instance method to update availability based on copies
bookSchema.methods.updateAvailability = async function(): Promise<void> {
  this.available = this.copies > 0;
  await this.save();
};

// Static method to find available books
bookSchema.statics.findAvailableBooks = function(): Promise<IBook[]> {
  return this.find({ available: true });
};

// Pre-save middleware to automatically update availability
bookSchema.pre<IBook>('save', function(next) {
  this.available = this.copies > 0;
  next();
});

// Post-save middleware for logging
bookSchema.post<IBook>('save', function(doc) {
  console.log(`Book "${doc.title}" saved successfully`);
});

const Book = mongoose.model<IBook, IBookModel>('Book', bookSchema);

export default Book;