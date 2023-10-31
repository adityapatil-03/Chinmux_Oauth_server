const router = require("express").Router();
const {clientRegister,clientRegisterPage} =require("../controllers/ClientController");

router.get("/register",clientRegisterPage);
router.post("/register",clientRegister);



module.exports = router;