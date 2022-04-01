const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const UserService = require('../lib/services/UserService');
jest.mock('../lib/utils/github');

describe('gitty routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should redirect users to the github oauth page upon login', async () => {
    const req = await request(app).get('/api/v1/github/login');

    expect(req.header.location).toMatch(
      /https:\/\/github.com\/login\/oauth\/authorize\?client_id=[\w\d]+&scope=user&redirect_uri=http:\/\/localhost:7890\/api\/v1\/github\/login\/callback/i
    );
  });

  it('should login and redirect users to /api/v1/github/dashboard', async () => {
    const req = await request
      .agent(app)
      .get('/api/v1/github/login/callback?code=42')
      .redirects(1);

    expect(req.body).toEqual({
      id: expect.any(String),
      username: 'fake_github_user',
      email: 'not-real@example.com',
      // password: 'password',
      iat: expect.any(Number),
      exp: expect.any(Number),
    });
  });

  it('signs out user/deletes cookie', async () => {
    const agent = request.agent(app);

    await UserService.create({
      username: 'fake_github_user',
      email: 'not-real@example.com',
      // password: 'password',
    });

    await agent.post('/api/v1/github/dashboard').send({
      username: 'fake_github_user',
      email: 'not-real@example.com',
      // password: 'password',
    });

    const res = await agent.delete('/api/v1/github/dashboard');
    expect(res.body).toEqual({
      success: true,
      message: 'Signed out successfully!',
    });
  });

  it('allows a signed in user to create a post with a 255 limit', async () => {
    const agent = request.agent(app);

    await UserService.create({
      username: 'fake_github_user',
      email: 'not-real@example.com',
      // password: 'password',
    });
    await agent.post('/api/v1/github/dashboard').send({
      username: 'fake_github_user',
      email: 'not-real@example.com',
      // password: 'password',
    });

    const post = {
      title: 'imagine this is 255 characters',
    };
    const res = await request(app).post('/api/v1/posts').send(post);
    expect(res.body).toEqual({
      id: expect.any(String),
      ...post,
    });
  });
});
