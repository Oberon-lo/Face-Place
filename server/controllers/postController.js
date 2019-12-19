module.exports = {
  getAll: async (req, res) => {
    const db = req.app.get('db');
    const { offset, user_id } = req.body;
    const fivePost = await db.post.get_posts({ offset, user_id });
    res.status(200).send(fivePost);
  },
  getUserPosts: async (req, res) => {
    const db = req.app.get('db');
    const { user_id } = req.params;
    const fivePosts = db.post.get_user_posts([user_id]);
    res.status(200).send(fivePosts);
  },
  getPostImg: async (req, res) => {
    const db = req.app.get('db');
    const { post_id } = req.params;
    const imageArr = await db.post.get_post_img([post_id]);
    res.status(200).send(imageArr);
  },
  makePost: async (req, res) => {
    const db = req.app.get('db');
    const { user_id, post_cont, post_img } = req.body;
    try {
      const post_id = await db.post.make_post({ user_id, post_cont });
      if (post_img !== []) {
        post_img.forEach(img, i => {
          await db.post.make_image_post([post_id, img]);
          if (i + 1 === post_img.length) {
            return res.status(201).send({ message: 'post created' });
          }
        });
      } else {
        return res.status(201).send({ message: 'post created' });
      }
    } catch (err) {
      return res.status(400).send(err);
    }
  },
  editPost: async (req, res) => {
    const db = req.app.get('db');
    
  },
  deletePost: async (req, res) => {
    const db = req.app.get('db');

  }
}