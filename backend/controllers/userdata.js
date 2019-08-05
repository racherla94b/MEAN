const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
  .then((hash) => {
    const user = new User({
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: hash,
      role: req.body.role
    });
    user.save()
      .then((newUser) => {
        res.status(201).json({
          message: "User registration successful",
          user: newUser
        });
      })
      .catch(err => {
        console.log(err);
        if(err.name === "ValidationError") {
          return res.status(400).json({
            message: "Email Id already exists!"
          })
        }
        res.status(500).json({
          message: "Sign up Failed. Please try later!"
        });
    });
  });
}

exports.userLogin = (req, res, next) => {
  let userFound;
  User.findOne({email: req.body.email})
    .then((foundUser) => {
      if(!foundUser) {
        return res.status(404).json({
          message: "Cannot find User"
        });
      }
      userFound = foundUser;
      return bcrypt.compare(req.body.password, foundUser.password)
    })
    .then((result) => {
      if(!result) {
        return res.status(401).json({
          message: "Authentication Failed. Your email & password do not match"
        });
      }

      let userName = userFound.fname + ' ' + userFound.lname;
      const token = jwt.sign(
        { userId: userFound._id, username: userName },
        'this-is-the-password-for-the-hashing-of-the-token',
        { expiresIn: '3h'}
      );
      res.status(200).json({
        message: "Login successful",
        token: token,
        expiresIn: 10800,
        username: userName,
        userId: userFound._id
      });
    })
    .catch((err) => {
      return res.status(400).json({
        message: "Authorization Failed. Server down. Please try after some time"
    });
  });
}
