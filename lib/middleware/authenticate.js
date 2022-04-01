const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {
  try {
    const cookie = req.cookies[process.env.COOKIE_NAME];

    //this is checking the httpOnly session cookie for the current user
    if (!cookie) throw new Error('You must be signed in to continue');

    //this is verifying the JWT token stored in the cookie, then attaches to each request
    const user = jwt.verify(cookie, process.env.JWT_SECRET);
    req.user = user;

    next();
  } catch (err) {
    err.status = 401;
    next(err);
  }
};
