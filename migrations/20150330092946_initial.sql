---!> MARINER:MIGRATE:UP:
BEGIN;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;

CREATE TABLE users (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  username varchar UNIQUE NOT NULL,
  password varchar NOT NULL,
  salt varchar NOT NULL,
  email varchar
);

CREATE TABLE posts (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  title varchar,
  post varchar,
  published boolean DEFAULT false NOT NULL,
  created_at timestamp DEFAULT now() NOT NULL,
  updated_at timestamp
);

CREATE TABLE groups (
  id uuid DEFAULT uuid_generate_v4() PRIMARY KEY,
  name varchar UNIQUE NOT NULL
);

CREATE TABLE users_groups (
  user_id uuid REFERENCES users(id) NOT NULL,
  group_id uuid REFERENCES groups(id) NOT NULL,
  PRIMARY KEY(user_id, group_id)
);    

CREATE TABLE users_posts (
  user_id uuid REFERENCES users(id) NOT NULL,
  post_id uuid REFERENCES posts(id) NOT NULL,
  PRIMARY KEY(user_id, post_id)
);

INSERT INTO users (username, password, salt) VALUES (
  'admin',
  'BBNaVmvBIU7Ta+Uox8G3OglICR4tvKRBnlbjxiChmY/1/AL93Wi2tbBzsVuUUuneYNVyeRxFiq0E6f8aRUaBKw==',
  'NsbEGZYHvzD2+E5UCcpMUrE+ihjB8jL+qdwalEiqlB25QtoIy4lehffF7i9EIQ95qTGvtHhAj0KDEzesj9l+eWKg/EM5rTLx/iO9FmwK2Tyl2ZLLcgLfXzrHDqm1TfYFYt3EEElDWbTbHj5fYwesnmr1/YdSZCzen7p5gmK4Jiw='
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
