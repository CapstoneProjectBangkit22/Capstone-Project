const { v4: uuidv4 } = require('uuid');

const pool = require('../database/pool');

const save = async (comment) => {
  const query = {
    text: `
            INSERT INTO comments (id, content)
            VALUES ($1, $2)
            RETURNING content, created_at AS "createdAt"
        `,
    values: [uuidv4(), comment],
  };

  const result = await pool.query(query);

  return result.rows[0];
};

const findAll = async () => {
  const query = `
    SELECT content, created_at AS "createdAt"
    FROM comments
  `;

  const result = await pool.query(query);

  return result.rows;
};

module.exports = {
  save,
  findAll,
};
