select name as friend, us.auth_id, picture
from followers fl
    join users us on fl.auth_id=us.auth_id
where followed_by=$1;