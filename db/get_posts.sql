SELECT ps.post_id, us.name, us.auth_id, us.picture, ps.content, pi.image_id, pi.image_url, (SELECT SUM(rate)
    FROM post_likes pl
    WHERE ps.post_id = pl.post_id) likestotal
FROM posts ps
    JOIN users us ON us.auth_id= ps.auth_id
    left outer JOIN post_images pi ON ps.post_id= pi.post_id;
