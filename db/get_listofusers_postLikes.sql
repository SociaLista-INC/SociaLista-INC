SELECT pl.post_id, pl.like_id, us.auth_id, us.name, us.picture, pl.rate
FROM post_like pl JOIN users us ON us.auth_id = pl.auth_id
WHERE pl.post_id = $1
ORDER BY pl.like_id DESC;