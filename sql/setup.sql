-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`

DROP TABLE IF EXISTS post CASCADE;

CREATE TABLE post (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL LIMIT 255
);

DROP TABLE IF EXISTS github_users;

CREATE TABLE github_users (
  - id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username BIGINT GENERATED ALWAYS ALWAYS IDENTITY PRIMARY KEY,
  - email TEXT NOT NULL
  - password TEXT NOT NULL
)