const router = require("express").Router();
const multer = require("multer");
const { userRegistration, handleUserRegistration } = require("../controllers/UserController");


router.get("/register", userRegistration);
router.post("/upload", handleUserRegistration);

module.exports = router;
