
const express = require("express");
const router = express.Router();
const {isAuthenticated}= require('../middleware/isAuthenticated')
const blogController = require("../controllers/blogController");
const { storage, multer } = require("../middleware/multerConfig");

const upload = multer({ storage: storage });

router.get("/", blogController.getAllBlogs);
router.get("/addblog",isAuthenticated,blogController.renderAddBlog);
router.post(
  "/addblog",
  isAuthenticated,
  upload.single("image"),
  blogController.createBlog
);

router.get("/blog/:id", blogController.getSingleBlog);
router.get("/delete/:id", blogController.deleteBlog);

router.get("/update/:id", blogController.renderUpdateBlog);
router.post("/update/:id", blogController.updateBlog);

























  







module.exports = router;