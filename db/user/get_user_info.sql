select * from users u
join user_verif v on v.user_id = u.user_id
join user_info i on i.user_id = u.user_id
where u.user_id = ($1);
