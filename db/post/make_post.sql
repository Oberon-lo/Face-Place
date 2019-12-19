INSERT INTO posts (user_id, post_cont)
VALUES ($user_id, ${post_cont})
RETURNING post_id;