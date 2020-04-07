const router = require("express").Router();
const Category = require("../model/category");
const fs = require("fs");
const path = require("path");

router.post(
    "/create",
    (() => {
        const multer = require("multer");
        const upload = multer({
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, "public/categories/images");
                },
                filename: (req, file, cb) => {
                    const fileNameArray = file.originalname.split(".");
                    console.log(file);
                    const filename =
                        Date.now() +
                        "." +
                        fileNameArray[fileNameArray.length - 1];
                    console.log(filename);
                    cb(null, filename);
                },
            }),
        });
        return [
            upload.single("image"),
            async (req, res) => {
                try {
                    const category = await Category.create({
                        ...req.body,
                        image:
                            ((req.hostname !== "localhost" && req.host) || "") +
                            "/" +
                            req.file.path,
                    });
                    return res.status(200).json({
                        success: true,
                        data: category,
                        message: "Category image uploaded successfully",
                    });
                } catch (err) {
                    return res.status(400).json({
                        success: false,
                        message: "image could not be uploaded successfully",
                    });
                }
            },
        ];
    })()
);

router.post("/delete", async (req, res) => {
    try {
        const category = await Category.findOne({ _id: req.body.id });
        const imagePath = path.join(
            __dirname,
            "/../",
            `${category.image.replace(req.hostname, "")}`
        );
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.log(err);
            }
        });
        await category.remove();
        return res.status(200).json({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (err) {
        return res
            .status(400)
            .json({ success: false, message: err.toString() });
    }
});

router.get("/all", async (req, res) => {
    try {
        const categories = await Category.find();
        return res.status(200).json({
            success: true,
            data: categories,
            message: "Categories retrieved successful",
        });
    } catch (err) {
        return res.status(400).json({
            success: false,
            message: "Could no retrieve categories",
        });
    }
});

module.exports = router;
