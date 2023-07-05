CREATE TABLE if not exists movies (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  year integer,
  comments TEXT
);
