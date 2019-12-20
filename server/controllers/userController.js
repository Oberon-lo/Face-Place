module.exports = {
  prof_pic: (req, res) => {
    const db = req.app.get("db");
    const { prof_pic } = req.body;
    const { user_id } = +req.params.id;

    db.userEdit
      .profile_pic({ prof_pic, user_id })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },
  userName: (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name } = req.body;
    const { user_id } = +req.params.id;

    db.userEdit
      .name({ first_name, last_name, user_id })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },
  bio: (req, res) => {
    const db = req.app.get("db");
    const { bio } = req.body;
    const { user_id } = +req.params.id;

    db.userEdit
      .bio({ bio, user_id })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },
  coverPic: (req, res) => {
    const db = req.app.get("db");
    const { cover_pic } = req.body;
    const { user_id } = +req.params.id;

    db.userEdit
      .cover_pic({ cover_pic, user_id })
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },
  
};
