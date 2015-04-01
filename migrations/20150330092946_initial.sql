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
  'J8soTAOQzrck1xkh1WZUMGfPxORY2/IHrAo59LvLJsYsbBSJdKeyXy7rh/FDGS/lSkrhiXtsbycytjEgrA8GVw==',
  'e0eWF5KZEPrBik6v57PL1fL/keU3P/L8Msr1Q53EY6G4o8QT+M2dnQpU67oo4JXjcrpOZJonTLU/O7LyC5uMii5GPmj2hMYfyT81Aso+R9hkW21HDEocR4WRh32USSRNt761SEytGOT8nB1UPBmmuzawqzLpb1iPQKEiSm0qw1g='
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
