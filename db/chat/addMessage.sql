INSERT INTO chat_message (chat_cont, post_time, user_id, chat_id)
VALUES (
    ${chat_cont}, 
    NOW(),
    ${user_id},
    ${current_chat_id}
);