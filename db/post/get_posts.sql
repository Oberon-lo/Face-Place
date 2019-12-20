SELECT 
  p.post_id, 
  p.postcont, 
  p.post_time, 
  u.first_name, 
  u.last_name, 
  u.prof_pic, 
  p.user_id   
FROM posts p
-- select * returns too much repeated and unused data (plus it's confusing to look at)
JOIN users u ON u.user_id = p.user_id
JOIN friends f ON f.frind_id = u.user_id
WHERE f.user_id = ${user_id}
ORDER BY p.post_id DESC
LIMIT 5
OFFSET ${offset};
