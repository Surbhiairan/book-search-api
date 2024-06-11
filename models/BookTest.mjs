import { DataTypes, Sequelize } from 'sequelize';
const sequelize = new Sequelize('booksearch', 'username', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const BookTest = sequelize.define('BookTest', {
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  genre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publishedYear: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

sequelize.sync()
  .then(() => {
    console.log('Book table has been created.');
  });

  export default BookTest;

