const router = require("express").Router();

const contactController = require("../Controllers/contactController");
const catchError = require("../services/catchError");

router.get("/contact", contactController.contactPage);
router.post("/contact", catchError(contactController.addContact));

module.exports = router;