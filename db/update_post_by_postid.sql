UPDATE posts SET
    content = $2
    WHERE post_id= $1;