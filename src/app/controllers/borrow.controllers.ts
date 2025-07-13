import { Request, Response } from 'express';

import { handleError } from '../utils/errorHandler';
import mongoose from 'mongoose';
import Book from '../models/book.model';
import Borrow from '../models/borrow.model';

export const borrowBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { book: bookId, quantity, dueDate } = req.body;
    
    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
        error: 'Book with the specified ID does not exist'
      });
      return;
    }

    if (book.copies < quantity) {
      res.status(400).json({
        success: false,
        message: 'Not enough copies available',
        error: `Only ${book.copies} copies available, but ${quantity} requested`
      });
      return;
    }

    // 👇 No transaction
    book.copies -= quantity;
    await book.updateAvailability();
    await book.save();

    const borrow = new Borrow({
      book: bookId,
      quantity,
      dueDate
    });
    await borrow.save();

    res.status(201).json({
      success: true,
      message: 'Book borrowed successfully',
      data: borrow
    });
  } catch (error) {
    handleError(res, error);
  }
};


export const getBorrowedBooksSummary = async (req: Request, res: Response): Promise<void> => {
  try {
    const borrowedSummary = await Borrow.aggregate([
      {
        $group: {
          _id: '$book',
          totalQuantity: { $sum: '$quantity' }
        }
      },
      {
        $lookup: {
          from: 'books',
          localField: '_id',
          foreignField: '_id',
          as: 'bookDetails'
        }
      },
      {
        $unwind: '$bookDetails'
      },
      {
        $project: {
          _id: 0,
          book: {
            title: '$bookDetails.title',
            isbn: '$bookDetails.isbn'
          },
          totalQuantity: 1
        }
      },
      {
        $sort: { totalQuantity: -1 }
      }
    ]);
    
    res.status(200).json({
      success: true,
      message: 'Borrowed books summary retrieved successfully',
      data: borrowedSummary
    });
  } catch (error) {
    handleError(res, error);
  }
};