select us.name, us.picture, pc.comment, ps.content, uss.name as userWithPost, ps.post_id, us.auth_id
from post_comments pc
    join users us on pc.auth_id=us.auth_id
    join posts ps on pc.post_id=ps.post_id
    join users uss on uss.auth_id=ps.auth_id
order by comment_id desc
limit 10;