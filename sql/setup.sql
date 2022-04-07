-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE post (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(255) NOT NULL
);

DROP TABLE IF EXISTS github_users;

CREATE TABLE github_users (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  username TEXT NOT NULL,
  email TEXT NOT NULL
);

INSERT INTO post(title)
VALUES ('imagine this is 255 characters')