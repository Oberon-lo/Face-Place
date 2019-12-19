SELECT * FROM posts p
JOIN users u
WHERE p.user_id = $1
ORDER BY p.post_id DESC;