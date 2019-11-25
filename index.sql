CREATE TABLE users(id SERIAL PRIMARY KEY, nickname TEXT NOT NULL, age INTEGER);
INSERT INTO users (nickname, age) VALUES ('Shani',37);
INSERT INTO users (nickname, age) VALUES ('Liz',25);
INSERT INTO users (nickname, age) VALUES ('David',5);