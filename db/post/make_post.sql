INSERT INTO posts (user_id, postcont, post_time)
VALUES (${user_id}, ${post_cont}, NOW())
RETURNING post_id;