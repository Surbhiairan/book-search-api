import request from 'supertest';
import { expect } from 'chai';
import app from '../../server.mjs';
import BookTest from '../../models/BookTest.mjs';


describe('Book API', () => {
  before(async () => {
    await BookTest.sync({ force: true });
    await BookTest.bulkCreate([
      { title: 'Book1', author: 'Author1', genre: 'Genre1', publishedYear: 2021 },
      { title: 'Book2', author: 'Author2', genre: 'Genre2', publishedYear: 2022 },
      { title: 'Book3', author: 'Author3', genre: 'Genre3', publishedYear: 2023 }
    ]);
  });

  //Case - 1
  it('should get all books with default pagination', async () => {
    const res = await request(app)
      .get('/api/books')
      .expect(200);

    expect(res.body.books).to.have.lengthOf(3);
    expect(res.body.totalItems).to.equal(3);
  });

  //Case - 2
  it('should get books with pagination', async () => {
    const res = await request(app)
      .get('/api/books?page=1&size=2')
      .expect(200);

    expect(res.body.books).to.have.lengthOf(2);
    expect(res.body.totalItems).to.equal(3);
    expect(res.body.currentPage).to.equal(1);
    expect(res.body.totalPages).to.equal(2);
  });

  //Case - 3
  it('should get books sorted by title', async () => {
    const res = await request(app)
      .get('/api/books?sortBy=title&order=asc')
      .expect(200);

    expect(res.body.books[0].title).to.equal('Book1');
    expect(res.body.books[1].title).to.equal('Book2');
    expect(res.body.books[2].title).to.equal('Book3');
  });

  //Case - 4
  it('should filter books by author', async () => {
    const res = await request(app)
      .get('/api/books?author=Author1')
      .expect(200);

    expect(res.body.books).to.have.lengthOf(1);
    expect(res.body.books[0].author).to.equal('Author1');
  });
});
