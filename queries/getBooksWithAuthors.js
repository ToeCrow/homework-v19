import { query } from '../db.js';

export const getBooksWithAuthors = async () => {
  const res = await query(`
    SELECT
      books.title,
      authors.first_name || ' ' || authors.last_name AS author
    FROM books
    JOIN authors ON books.author_id = authors.id
  `);

  return res.rows;
};
