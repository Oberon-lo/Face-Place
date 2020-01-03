INSERT INTO chat (title)
VALUES (
    ${title}
)
RETURNING chat_id;