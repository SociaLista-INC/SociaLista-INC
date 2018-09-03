SELECT pi.post_id, pi.image_url, (SELECT SUM(rate)
    FROM post_like pl
    WHERE pi.post_id = pl.post_id) likestotal
FROM post_images pi