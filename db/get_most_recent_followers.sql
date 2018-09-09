select *
from users
order by time desc
limit 10;
-- select us.name as beingFollowed, uss.name, uss.picture
-- from followers fl
--     join users us on fl.auth_id=us.auth_id
--     join users uss on fl.followed_by=uss.auth_id
-- order by id desc
-- limit 10;

