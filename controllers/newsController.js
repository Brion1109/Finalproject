const News= require("../models/newsModel");

exports.getAllNewss = async (req, res) => {
    try {
        const newss = await News.find();
        res.status(200).render("news",{
        status:'success',
        results: newss.length,
        data: {newss}
        });
        } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }
};
exports.getNews = async (req, res) => {
News.findById(req.params.id).exec(function(err, foundNews){
        if(err){
            console.log(err);
        } else {
            console.log(foundNews)
            //render show template with that campground
            res.render("News", {news: foundNews});
        }
});
};
exports.createNewss = async (req, res) => {
    try {
        const newNews = await News.create(req.body);
        res.status(201).json({
            status: 'success',
            data: { news: newNews }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        });

    }
};
exports.updateNews = async (req, res) => {
    try {
        const newsId = parseInt(req.params.id);
        const news = await News.findOneAndUpdate({ id: newsId }, req.body, {
            new: true,
            runValidators: true
        });
        if (news) {
            res.status(200).json({
                status: 'success',
                data: { news }
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
exports.deleteNews = async (req, res) => {
    try {
        const newssId = parseInt(req.params.id);
        const news = await News.findOneAndDelete({ id: parseInt(newssId) });
        if (news) {
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