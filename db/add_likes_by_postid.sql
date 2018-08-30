INSERT INTO post_like
    (post_id, auth_id, rate)
VALUES
    ($1, $2, $3)
ON CONFLICT
(post_id, auth_id) DO NOTHING;