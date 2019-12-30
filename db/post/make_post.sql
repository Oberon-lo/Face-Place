INSERT INTO posts (user_id, postcont)
VALUES (${user_id}, ${post_cont})
RETURNING post_id;