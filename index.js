import { query } from './db.js'
import { getBooksWithAuthors } from './queries/getBooksWithAuthors.js';

const testConnection = async () => {
  const res = await query('SELECT NOW()');
  console.log('Connected:', res.rows[0]);
};

testConnection();

const books = await getBooksWithAuthors();

console.log('Böcker med författare:');
books.forEach(book => {
  console.log(`${book.title} - ${book.author}`);
});

