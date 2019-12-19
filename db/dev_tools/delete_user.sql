delete from user_hash h
using users u 
where u.user_id = h.user_id and u.user_id = 7;

delete from user_verif v
using users u 
where u.user_id = v.user_id and u.user_id = 7;

delete from user_info i
using users u 
where u.user_id = i.user_id and u.user_id = 7;

delete from users where user_id = 7;