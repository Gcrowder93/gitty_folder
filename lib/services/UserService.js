const bcrypt = require('bcryptjs');
const GithubUser = require('../models/GithubUser');

module.exports = class UserService {
  static async create({ email, username, password }) {
    const passwordHash = bcrypt.hashSync(
      password,
      Number(process.env.SALT_ROUNDS)
    );
    return GithubUser.insert({
      email,
      username,
      passwordHash,
    });
  }

  //   static async signIn({ email, password }) {
  //     // check for existing user
  //     const user = await GithubUser.findByEmail(email);
  //     if (!user) throw new Error('invalid email/password');

  //     // if user exists, compare hashed passwords
  //     const passwordsMatch = bcrypt.compareSync(password, user.passwordHash);
  //     if (!passwordsMatch) throw new Error('invalid email/password');

  //     // if passwords match, return user
  //     return user;
  // }
};
