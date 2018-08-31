SELECT *
FROM followers fo
    join users us on us.auth_id=fo.followed_by
where fo.auth_id=$1;
