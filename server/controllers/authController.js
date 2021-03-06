const bcrypt = require("bcryptjs");
module.exports = {
  register: async (req, res) => {
    const db = req.app.get("db");
    const { email, password, first_name, last_name } = req.body;

    const result = await db.auth.find_user(email).catch(err => {
      console.log(err, "find user");
    });
    if (result[0])
      return res.status(409).send({ message: "E-mail already in use." });

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const user = await db.user
      .add_user({ first_name, last_name })
      .catch(err => {
        res.status(500).send({ err, message: "something went wrong" });
        console.log(err);
      });
    const user_id = user[0].user_id;

    console.log(user_id);

    db.auth.add_hash({ hash, user_id }).catch(err => {
      res.status(500).send({ err, message: "something went wrong" });
    });
    db.user.create_user_info(user_id).catch(err => {
      res.status(500).send({ err, message: "something went wrong" });
    });
    db.user.create_user_verif({ email, user_id }).catch(err => {
      res.status(500).send({ err, message: "something went wrong" });
    });
    res.status(200).send({ message: "User Created" });
  },
  login: async (req, res) => {
    const db = req.app.get("db");
    const { email, password } = req.body;

    const check = await db.auth.check_hash(email);
    if (!check[0]) return res.status(404).send({ message: "User Not Found!" });

    const result = bcrypt.compareSync(password, check[0].hash);
    if (result === true) {
      const user = await db.auth.get_session_info(email);
      req.session.user = {
        id: user[0].user_id,
        firstName: user[0].first_name,
        lastName: user[0].last_name,
        profilePic: user[0].prof_pic,
        isVerified: user[0].email_verif,
        isAdmin: user[0].is_admin
      };
      return res
        .status(200)
        .send({
          message: `Welcome back ${req.session.user.firstName} ${req.session.user.lastName}!`
        });
    } else {
      res.status(404).send({ message: "Password incorrect" });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: "Logged out" });
  },
  emailVerif: (req,res) => {
    const db = req.app.get("db");
    const user_id = +req.params.id;

    db.auth
      .email_verif({ user_id })
      .then(result => {
        // console.log(user_id);
        res.status(200).send({result, message:'done' });
      })
      .catch(err => {
        res.status(500).send({ errorMessage: "Something went wrong." });
        console.log(err);
      });
  },
  usersOnly: (req, res, next) => {
    if (req.session.user.isVerified === true) {
      next();
    } else {
      res.status(401).send({ message: "Please login first." });
    }
  },
  specificUser: (req, res, next) => {
    if (req.params.id === req.session.user.id) {
      next();
    } else {
      console.log(res.session.user);
      
      res
        .status(401)
        .send({ message: "User should not be able to access this element."});
    }
  },
  adminsOnly: (req, res, next) => {
    if (!req.session.user.isAdmin) {
      return res.status(403).send("You are not an admin");
    }
    next();
  }
};