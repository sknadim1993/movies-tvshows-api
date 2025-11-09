import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../config/database';
import { Entry } from '../entities/Entry';
import { AppError } from '../middlewares/errorHandler';
import { ILike } from 'typeorm';

const entryRepository = AppDataSource.getRepository(Entry);

// Create a new entry
export const createEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const entryData = req.body;

    const newEntry = entryRepository.create(entryData);
    const savedEntry = await entryRepository.save(newEntry);

    res.status(201).json({
      success: true,
      message: 'Entry created successfully',
      data: savedEntry,
    });
  } catch (error) {
    next(error);
  }
};

// Get all entries with pagination
export const getAllEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const [entries, total] = await entryRepository.findAndCount({
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: 'Entries retrieved successfully',
      data: entries,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get entry by ID
export const getEntryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const entry = await entryRepository.findOne({
      where: { id },
    });

    if (!entry) {
      throw new AppError('Entry not found', 404);
    }

    res.status(200).json({
      success: true,
      message: 'Entry retrieved successfully',
      data: entry,
    });
  } catch (error) {
    next(error);
  }
};

// Update entry
export const updateEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const entry = await entryRepository.findOne({
      where: { id },
    });

    if (!entry) {
      throw new AppError('Entry not found', 404);
    }

    Object.assign(entry, updateData);
    const updatedEntry = await entryRepository.save(entry);

    res.status(200).json({
      success: true,
      message: 'Entry updated successfully',
      data: updatedEntry,
    });
  } catch (error) {
    next(error);
  }
};

// Delete entry
export const deleteEntry = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;

    const entry = await entryRepository.findOne({
      where: { id },
    });

    if (!entry) {
      throw new AppError('Entry not found', 404);
    }

    await entryRepository.remove(entry);

    res.status(200).json({
      success: true,
      message: 'Entry deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// Search entries by title (Bonus feature)
export const searchEntries = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.query;
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const skip = (page - 1) * limit;

    const [entries, total] = await entryRepository.findAndCount({
      where: {
        title: ILike(`%${title}%`),
      },
      skip,
      take: limit,
      order: {
        createdAt: 'DESC',
      },
    });

    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      message: 'Search results retrieved successfully',
      data: entries,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
      },
    });
  } catch (error) {
    next(error);
  }
};
