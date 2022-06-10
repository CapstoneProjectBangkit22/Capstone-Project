/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.sql(`
        CREATE TABLE reports (
            id UUID UNIQUE PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            subject VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
        )
    `);
};

exports.down = (pgm) => {
  pgm.sql(`
        DROP TABLE reports;
    `);
};
