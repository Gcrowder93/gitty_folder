const pool = require('../utils/pool');

module.exports = class GithubUser {
  id;
  email;

  constructor(row) {
    this.id = row.id;
    this.email = row.email;
  }

  static async insert({ email }) {
    if (!email) throw new Error('Email is required');

    const { rows } = await pool.query(
      `
    INSERT INTO
    github_users (email)
    VALUES ($1)
    RETURNING *
    `,
      [email]
    );

    return new GithubUser(rows[0]);
  }

  static async findByEmail(email) {
    const { rows } = await pool.query(
      `
      SELECT *
      FROM github_users
      WHERE email=$1
      `,
      [email]
    );

    if (!rows[0]) return null;

    return new GithubUser(rows[0]);
  }

  toJSON() {
    return { ...this };
  }
};
