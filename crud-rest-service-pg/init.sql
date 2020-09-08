CREATE TABLE Users (
   id   VARCHAR(1000)       NOT NULL,
   login    VARCHAR(1000) NOT NULL,
   password     VARCHAR(1000) NOT NULL,
   age NUMERIC,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   deleted_at TIMESTAMP,
   CONSTRAINT PK_Users PRIMARY KEY (id)
);
INSERT INTO Users (id, login, password, age) VALUES ('qwerwk', 'Dave', '12wer123F', '35');
INSERT INTO Users (id, login, password, age) VALUES ('asdfsdd', 'Karl', 'sd12wer123F', '75');
