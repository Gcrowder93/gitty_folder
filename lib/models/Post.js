const pool = require('../utils/pool');

module.exports = class Post {
  id;
  title;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
  }

  static getAll() {
    return pool
      .query(
        `
    SELECT
        *
    FROM
        post
    `
      )
      .then(({ rows }) => rows.map((row) => new Post(row)));
  }

  static async insert({ title }) {
    const { rows } = await pool.query(
      `
          INSERT INTO
          post (title)
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
