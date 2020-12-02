const fs = require('fs');

exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        results: tours.length,
        requestedAt: req.requestTime,
        data: {
            tours
        }
    });
};

exports.getByTourId = (req, res) => {
    console.log('idddddddddd', req.params.id);
    const tour = tours.find(item => item.id === +req.params.id);
    console.log('tour', tour)
    if(tour) {
        res.status(200).json({
            status: 'success',
            data: {
                tour
            }
        });
    } else {
        res.status(404).json({
            success: false
        })
    }
    
}

exports.createTour = (req, res) => {
    console.log(req.body);
    newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({
        id: newId
    }, req.body);

    console.log("--------------", newTour);

    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        if(err) console.log('errrrrrr', err);
        res.status(201).json({
            status: 'success',
            data: {
                tour: newTour
            }
        })
    });
}

exports.editTour = (req, res) => {
    console.log('idddddddddd', req.params);
    const newItem = req.body;
    console.log("7777777777", newItem)
    let index;
    const tour = tours.find((item, i) => {
        console.log(i)
        index = i;
        return item.id === +req.params.id;
    });
    console.log('tour', tour)
    if(tour) {
        patchedTour = {...tour, ...newItem}
        tours[index] = patchedTour
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
            if(err) console.log('errrrrrr', err);
            res.status(200).json({
                status: 'success',
                data: {
                    tour: patchedTour
                }
            })
        })
    } else {
        res.status(404).json({
            success: false
        })
    }    
}

exports.deleteTour = (req, res) => {
    const tour = tours.find((item, i) => {
        return item.id === +req.params.id;
    });
    console.log("ddddddddddddd", tour);
    if(tour) {
        const tempTours = tours.filter(item => item.id !== +req.params.id);
        fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tempTours), err => {
            if(!err) {
                res.send(204);
            }
        })
    } else {
        res.status(404).json({
            success: false
        })
    }    
}