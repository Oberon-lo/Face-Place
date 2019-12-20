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

  },
  editCom: async (req, res) => {
    const db = req.app.get('db');

  },
  deleteComImg: async (req, res) => {
    const db = req.app.get('db');

  },
  deleteCom: async (req, res) => {
    const db = req.app.get('db');

  },
};
