const express = require('express');
const Users = require('./userDb');
const Posts = require('../posts/postDb');

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  Users.insert(req.body)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(err => {
      console.log("Insert user error: ", err);
      res.status(500).json({ success: false, message: "exception", err })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const newPost = {
    text: req.body.text,
    user_id: req.id
  }
  
  Posts.insert(newPost)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      console.log("Insert post error: ", err);
      res.status(500).json({ success: false, message: "exception", err })
    })

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

router.get('/:id/posts', validateUserId, (req, res) => {
  const { id } = req.params
  Users.getUserPosts(id)
    .then(posts => {
      if (posts.length > 0) {
        res.status(200).json(posts)
      } else {
        res.status(200).json(`${req.user.name} has not added any posts!`)
      }
    })
    .catch(err => {
      console.log("Users.getUserPosts error: ", err);
      res.status(500).json({ success: false, message: "exception", err })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;
  Users.remove(id)
    .then(remove => {
      const message = `Removed ${req.user.name} from the database`;
      res.status(200).json({ remove, message })
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
};

//Middleware to validate user body on every request that requires user body parameter
function validateUser(req, res, next) {
  if (!req.body) {
    res.status(400).json({ success: false, message: "missing user data" })
  } else if (!req.body.name) {
    res.status(400).json({ success: false, message: "missing required name field" })
  } else {
    next();
  }
};

//Middleware to validate post body on every request that requires post body parameter
function validatePost(req, res, next) {
  if (!req.body) {
    res.status(400).json({ success: false, message: "missing post data" })
  } else if (!req.body.text) {
    res.status(400).json({ success: false, message: "missing required text field" })
  } else {
    next();
  }
}


module.exports = router;