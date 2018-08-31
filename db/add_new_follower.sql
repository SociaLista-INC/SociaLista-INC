INSERT INTO followers
    (auth_id, followed_by,following)
VALUES
    ($1, $2, true)
ON CONFLICT
(auth_id, followed_by) DO NOTHING;