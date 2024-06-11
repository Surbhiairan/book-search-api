import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { Sequelize } from 'sequelize';
import bookRoutes from './routes/books.mjs';

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', bookRoutes);

const sequelize = new Sequelize('booksearch', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

export default app;