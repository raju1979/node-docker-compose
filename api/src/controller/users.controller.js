
const fs = require('fs');

exports.getAllUsers = (req, res) => {
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data: {
            users
        }
    });
};

exports.checkId = (req, res, next, val) => {
    if(req.params.id * 1 > users.length) {
        console.log('invalid id')
        return res.status(404).json({
            status: 'fail',
            message: 'Invalid ID'
        })
    }
    console.log(`Tour id is ${val}`);
    next();
}

exports.checkBody = (req, res, next) => {
    console.log('Checking body', req.body);
    const payload = req.body;
    if (Object.keys(payload).length === 0) {
        return res.status(422).json({
            status: 'error',
            message: 'Invalid arguments in payload'
        });
    } else {
        console.log('111111111111', payload);
        next();

    }
}

exports.getUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route not defined yet'
    });
};

exports.addUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route not defined yet'
    });
};

exports.updateUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route not defined yet'
    });
};

exports.deleteUser = (req, res) => {
    res.status(500).json({
        status: 'error',
        message: 'Route not defined yet'
    });
};