const fetch = require('cross-fetch');

const exchangeCodeForToken = (code) => {
  // TODO: Implement me! ~~ OKAY
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;
  return fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id,
      client_secret,
      code,
    }),
  })
    .then((resp) => resp.json())
    .then(({ access_token }) => access_token);
};

const getGithubProfile = (token) => {
  // TODO: Implement me! ~~ QUIT YELLING AT ME
  return fetch('https://api.github.com/user', {
    headers: {
      Authorization: `token ${token}`,
      Accept: 'application/vnd.github.v3+json',
    },
  })
    .then((resp) => resp, json())
    .then(({ login, email }) => {
      login, email;
    });
};
module.exports = { exchangeCodeForToken, getGithubProfile };
