
INSERT INTO CATEGORY(id, name) VALUES (1, 'Eurogames');
INSERT INTO CATEGORY(id, name) VALUES (2, 'Ameritrash');
INSERT INTO CATEGORY(id, name) VALUES (3, 'Familiar');


INSERT INTO CLIENT(id, name) VALUES (1, 'Fernando Herrera');
INSERT INTO CLIENT(id, name) VALUES (2, 'Cesar Ferrandez');
INSERT INTO CLIENT(id, name) VALUES (3, 'Carlos Aguilar');
INSERT INTO CLIENT(id, name) VALUES (4, 'Diego Rico');
INSERT INTO CLIENT(id, name) VALUES (5, 'Daniel Sanchez');
INSERT INTO CLIENT(id, name) VALUES (6, 'Pablo Jimenez');


INSERT INTO AUTHOR(id, name, nationality) VALUES (1, 'Alan R. Moon', 'US');
INSERT INTO AUTHOR(id, name, nationality) VALUES (2, 'Vital Lacerda', 'PT');
INSERT INTO AUTHOR(id, name, nationality) VALUES (3, 'Simone Luciani', 'IT');
INSERT INTO AUTHOR(id, name, nationality) VALUES (4, 'Perepau Llistosella', 'ES');
INSERT INTO AUTHOR(id, name, nationality) VALUES (5, 'Michael Kiesling', 'DE');
INSERT INTO AUTHOR(id, name, nationality) VALUES (6, 'Phil Walker-Harding', 'US');


INSERT INTO GAME(id, title, age, category_id, author_id) VALUES (1, 'On Mars', '14', 1, 2);
INSERT INTO GAME(id, title, age, category_id, author_id) VALUES (2, 'Aventureros al tren', '8', 3, 1);
INSERT INTO GAME(id, title, age, category_id, author_id) VALUES (3, '1920: Wall Street', '12', 1, 4);
INSERT INTO GAME(id, title, age, category_id, author_id) VALUES (4, 'Barrage', '14', 1, 3);
INSERT INTO GAME(id, title, age, category_id, author_id) VALUES (5, 'Los viajes de Marco Polo', '12', 1, 3);
INSERT INTO GAME(id, title, age, category_id, author_id) VALUES (6, 'Azul', '8', 3, 5);

INSERT INTO LOAN(id, game_id, client_id, loan_date, return_date) VALUES (1, 2, 2, '2023-04-09', '2023-04-23' );
INSERT INTO LOAN(id, game_id, client_id, loan_date, return_date) VALUES (2, 3, 5, '2023-04-01', '2023-04-12' );
INSERT INTO LOAN(id, game_id, client_id, loan_date, return_date) VALUES (3, 6, 3, '2023-04-05', '2023-04-19' );
INSERT INTO LOAN(id, game_id, client_id, loan_date, return_date) VALUES (4, 1, 6, '2023-04-10', '2023-04-20' );
INSERT INTO LOAN(id, game_id, client_id, loan_date, return_date) VALUES (5, 5, 1, '2023-04-12', '2023-04-15' );

INSERT INTO USERS(id, username, password) VALUES (1, 'admin', 'admin');