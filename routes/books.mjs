import { Router } from 'express';
import { Sequelize } from 'sequelize';
import Book from '../models/Book.mjs';
import { NotFoundError, BadRequestError } from '../customError.mjs';


const router = Router();

// Search books
router.get('/books', async (req, res, next) => {
  try {
    const { title, author, genre, publishedYear, sortBy, order, size, page } = req.query;
    const query = {};

    if (title) query.title = { [Sequelize.Op.like]: `%${title}%` };
    if (author) query.author = { [Sequelize.Op.like]: `%${author}%` };
    if (genre) query.genre = { [Sequelize.Op.like]: `%${genre}%` };
    if (publishedYear) query.publishedYear = publishedYear;

    // Sorting
    const orderArray = [];
    if (sortBy) {
      const direction = order === 'desc' ? 'DESC' : 'ASC';
      orderArray.push([sortBy, direction]);
    }

    const limit = parseInt(size);
    const offset = (parseInt(page) - 1) * limit;

    const { count, rows } = await Book.findAndCountAll({
      where: query,
      order: orderArray,
      limit,
      offset
    });

    if (!rows.length) {
      throw new NotFoundError('No books found matching the criteria');
    }

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      books: rows
    });
  } catch (err) {
    if (err instanceof Sequelize.ValidationError) {
      return next(new BadRequestError(err.message));
    }
    next(err);
  }
});

export default router;
