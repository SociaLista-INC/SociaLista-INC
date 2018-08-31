SELECT count(followed_by)
FROM followers
where auth_id=$1;