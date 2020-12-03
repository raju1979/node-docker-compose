const fs = require('fs');
const tour = require('../helpers/tours.helper');

exports.getAllTours = (req, res) => {
    

    tour.find({})
        .then(data => {
            res.status(200).json({
                status: 'success',
                results: data.length,
                requestedAt: req.requestTime,
                data: {
                    data
                }
            });
        }).catch(err => {
            res.status(400).json({
                status: 'error',
                requestedAt: req.requestTime,
                data: {
                    err: err
                }
            });
        })
    
};

exports.getByTourId = (req, res) => {
    tour.findById(req.params.id)
        .then(data => {
            res.status(200).json({
                status: 'success',
                requestedAt: req.requestTime,
                data: {
                    data
                }
            });
        }).catch(err => {
            res.status(400).json({
                status: 'error',
                requestedAt: req.requestTime,
                data: {
                    err: err
                }
            });
        });    
}

exports.createTour = async (req, res) => {
    try {
        const testTour = new tour({...req.body});
        const newTour = await testTour.save();
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                newTour
            }
        });
    } catch(err) {
        const text = err;
        console.log('inside errrr', text)

        res.status(400).send(text);
    }
}

exports.editTour = (req, res) => {
    tour.updateOne({_id: req.params.id}, {...req.body})
        .then(data => {
            res.status(200).json({
                status: 'success',
                requestedAt: req.requestTime,
                data: {
                    data
                }
            });
        }).catch(err => {
            res.status(400).json({
                status: 'error',
                requestedAt: req.requestTime,
                data: {
                    err: err
                }
            });
        });
}

exports.deleteTour = (req, res) => {
    tour.deleteOne({_id: req.params.id})
        .then(data => {
            res.status(204).json({
                status: 'success',
                requestedAt: req.requestTime
            });
        }).catch(err => {
            res.status(400).json({
                status: 'error',
                requestedAt: req.requestTime,
                data: {
                    err: err
                }
            });
        });   
}