module.exports = {
  getAll: async (req, res) => {
    const db = req.app.get('db');
    const { offset } = req.body;
    const {user_id} = req.params;
    try {
      const fivePost = await db.post.get_posts({ offset, user_id });
      res.status(200).send(fivePost);
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  getUserPosts: async (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;
    try {
      const fivePosts = await db.post.get_user_posts([user_id]);
      res.status(200).send(fivePosts);
    } catch (err) {
      return res.send(err);
    };
  },
  getPostImg: async (req, res) => {
    const db = req.app.get('db');
    const { post_id } = req.params;
    try {
      const imageArr = await db.post.get_post_img_post_id([post_id]);
      res.status(200).send(imageArr);
    } catch (err) {
      console.log(err)
      return res.send(err);
    };
  },
  makePost: async (req, res) => {
    const db = req.app.get('db');
    const { user_id, post_cont, post_img } = req.body;
    try {
      const post_id = await db.post.make_post({ user_id, post_cont });
      if (post_img.length !== 0) {
        post_img.forEach(async (img, i) => {
          try {
            await db.post.make_image_post([post_id[0].post_id, img]);
            if (i === post_img.length - 1) {
              return res.status(201).send({ message: 'post created' });
            }
          } catch (err) {
            return res.send(err);
          }
        });
      } else if (post_img.length === 0) {
        return res.status(201).send({ message: 'post created' });
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  editPost: async (req, res) => {
    const db = req.app.get('db');
    const { post_id } = req.params;
    const { post_cont } = req.body;
    try {
      await db.post.edit_post_cont([post_id, post_cont]);
      return res.status(200).send({ message: 'post edited' });
    } catch (err) {
      return res.send(err);
    };
  },
  addPostImg: async (req, res) => {
    const db = req.app.get('db');
    const { post_id } = req.params;
    const { post_img } = req.body;
    try {
      await db.post.add_post_img([post_id, post_img]);
      res.status(201).send({ message: 'image added' });
    } catch (err) {
      res.send(err);
    };
  },
  deletePostImg: async (req, res) => {
    const db = req.app.get('db');
    const { post_img_id } = req.params;
    try {
      await db.post.delete_post_img_img_id([post_img_id]);
      res.status(200).send({ message: 'image deleted' });
    } catch (err) {
      console.log(err);
      res.send(err);
    };
  },
  deletePost: async (req, res) => {
    const db = req.app.get('db');
    const { post_id } = req.params;
    try {
      const comArr = await db.post.get_post_coms([post_id]);
      console.log(comArr);
      if (comArr.length !== 0) {
        comArr.forEach(async (comment, i) => {
          await db.comment.delete_com_img([comment.com_id]);
          await db.comment.delete_com([comment.com_id]);
          if (i === comArr.length - 1) {
            await db.post.delete_post_img_post_id([post_id]);
            await db.post.delete_post([post_id]);
            res.status(200).send({ message: 'post Deleted' });
          };
        });
      } else if(comArr.length === 0) {
        await db.post.delete_post_img_post_id([post_id]);
        await db.post.delete_post([post_id]);
        res.status(200).send({ message: 'post Deleted' });
      };
    } catch (err) {
      console.log(err);
      return res.send(err);
    };
  }
};