SELECT
    pc.comment_id, pc.auth_id, us.name, us.picture, pc.time, pc.comment, pc.post_id
FROM post_comments pc
    JOIN users us on us.auth_id = pc.auth_id
where post_id = $1;