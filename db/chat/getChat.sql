SELECT DISTINCT c.chat_id FROM chat c
JOIN user_chat uc ON uc.chat_id = c.chat_id
WHERE uc.user_id = $1
OR uc.user_id = $2;