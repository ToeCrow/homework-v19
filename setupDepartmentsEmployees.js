import { query } from './db.js';

async function setup() {
  try {
    // Ta bort gamla tabeller om de finns (viktig ordning), //! Endast för utveckling testning
    await query(`DROP TABLE IF EXISTS employees`);
    await query(`DROP TABLE IF EXISTS departments`);
    
    // Skapa departments-tabell
    await query(`
      CREATE TABLE departments (
        id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        name VARCHAR(50)
      )
    `);
    
    // Skapa employees-tabell
    await query(`
      CREATE TABLE employees (
        id INTEGER GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
        first_name VARCHAR(30),
        last_name VARCHAR(30),
        department_id INTEGER REFERENCES departments(id)
      )  
    `);

    // Lägg till testdata i departments
    await query(`
      INSERT INTO departments (name) VALUES
      ('HR'),
      ('Engineering'),
      ('Marketing')
    `);

    // Lägg till testdata i employees
    await query(`
      INSERT INTO employees (first_name, last_name, department_id) VALUES
      ('Anna', 'Andersson', 1),
      ('Bertil', 'Bengtsson', 2),
      ('Cecilia', 'Carlsson', 2),
      ('David', 'Dahl', 3)
    `);

    console.log('Tabeller och testdata för departments/employees skapade.');
  } catch (err) {
    console.error('Fel vid setup:', err);
  }
}

setup();
