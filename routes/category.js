const router = require('express').Router();
const Category = require('../model/category');

router.post('/create', async (req, res) => {
    try {
        const category = await Category.create({...req.body});
        return res.status(200)
            .json({
                success: true,
                data: category,
                message: 'Category created successfully'
            });
    } catch (err) {
        return res.status(400).json({success: false, message: err.toString()});
    }
});

router.post('/delete', async (req, res) => {
    try {
        await Category.deleteOne({_id: req.body.id});
        return res.status(200)
            .json({
                success: true,
                message: 'Category deleted successfully'
            });
    } catch (err) {
        return res.status(400).json({success: false, message: err.toString()});
    }
});


router.get('/all', async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200)
            .json({
                success: true,
                data: categories,
                message: 'Categories retrieved successful'
            });
    } catch (err) {
        return res.status(400)
            .json({
                success: false,
                message: 'Could no retrieve categories'
            });
    }
});

router.post('/upload', (() => {
    const multer = require('multer');
    const upload = multer({dest: 'public/categories/images'});
    return [
        upload.single('image'),
        async (req, res) => {
            try {
                const category = await Category.findOneAndUpdate(
                    {_id: req.body.id,},
                    {image: (req.host !== 'localhost' && req.host || '') + '/' + req.file.path},
                    {new: true}
                );
                return res.status(200)
                    .json({
                        success: true,
                        data: category,
                        message: 'Category image uploaded successfully'
                    });
            } catch (err) {
                return res.status(400)
                    .json({
                        success: false,
                        message: 'image could not be uploaded successfully'
                    });
            }
        }
    ]

})());


module.exports = router;
