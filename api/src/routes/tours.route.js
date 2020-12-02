const express = require('express');
const router = express.Router();
const toursController = require('../controller/tours.controller');
const fs = require('fs');



// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})
// define the home page route
router.get('/', toursController.getAllTours);
// define the about route
router.post('/', toursController.createTour);

router.get('/:id', toursController.getByTourId);
router.patch('/:id', toursController.editTour);
router.delete('/:id', toursController.deleteTour);

module.exports = router