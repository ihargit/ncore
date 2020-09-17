CREATE TABLE Users (
   id   VARCHAR(1000)       NOT NULL,
   login    VARCHAR(1000) NOT NULL,
   password     VARCHAR(1000) NOT NULL,
   age NUMERIC,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT PK_Users PRIMARY KEY (id)
);
CREATE TABLE Groups (
   id   VARCHAR(1000)       NOT NULL,
   name    VARCHAR(1000) NOT NULL,
   permissions     VARCHAR(1000)[] NOT NULL,
   updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
   CONSTRAINT PK_Groups PRIMARY KEY (id)
);
CREATE TABLE User_Group (
   group_id     VARCHAR(1000) REFERENCES Groups (id) ON UPDATE CASCADE ON DELETE CASCADE,
   user_id    VARCHAR(1000) REFERENCES Users (id) ON UPDATE CASCADE ON DELETE CASCADE,
   CONSTRAINT PK_User_Group PRIMARY KEY (group_id, user_id)
);
INSERT INTO Users (id, login, password, age) VALUES ('qwerqer', 'Dave', '12wer123F', '35');
INSERT INTO Users (id, login, password, age) VALUES ('asdfsdd', 'Karl', 'sd12wer123F', '75');

INSERT INTO Groups (id, name, permissions) VALUES ('zxcvzxc', 'group_one', '{read, write}');
INSERT INTO Groups (id, name, permissions) VALUES ('dfgdfgh', 'group_two', '{read}');

INSERT INTO User_Group (group_id, user_id) VALUES ('zxcvzxc', 'qwerqer');
INSERT INTO User_Group (group_id, user_id) VALUES ('dfgdfgh', 'asdfsdd');
