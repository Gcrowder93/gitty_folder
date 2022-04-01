const bcrypt = require('bcryptjs');
const GithubUser = require('../models/GithubUser');

module.exports = class UserService {
  static async create({ username, email }) {
    Number(process.env.SALT_ROUNDS);

    return GithubUser.insert({
      username,
      email,
    });
  }
};
