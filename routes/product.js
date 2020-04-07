const router = require("express").Router();
const Product = require("../model/product");

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
                        Date.now() + "." + fileNameArray[fileNameArray.length - 1];
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
                        photos.push(
                            ((req.hostname !== "localhost" && req.host) || "") +
                            "/" +
                            file.path.replace("/public", "")
                        );
                    }

                    const product = await Product.create({ ...req.body, photos });
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
        const product = await Product.findOne({ _id: req.body.id });
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
        const products = await Product.find();
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

module.exports = router;
