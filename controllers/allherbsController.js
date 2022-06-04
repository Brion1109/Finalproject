const Herb = require("../models/herbsModel");
exports.getAllHerbs = async (req, res) => {
    try {
        const herbs = await Herb.find();
        res.status(200).render("allherbs/allherbs",{
        status:'success',
        results: herbs.length,
        data: {herbs}
        });
        } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
exports.getHerb = async (req, res) => {
Herb.findById(req.params.id).exec(function(err, foundHerb){
        if(err){
            console.log(err);
        } else {
            console.log(foundHerb)
            //render show template with that campground
            res.render("allherbs/show", {herb: foundHerb});
        }
});
};
exports.createHerbs = async (req, res) => {
    try {
        const newHerb = await Herb.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { herb: newHerb }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });

    }
};
exports.updateHerb = async (req, res) => {
    try {
        const herbId = parseInt(req.params.id);
        const herb = await Herb.findOneAndUpdate({ id: herbId }, req.body, {
            new: true,
            runValidators: true
        });
        if (herb) {
            res.status(200).json({
                status: 'success',
                data: { herb }
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
exports.deleteHerb = async (req, res) => {
    try {
        const herbsId = parseInt(req.params.id);
        const herb = await Herb.findOneAndDelete({ id: parseInt(herbsId) });
        if (herb) {
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