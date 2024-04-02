CREATE DATABASE CRUDpostress;

CREATE TABLE users(
  u_id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  password VARCHAR(255),
  email VARCHAR(255)
);

-- psql -U postgres
-- \c crudpostress
