INSERT INTO comments (post_id, com_cont, user_id, post_time)
VALUES ($1, $2, $3, NOW())
RETURNING com_id;