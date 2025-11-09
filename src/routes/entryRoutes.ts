import { Router } from 'express';
import {
  createEntry,
  getAllEntries,
  getEntryById,
  updateEntry,
  deleteEntry,
  searchEntries,
} from '../controllers/entryController';
import { validateRequest, validateQuery } from '../middlewares/validation';
import {
  createEntrySchema,
  updateEntrySchema,
  paginationSchema,
  searchSchema,
} from '../validators/entryValidators';

const router = Router();

// Create new entry
router.post('/', validateRequest(createEntrySchema), createEntry);

// Get all entries with pagination
router.get('/', validateQuery(paginationSchema), getAllEntries);

// Search entries by title (Bonus feature)
router.get('/search', validateQuery(searchSchema), searchEntries);

// Get entry by ID
router.get('/:id', getEntryById);

// Update entry
router.put('/:id', validateRequest(updateEntrySchema), updateEntry);

// Delete entry
router.delete('/:id', deleteEntry);

export default router;
