const express = require('express');
const router = express.Router();
const toursController = require('../controller/tours.controller');




// middleware that is specific to this router

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.route('/top-5-cheap').get(toursController.aliasTopTours, toursController.getAllTours);

router.route('/tour-stats').get(toursController.getTourStats);
router.route('/monthly-plan/:year').get(toursController.getMonthlyPlan);

// define the home page route
router.get('/', toursController.getAllTours);
// define the about route
router.post('/', toursController.createTour);

router.get('/:id', toursController.getByTourId);
router.patch('/:id', toursController.editTour);
router.delete('/:id', toursController.deleteTour);

router.get('/main/dump', toursController.dumpData);
router.get('/main/drop', toursController.dropCollection);


module.exports = router