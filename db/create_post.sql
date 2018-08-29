INSERT INTO posts
    (auth_id, content)
VALUES
    ($1, $2)
RETURNING *;