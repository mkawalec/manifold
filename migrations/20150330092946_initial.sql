---!> MARINER:MIGRATE:UP:
BEGIN;
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

  CREATE TABLE users (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    username varchar UNIQUE NOT NULL,
    password varchar NOT NULL,
    salt varchar NOT NULL,
    email
  );

  CREATE TABLE posts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    post varchar,
    published boolean NOT NULL DEFAULT false,
    created_at timestamp NOT NULL DEFAULT now(),
    updated_at timestamp
  );

  CREATE TABLE groups (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    name varchar UNIQUE NOT NULL
  );

  CREATE TABLE users_groups (
    user_id uuid NOT NULL references users(id),
    group_id uuid NOT NULL references groups(id),
    PRIMARY KEY(user_id, group_id)
  );    

  CREATE TABLE users_posts (
    user_id uuid NOT NULL references users(id),
    post_id uuid NOT NULL references posts(id),
    PRIMARY KEY (user_id, post_id)
  );

COMMIT;

---!> MARINER:MIGRATE:DOWN:
BEGIN;

  DROP EXTENSION "uuid-ossp";
  DROP TABLE posts;
  DROP TABLE groups;
  DROP TABLE users_groups;
  DROP TABLE users_posts;

COMMIT;
