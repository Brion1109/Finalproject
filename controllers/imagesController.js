const Image = require("../models/image");
exports.getAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).render("herbs",{
        status:'success',
        results: images.length,
        data: {images}
        });
        } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
exports.getImage = async (req, res) => {
Image.findById(req.params.id).exec(function(err, foundImage){
        if(err){
            console.log(err);
        } else {
            console.log(foundImage)
            //render show template with that campground
            res.render("herbs", {image: foundImage});
        }
});
};
exports.createImages = async (req, res) => {
    try {
        const newImage = await Image.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {image: newImage }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });

    }
};
exports.updateImage = async (req, res) => {
    try {
        const imageId = parseInt(req.params.id);
        const image = await Image.findOneAndUpdate({ id: imageId }, req.body, {
            new: true,
            runValidators: true
        });
        if (image) {
            res.status(200).json({
                status: 'success',
                data: { image }
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
exports.deleteImage = async (req, res) => {
    try {
        const imagesId = parseInt(req.params.id);
        const image = await Image.findOneAndDelete({ id: parseInt(imagesId) });
        if (image) {
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