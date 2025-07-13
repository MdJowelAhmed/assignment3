import mongoose, { Schema, Document } from 'mongoose';

export interface IBorrow extends Document {
  book: mongoose.Types.ObjectId;
  quantity: number;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const borrowSchema = new Schema<IBorrow>({
  book: {
    type: Schema.Types.ObjectId,
    ref: 'Book',
    required: [true, 'Book is required']
  },
  quantity: {
    type: Number,
    required: [true, 'Quantity is required'],
    min: [1, 'Quantity must be at least 1']
  },
  dueDate: {
    type: Date,
    required: [true, 'Due date is required']
  }
}, {
  timestamps: true
});

// Pre-save middleware for logging
borrowSchema.pre<IBorrow>('save', function(next) {
  console.log(`Borrowing ${this.quantity} copies of book ${this.book}`);
  next();
});

// Post-save middleware
borrowSchema.post<IBorrow>('save', function(doc) {
  console.log(`Borrow record created for book ${doc.book}`);
});

const Borrow = mongoose.model<IBorrow>('Borrow', borrowSchema);

export default Borrow;