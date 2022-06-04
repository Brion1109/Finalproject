const Diet = require("../models/dietModel");
exports.getAllDiets = async (req, res) => {
    try {
        const diets = await Diet.find();
        res.status(200).render("alldiet/alldiet",{
        status:'success',
        results: diets.length,
        data: {diets}
        });
        } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
exports.getDiet = async (req, res) => {
Diet.findById(req.params.id).exec(function(err, foundDiet){
        if(err){
            console.log(err);
        } else {
            console.log(foundDiet)
            //render show template with that campground
            res.render("alldiet/dietshow", {diet: foundDiet});
        }
});
};
exports.createDiets = async (req, res) => {
    try {
        const newDiet = await Diet.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { diet: newDiet }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });

    }
};
exports.updateDiet = async (req, res) => {
    try {
        const dietId = parseInt(req.params.id);
        const diet = await Diet.findOneAndUpdate({ id: dietId }, req.body, {
            new: true,
            runValidators: true
        });
        if (diet) {
            res.status(200).json({
                status: 'success',
                data: { diet }
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
exports.deleteDiet = async (req, res) => {
    try {
        const dietsId = parseInt(req.params.id);
        const diet = await Diet.findOneAndDelete({ id: parseInt(dietsId) });
        if (diet) {
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