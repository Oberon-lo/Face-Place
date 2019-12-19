insert into users (first_name, last_name, prof_pic)
values
(${first_name}, ${last_name}, 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.pixabay.com%2Fphoto%2F2015%2F10%2F05%2F22%2F37%2Fblank-profile-picture-973460_960_720.png&f=1&nofb=1') 
returning *;