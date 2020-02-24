module.exports = {
  updateUser: (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name, bio, cover_pic, prof_pic } = req.body;
    const user_id = +req.params.id;

    db.userEdit
      .profile_pic({ prof_pic, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("4");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });

    db.userEdit
      .name({ first_name, last_name, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("1");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });

    db.userEdit
      .cover_pic({ cover_pic, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("3");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });

    db.userEdit
      .bio({ bio, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("2");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },

  updateUser2: (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name, bio, prof_pic } = req.body;
    const user_id = +req.params.id;

    db.userEdit
      .profile_pic({ prof_pic, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("4");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });

    db.userEdit
      .name({ first_name, last_name, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("1");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });

    db.userEdit
      .bio({ bio, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("2");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },

  updateUser3: (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name, bio, cover_pic } = req.body;
    const user_id = +req.params.id;

    db.userEdit
      .name({ first_name, last_name, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("1");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });

    db.userEdit
      .cover_pic({ cover_pic, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("3");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });

    db.userEdit
      .bio({ bio, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("2");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },

  updateUser4: (req, res) => {
    const db = req.app.get("db");
    const { first_name, last_name, bio } = req.body;
    const user_id = +req.params.id;

    db.userEdit
      .name({ first_name, last_name, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("1");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });

    db.userEdit
      .bio({ bio, user_id })
      .then(result => {
        res.status(200).send(result);
        console.log("2");
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },

  getUserInfo(req, res) {
    const db = req.app.get("db");
    const user_id = +req.params.id;
    db.user
      .get_all_from_user(user_id)
      .then(result => {
        res.status(200).send(result);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong.", err });
        console.log(err);
      });
  },

  getUserFriends: async (req, res) => {
    const db = req.app.get('db');
    const user_id = +req.params.id;
    db.user
      .get_user_friends([user_id])
      .then(response => {
        res.status(200).send(response);
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "could not get friends", err})
        console.log(err);
      })
  },

  getUserSession(req, res) {
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
