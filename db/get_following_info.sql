select *
from followers
WHERE auth_id=$1 and followed_by = $2;