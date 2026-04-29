
const express = require("express");
const router = express.Router();
const {isAuthenticated}= require('../middleware/isAuthenticated')
const blogController = require("../controllers/blogController");
const { storage, multer } = require("../middleware/multerConfig");
const catchError = require("../services/catchError");
const upload = multer({ storage: storage });

router.get("/", catchError(blogController.getAllBlogs));
router.get("/addblog",isAuthenticated,catchError(blogController.renderAddBlog));
router.post(
  "/addblog",
  isAuthenticated,
  upload.single("image"),
 catchError( blogController.createBlog)
);

router.get("/blog/:id", catchError(blogController.getSingleBlog));
router.get("/delete/:id",isAuthenticated, catchError(blogController.deleteBlog));

router.get("/update/:id", catchError(blogController.renderUpdateBlog));
router.post("/update/:id", catchError(blogController.updateBlog));

























  







module.exports = router;