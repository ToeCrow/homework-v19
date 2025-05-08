import { query } from '../db.js';

export const getStudentsWithCourses = async () => {
  try {
    const res = await query(`
      SELECT 
        students.first_name || ' ' || students.last_name AS student,
        courses.course_name AS course
      FROM students
      JOIN enrollments ON students.id = enrollments.student_id
      JOIN courses ON courses.id = enrollments.course_id
      ORDER BY students.first_name;
    `);

    const grouped = {};
    res.rows.forEach(row => {
      if (!grouped[row.student]) {
        grouped[row.student] = [];
      }
      grouped[row.student].push(row.course);
    });

    console.log('📘 Studenter med kurser:');
    for (const student in grouped) {
      console.log(`${student}: ${grouped[student].join(', ')}`);
    }
  } catch (err) {
    console.error('💥 Fel vid hämtning av studenter med kurser:', err);
  }
};

getStudentsWithCourses();
