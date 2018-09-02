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


CREATE TABLE followers
(
    id SERIAL PRIMARY KEY,
    auth_id text REFERENCES users(auth_id),
    followed_by text REFERENCES users(auth_id),
    UNIQUE (auth_id, followed_by)
);

CREATE TABLE comments
(
    comment_id SERIAL PRIMARY KEY,
    auth_id text REFERENCES users(auth_id),
    post_id integer REFERENCES posts(post_id),
    comment text
);

CREATE TABLE comment_like
(
    comment_like_id SERIAL PRIMARY KEY,
    auth_id text REFERENCES users(auth_id),
    comment_id integer REFERENCES comments(comment_id),
    rate integer,
    UNIQUE (auth_id, comment_id)
);



--SELECT ps.post_id, us.name, us.auth_id, us.picture, ps.content, pi.image_id, pi.image_url, ps.time, pl.rate as likestotal, pl.auth_id as like_auth_id
--FROM posts ps
--    JOIN users us ON us.auth_id= ps.auth_id
--    left outer JOIN post_images pi ON ps.post_id= pi.post_id
--    left outer Join post_like pl on pl.post_id = pi.post_id
--ORDER BY ps.time DESC;

--, (SELECT SUM(rate)
--    FROM post_like pl
--    WHERE ps.post_id = pl.post_id) likestotal
--
--SELECT pl.post_id, pl.like_id, us.auth_id, us.name, us.picture, pl.rate FROM post_like pl JOIN users us ON us.auth_id = pl.auth_id WHERE pl.post_id = 168 ORDER BY pl.like_id DESC;

--SELECT pl.post_id, pl.like_id, us.auth_id, us.name, us.picture, pl.rate
--FROM post_like pl JOIN users us ON us.auth_id = pl.auth_id
--ORDER BY pl.like_id DESC;