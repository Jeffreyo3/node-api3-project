const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', (req, res) => {
  // do your magic!
});

router.post('/:id/posts', (req, res) => {
  // do your magic!
});

router.get('/', (req, res) => {
  Users.get()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log("get users error: ", err);
      res.status(500).json({ success: false, message: "exception", err })
    })
});

router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log("Users.getById error: ", err);
      res.status(500).json({ success: false, message: "exception", err })
    })
});

router.get('/:id/posts', (req, res) => {
  // do your magic!
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  const {id} = req.params;
  Users.remove(id)
    .then(remove => {
      const message = `Removed ${req.user.name} from the database`;
      res.status(200).json({remove, message})
    })
    .catch(err => {
      console.log("Users.remove by id error: ", err);
      res.status(500).json({ success: false, message: "exception", err })
    })
});

router.put('/:id', (req, res) => {
  // do your magic!
});

//custom middleware

//Middleware to validate user ID on every request that requires user ID parameter
function validateUserId(req, res, next) {
  const { id } = req.params;
  Users.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        req.id = id;
        next();
      } else {
        res.status(400).json({ success: false, message: "invalid user id" });
      }
    })
    .catch(err => {
      console.log("validateUserId error: ", err);
      res.status(500).json({ success: false, message: "exception", err });
    });
}

function validateUser(req, res, next) {
  // do your magic!
}

function validatePost(req, res, next) {
  // do your magic!
}


module.exports = router;