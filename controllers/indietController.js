const Indiet = require("../models/indiet");
exports.getAllIndiets = async (req, res) => {
    try {
        const indiets = await Indiet.find();
        res.status(200).render("diet",{
        status:'success',
        results: indiets.length,
        data: {indiets}
        });
        } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
exports.getIndiet = async (req, res) => {
Indiet.findById(req.params.id).exec(function(err, foundIndiet){
        if(err){
            console.log(err);
        } else {
            console.log(foundIndiet)
            //render show template with that campground
            res.render("diet", {indiet: foundIndiet});
        }
});
};
exports.createIndiets = async (req, res) => {
    try {
        const newIndiet = await Indiet.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {indiet: newIndiet }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });

    }
};
exports.updateIndiet = async (req, res) => {
    try {
        const indietId = parseInt(req.params.id);
        const indiet = await Indiet.findOneAndUpdate({ id: indietId }, req.body, {
            new: true,
            runValidators: true
        });
        if (indiet) {
            res.status(200).json({
                status: 'success',
                data: { indiet }
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'no id found'
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
exports.deleteIndiet = async (req, res) => {
    try {
        const indietsId = parseInt(req.params.id);
        const indiet = await Indiet.findOneAndDelete({ id: parseInt(indietsId) });
        if (indiet) {
            res.status(200).json({
                status: 'success',
                data: null
            });
        } else {
            res.status(404).json({
                status: 'fail',
                message: 'no id found'
            });
        }
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });

    }
};