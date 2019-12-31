SELECT * FROM comments c
JOIN users u ON u.user_id = c.user_id
WHERE c.post_id = $1;