import { Request, Response } from 'express';

import { handleError } from '../utils/errorHandler';
import Book, { IBook } from '../models/book.model';

export const createBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const book: IBook = new Book(req.body);
    await book.save();
    
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: book
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getAllBooks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { filter, sort = 'asc', sortBy = 'createdAt', limit = 10 } = req.query;
    
    let query = Book.find();
    
    // Filter by genre if provided
    if (filter) {
      query = query.where('genre').equals(filter);
    }
    
    // Sort
    const sortOrder = sort === 'desc' ? -1 : 1;
    const sortObj: any = {};
    sortObj[sortBy as string] = sortOrder;
    query = query.sort(sortObj);
    
    // Limit
    query = query.limit(Number(limit));
    
    const books = await query.exec();
    
    res.status(200).json({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    const book = await Book.findById(bookId);
    
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
        error: 'Book with the specified ID does not exist'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Book retrieved successfully',
      data: book
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByIdAndUpdate(bookId, req.body, { 
      new: true, 
      runValidators: true 
    });
    
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
        error: 'Book with the specified ID does not exist'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Book updated successfully',
      data: book
    });
  } catch (error) {
    handleError(res, error);
  }
};

export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { bookId } = req.params;
    const book = await Book.findByIdAndDelete(bookId);
    
    if (!book) {
      res.status(404).json({
        success: false,
        message: 'Book not found',
        error: 'Book with the specified ID does not exist'
      });
      return;
    }
    
    res.status(200).json({
      success: true,
      message: 'Book deleted successfully',
      data: null
    });
  } catch (error) {
    handleError(res, error);
  }
};