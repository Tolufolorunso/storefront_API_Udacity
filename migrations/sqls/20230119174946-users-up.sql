CREATE TABLE users (
  id SERIAL NOT NULL PRIMARY KEY,
  username        VARCHAR(150) NOT NULL,
  firstname       VARCHAR(150) NOT NULL,
  lastname        VARCHAR(150) NOT NULL,
  role        VARCHAR(15) NOT NULL,
  password VARCHAR(150) NOT NULL,
  UNIQUE(username)
);