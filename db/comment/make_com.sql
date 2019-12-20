INSERT INTO comments (post_id, com_cont)
VALUES ($1, $2)
RETURNING post_id;