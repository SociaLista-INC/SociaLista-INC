SELECT st.*, us.name, us.picture
FROM stories st JOIN users us ON st.auth_id = us.auth_id
WHERE us.auth_id = $1 AND DATE_PART('day', NOW()
::timestamp - st.time::timestamp) < 1;