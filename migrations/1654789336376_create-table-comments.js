/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.sql(`
        CREATE TABLE comments (
            id UUID UNIQUE PRIMARY KEY,
            content TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        );
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE comments;
    `);
};
