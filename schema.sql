CREATE TABLE users
(
    user_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    profile_img TEXT,
    auth_id VARCHAR(100),
    isAdmin BOOLEAN

);

INSERT INTO users
    (name, profile_img, auth_id, isAdmin)
VALUES
    ('Abhishek Duggal', 'fsafs', true)



CREATE TABLE posts
(
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(150),
    subtitle VARCHAR(200),
    content TEXT,
    post_img_id INT REFERENCES post_image(img_id)
);

INSERT INTO posts
    (user_id, title, subtitle, content, post_img_id)
VALUES
    (1)

CREATE TABLE post_image
(
    post_img_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    post_id INT REFERENCES posts(post_id)
)

CREATE TABLE followers
(
    follow_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)
);

INSERT INTO followers
    (user_id)
VALUES
    (1)



CREATE TABLE likes
(
    like_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    post_id INT REFERENCES posts(post_id)
);

INSERT INTO likes
    (user_id, post_id)
VALUES
    (1, 1)



CREATE TABLE chats
(
    chat_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)
);

INSERT INTO chats
    (user_id)
VALUES
    (1)