const Beauty = require("../models/hbs");
exports.getAllBeautys = async (req, res) => {
    try {
        const beautys = await Beauty.find();
        res.status(200).render("healtbeuty",{
        status:'success',
        results: beautys.length,
        data: {beautys}
        });
        } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
exports.getBeauty = async (req, res) => {
Beauty.findById(req.params.id).exec(function(err, foundBeauty){
        if(err){
            console.log(err);
        } else {
            console.log(foundBeauty)
            //render show template with that campground
            res.render("healtbeuty", {beauty: foundBeauty});
        }
});
};
exports.createBeautys = async (req, res) => {
    try {
        const newBeauty = await Beauty.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {beauty: newBeauty }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });

    }
};
exports.updateBeauty = async (req, res) => {
    try {
        const beautyId = parseInt(req.params.id);
        const beauty = await Beauty.findOneAndUpdate({ id: beautyId }, req.body, {
            new: true,
            runValidators: true
        });
        if (beauty) {
            res.status(200).json({
                status: 'success',
                data: { beauty }
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
exports.deleteBeauty = async (req, res) => {
    try {
        const beautysId = parseInt(req.params.id);
        const beauty = await Beauty.findOneAndDelete({ id: parseInt(beautysId) });
        if (beauty) {
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