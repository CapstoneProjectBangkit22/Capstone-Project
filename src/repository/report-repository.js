const pg = require('knex')({ client: 'pg' });
const { v4: uuidv4 } = require('uuid');

const pool = require('../database/pool');

const save = async ({ subject, name, laporan }) => {
  const query = {
    text: `
            INSERT INTO reports (id, name, content, subject)
            VALUES ($1, $2, $3, $4)
            RETURNING id, name, subject, content AS laporan, created_at AS "createAt"
      `,
    values: [uuidv4(), name, laporan, subject],
  };

  const result = await pool.query(query);

  return result.rows[0];
};

const findAll = async ({ subject, name, laporan }) => {
  let query = pg('reports')
    .select('id')
    .select('name')
    .select('subject')
    .select({ laporan: 'content' })
    .select({ createAt: 'created_at ' });

  if (subject) {
    query = query.whereRaw('LOWER(subject) LIKE LOWER(?)', subject + '%');
  }

  if (name) {
    query = query.whereRaw('LOWER(name) LIKE LOWER(?)', name + '%');
  }

  if (laporan) {
    query = query.whereRaw('LOWER(report) LIKE LOWER(?)', laporan + '%');
  }

  const result = await pool.query(query.toString());

  return result.rows;
};

module.exports = {
  save,
  findAll,
};
