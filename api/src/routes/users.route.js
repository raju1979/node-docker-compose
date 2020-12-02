const express = require('express');
const router = express.Router();
const userController = require('../controller/users.controller');
const fs = require('fs');



// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.param('id', userController.checkId);

// router.use(userController.checkBody);

// define the home page route
router.get('/', userController.getAllUsers);
// define the about route
router.post('/', userController.addUser);

router.get('/:id', userController.getUser);
router.patch('/:id', userController.checkBody, userController.updateUser);
router.delete('/:id', userController.deleteUser);



module.exports = router