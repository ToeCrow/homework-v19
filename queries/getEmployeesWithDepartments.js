import { query } from '../db.js';

async function getEmployeesWithDepartments() {
  try {
    const res = await query(`
      SELECT employees.first_name AS first_name, employees.last_name AS last_name, departments.name AS department
      FROM employees
      LEFT JOIN departments ON employees.department_id = departments.id;
    `);

    console.log('Anställda med tillhörande department (LEFT JOIN):');
    res.rows.forEach(row => {
      console.log(`${row.first_name} ${row.last_name} - ${row.department || 'Ingen avdelning'}`);
    });

  } catch (err) {
    console.error('Fel vid hämtning av anställda:', err);
  }
}

getEmployeesWithDepartments();
