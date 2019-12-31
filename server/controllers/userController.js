module.exports = {
  prof_pic: (req, res) => {
    const db = req.app.get("db");
    const { prof_pic } = req.body;
    const user_id = +req.params.id;

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
    const user_id = +req.params.id;
    const { first_name, last_name } = req.body;

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
    const user_id = +req.params.id;

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
    const user_id = +req.params.id;

    db.userEdit
      .cover_pic({ cover_pic, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("hit");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },
  getUserInfo(req, res) {
    if (req.session.user) {
      return res.status(200).send(req.session.user);
    } else {
      return res.status(412).send({ message: "please login first" });
    }
  },
  getAllUsers(req, res) {
    const db = req.app.get("db");
    db.user
      .get_all_users()
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res
          .status(500)
          .send({ errorMessage: "we done goofed, try again later" });
        console.log(err);
      });
  }
};
