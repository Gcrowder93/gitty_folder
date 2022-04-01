const pool = require('../utils/pool');

module.exports = class Post {
  id;
  title;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
  }

  static async insert({ title }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
          secret (title)
          VALUES
          ($1)
          RETURNING
          *
          `,
      [title]
    );
    return new Post(rows[0]);
  }
};
