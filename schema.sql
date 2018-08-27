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




CREATE TABLE post_likes
(
    like_id SERIAL PRIMARY KEY,
    post_id integer REFERENCES posts(post_id) ON DELETE CASCADE,
    auth_id text REFERENCES users(auth_id) ON DELETE CASCADE,
    rate integer DEFAULT 0
);

INSERT INTO post_likes
    (post_id, post_id, auth_id, rate)
VALUES
    (1, 1, 'dfafafsd', 0)



CREATE TABLE chats
(
    chat_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id)
);

INSERT INTO chats
    (user_id)
VALUES
    (1)