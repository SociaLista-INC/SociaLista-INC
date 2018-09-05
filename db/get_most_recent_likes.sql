select us.name, us.picture, ps.content, uss.name as userWithPost, ps.post_id, us.auth_id
from post_like pl
    join users us on pl.auth_id=us.auth_id
    join posts ps on pl.post_id=ps.post_id
    join users uss on uss.auth_id=ps.auth_id
order by like_id desc
limit 10;