const db = require("../model");

const Contact = db.contacts;

exports.contactPage = (req, res) => {
    res.render("contact");
};

exports.addContact = async (req, res) => {
    try {
        const { fullName, email, subject, message } = req.body;

        await Contact.create({
            fullName,
            email,
            subject,
            message,
        });

        res.redirect("/contact");
    } catch (error) {
        console.log(error);
        res.status(500).send("Something went wrong.");
    }
};