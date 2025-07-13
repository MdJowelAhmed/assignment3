import { Router } from 'express';
import {
  borrowBook,
  getBorrowedBooksSummary
} from '../controllers/borrow.controllers';

const router = Router();

router.post('/', borrowBook);
router.get('/', getBorrowedBooksSummary);

export default router;