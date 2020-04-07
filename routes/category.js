const router = require('express').Router()
const Category = require('../model/category')
const path = require('path')

router.post('/create', async (req, res) => {
    try {
        const category = await Category.create({...req.body})
        return res.status(200)
            .json({
                success: true,
                data: category,
                message: 'Category created successfully'
            })
    } catch (err) {
        return res.status(400).json({success: false, message: err.toString()})
    }
})

router.post('/delete', async (req, res) => {
    try {
        await Category.delete({_id: req.body.id})
        return res.status(200)
            .json({
                success: true,
                message: 'Category deleted successfully'
            })
    } catch (err) {
        return res.status(400).json({success: false, message: err.toString()})
    }
})

router.post('/upload', (async () => {
    const multer = require('multer')
    const upload = multer({dest: path.join(__dirname, '/../public/categories/images')})
    return [
        upload.single('image'),
        async (req, res) => {
            try {
                const category = await Category.findOneAndUpdate({_id: req.body.id,}, {image: req.file.path}, {new: true})
                return res.status(200)
                    .json({
                        success: true,
                        data: category,
                        message: 'Category image uploaded successfully'
                    })
            } catch (err) {
                return res.status(400)
                    .json({
                        success: false,
                        message: 'image could not be uploaded successfully'
                    })
            }
        }
    ]

})())


module.exports = router
