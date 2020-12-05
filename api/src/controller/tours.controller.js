const fs = require('fs');
const Tour = require('../helpers/tours.helper');

exports.aliasTopTours = (req, res, next) => {
    req.query.limit = '5';
    req.query.sort = 'name,price,raingsAvegae,summary,difficulty';
    next();
}



exports.dumpData = async (req, res) => {
    console.log(tours)
    try {
        await Tour.create(tours);
        res.send('success')
    } catch(err) {
        res.send(err);
    }
}

exports.dropCollection = async (req, res) => {
    try {
        await Tour.remove({});
        res.send('success')
    } catch (err) {
        res.send('error', err);
    }
}


exports.getAllTours = async (req, res) => {
    console.log(req.query);    
    try {

        //
        const queryObj = { ...req.query };
        const excludedFields = ['page', 'sort', 'limit', 'fields'];
        excludedFields.forEach(field => {
            delete queryObj[field];
        });

        // Advance filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
        let query = Tour.find(JSON.parse(queryStr));

        // sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        // fields
        if(req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            console.log('--------', fields);
            query = query.select(fields);
        } else {
            // query = query.select('-__v');
        }

        // pagination
        const page = req.query.page * 1 || 1;
        const limit = req.query.limit * 1 || 10;
        const skip = (page - 1) * limit;

        if (req.query.page) {
            const numOfTours = await Tour.countDocuments();
            if(skip >= numOfTours) {
                throw new Error('This page does not exists');
            }
        }

        query = query.skip(skip).limit(limit);

        const tours = await query;
        res.status(200).json({
            status: 'success',
            results: tours.length,
            requestedAt: req.requestTime,
            data: {
                tours
            }
        });
    } catch(err) {
        console.log(err.message)
        res.status(400).json({
            status: 'error',
            requestedAt: req.requestTime,
            data: {
                err: err.message
            }
        });
    }
};

exports.getByTourId = (req, res) => {
    Tour.findById(req.params.id)
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
        const testTour = new Tour({...req.body});
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
    Tour.updateOne({_id: req.params.id}, {...req.body})
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
    Tour.deleteOne({_id: req.params.id})
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

exports.getTourStats = async (req, res) => {
    try {
        const stats = await Tour.aggregate([
            {
                $match: {ratingsAverage: {$gte: 1}}
            },
            {
                $group: {
                    _id: {$toUpper: '$difficulty'},
                    averageRating: { $avg: '$ratingsAverage' },
                    numRating: { $sum: '$ratingsQuantity' },
                    numTours: { $sum: 1 },
                    averagePrice: { $avg: '$price' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            {
                $sort: {
                    averagePrice: -1
                }
            },
            {
                $match: { _id: { $ne: 'EASY' } }
            }
        ]);

        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                stats
            }
        });

    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.getMonthlyPlan = async (req, res) => {
    try {
        const year = req.params.year * 1;

        const plan = await Tour.aggregate([
            {
                $unwind: '$startDates'
            },
            {
                $match: {
                    startDates: {
                        $gte: new Date(`${year}-01-01`),
                        $lte: new Date(`${year}-12-31`),
                    }
                }
            },
            {
                $group: {
                    _id: { $month: '$startDates' },
                    numToursStarts: { $sum: 1 },
                    tours: { $push: '$name' },
                }
            },
            {
                $addFields: { month: '$_id' }
            },
            {
                $project: { 
                    _id: 0
                }
            },
            {
                $sort: {numToursStarts: -1 }
            },
            {
                $limit: 12
            }
        ]);
        
        res.status(200).json({
            status: 'success',
            requestedAt: req.requestTime,
            data: {
                plan
            }
        });

    } catch(err) {
        res.status(404).json({
            status: 'fail',
            message: err.message
        })
    }
}