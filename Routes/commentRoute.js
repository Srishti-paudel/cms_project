
const express = require("express");
const catchError = require("../services/catchError");
const router = express.Router();
const blogController = require("../controllers/blogController");
const { isAuthenticated } = require("../middleware/isAuthenticated");
 router.post('/comment',isAuthenticated,catchError(blogController.addComment))
 module.exports = router;