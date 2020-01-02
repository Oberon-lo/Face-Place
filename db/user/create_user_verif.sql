insert into user_verif (email, email_verif, is_admin, user_id)
values
(${email}, true, false, ${user_id})