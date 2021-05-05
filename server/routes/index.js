const express = require('express');
const router = express.Router();
const users = require('../model/users');

router.post('/login', (req, res) => {
  if (email && password) {
    const user = users.find(
      (el) => el.email === email && el.password === password
    );
    if (user) {
      req.session.userId = user.id;
      res.status(200).json({ id: user.id, name: user.name });
    } else res.status(401).send('Wrong email or password');
  } else res.status(400).send('Login failed');
});

router.get(
  '/logout',
  /*redirectLogin,*/ (req, res) => {
    // enter your code here
    req.session.destroy();
    res.clearCookie(process.env.SESSION_NAME);
  }
);

router.post('/register', (req, res) => {
  // enter your code here
  let email = req.body.email;
  let password = req.body.password;
  let name = req.body.name;

  if (name != '' && password != '' && email != '') {
    if (users.find((el) => el.email == email)) {
      res.status(409).send('Email already registered');
    } else {
      let erhöhen = 0;
      for (let i of users) {
        if (i.id > erhöhen) {
          erhöhen = i.id;
        }
      }
      let newID = erhöhen + 1;

      users.push({ id: newID, name: name, email: email, password: password });
      res.status(200).send('user created');
    }
  } else {
    res.status(400).send('Registration failed');
  }
  console.log(users);
});

router.get('/secretdata', (req, res) => {
  // enter your code here
});

module.exports = router;
