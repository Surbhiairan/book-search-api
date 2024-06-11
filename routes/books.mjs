import { Router } from 'express';
import { Sequelize } from 'sequelize';
import Book from '../models/Book.mjs';

const router = Router();

// Search books
router.get('/books', async (req, res) => {
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

    res.json({
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      books: rows
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
