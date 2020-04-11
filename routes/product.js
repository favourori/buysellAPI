const router = require("express").Router();
const Category = require("../model/category");
const Product = require("../model/product");
const fs = require("fs");
const path = require("path");

router.post(
    "/create",
    (() => {
        const multer = require("multer");

        const upload = multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, "public/products/images");
                },
                filename: (req, file, cb) => {
                    const fileNameArray = file.originalname.split(".");
                    console.log(file);
                    const filename =
                        Date.now() +
                        "." +
                        fileNameArray[fileNameArray.length - 1];
                    cb(null, filename);
                },
            }),
        });

        return [
            upload.array("photos"),
            async (req, res) => {
                try {
                    const photos = [];

                    for (const file of req.files) {
                        photos.push(file.path.replace("public", ""));
                    }
                    const category = await Category.findOne({
                        _id: req.body.category,
                    });

                    console.log(category);
                    if (category === null) {
                        photos.forEach((photo) => {
                            const fullPhotoPath = path.join(
                                __dirname,
                                "/../public/",
                                `${photo}`
                            );
                            fs.unlink(fullPhotoPath, (err) => {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        });

                        return res.status(400).json({
                            success: false,
                            message: "Category does not exist",
                        });
                    }

                    const product = await Product.create({
                        ...req.body,
                        photos,
                    });
                    return res.status(200).json({
                        success: true,
                        data: product,
                        message: "Product created successfully",
                    });
                } catch (err) {
                    return res.status(400).json({
                        success: false,
                        message: err.toString(),
                    });
                }
            },
        ];
    })()
);

router.post("/update", async (req, res) => {
    try {
        const { photos, ...rest } = req.body;
        const product = await Product.findOneAndUpdate(
            { _id: req.body.id },
            { ...rest },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            data: product,
            message: "Product updated successfully",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.toString(),
        });
    }
});

router.post("/get", async (req, res) => {
    try {
        const product = await Product.find({ _id: req.body.id }).populate(
            "user"
        );
        return res.status(200).json({
            success: true,
            data: product,
            message: "Product retrieved successfully",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.toString(),
        });
    }
});

router.get("/all", async (req, res) => {
    try {
        const products = await Product.find().populate("user");
        return res.status(200).json({
            success: true,
            data: products,
            message: "All products fetched",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: err.toString(),
        });
    }
});

router.post("/delete", async (req, res) => {
    try {
        console.log(await Product.find());
        const product = await Product.findOne({ _id: req.body.id });
        console.log(product, req.body);

        const imagePath = path.join(__dirname, "/../public/");
        product.photos.forEach((photo) => {
            fs.unlink(
                path.join(imagePath, photo.replace(req.hostname, "")),
                (err) => {
                    if (err) {
                        console.log(err);
                    }
                }
            );
        });

        await product.remove();
        return res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json({
            success: false,
            message: err.toString(),
        });
    }
});

module.exports = router;
