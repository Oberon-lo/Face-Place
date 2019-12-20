module.exports = {
  getCom: async (req, res) => {
    const db = req.app.get('db');
    const { post_id } = req.params;
    try {
      const comNumber = await db.comment.get_com_count([post_id]);
      const comments = await db.comment.get_all_com([post_id]);
      res.status(200).send({ comNumber, comments })
    } catch (err) {
      return res.send(err);
    }
  },
  getComImg: async (req, res) => {
    const db = req.app.get('db');
    const { com_id } = req.params;
    try {
      const imageArr = await db.comment.get_com_img([com_id]);
      res.status(200).send(imageArr);
    } catch (err) {
      return res.send(err);
    };
  },
  makeCom: async (req, res) => {
    const db = req.app.get('db');
    const { post_id } = req.params;
    const { com_cont, imgArr, user_id } = req.body;
    try {
      const com_id = db.comment.make_com([post_id, com_cont, user_id]);
      if (imgArr !== []) {
        imgArr.forEach((img, i) => {
          await db.comment.add_com_img([com_id, img]);
          if (i === imgArr.length - 1) {
            res.status(201).send({ message: 'comment created' });
          };
        });
      } else {
        res.status(201).send({ message: 'comment created' });
      };
    } catch (err) {
      res.send(err);
    };
  },
  editCom: async (req, res) => {
    const db = req.app.get('db');
    const { com_id } = req.params;
    const { com_cont } = req.body;
    try {
      await db.comment.edit_com_cont([com_id, com_cont]);
      res.status(200).send({ message: 'updated' });
    } catch (err) {
      res.send(err);
    };
  },
  deleteCom: async (req, res) => {
    const db = req.app.get('db');
    const { com_id } = req.params;
    try {
      await db.comment.delete_com_img([com_id]);
      await db.comment.delete_com([com_id]);
      res.status(200).send({ message: 'deleted' });
    } catch (err) {
      res.send(err);
    };
  }
};
