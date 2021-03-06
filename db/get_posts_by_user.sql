SELECT ps.post_id, us.name, us.auth_id, us.picture, ps.content, pi.image_id, pi.image_url, ps.time, (SELECT SUM(rate)
    FROM post_like pl
    WHERE ps.post_id = pl.post_id) likestotal
FROM posts ps
    JOIN users us ON us.auth_id= ps.auth_id
    left outer JOIN post_images pi ON ps.post_id= pi.post_id
where ps.auth_id=$1
ORDER BY ps.time DESC;