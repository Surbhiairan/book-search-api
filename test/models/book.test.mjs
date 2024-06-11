import { expect } from 'chai';
import { Sequelize, DataTypes } from 'sequelize';
import BookModel from '../../models/BookTest.mjs';


describe('Book Model', () => {
  const sequelize = new Sequelize('booksearch', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql'
  });
  const Book = new BookModel(sequelize, DataTypes);

  before(async () => {
    await sequelize.sync({ force: true });
  });

  it('should create a book', async () => {
    const book = await Book.create({
      title: 'Test Book',
      author: 'Test Author',
      genre: 'Test Genre',
      publishedYear: 2023
    });

    expect(book.title).to.equal('Test Book');
    expect(book.author).to.equal('Test Author');
    expect(book.genre).to.equal('Test Genre');
    expect(book.publishedYear).to.equal(2023);
  });
});