INSERT INTO stories
    (auth_id, title, img_url)
VALUES
    ($1, $2, $3)
RETURNING *;