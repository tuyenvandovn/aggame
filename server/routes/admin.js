const express = require("express");
const router = express.Router();

const {
    listAdmin,
    signUpAdmin,
    loginAdmin,
    createAdmin,
    updateAdmin,
    singleAdmin,
    chekLogin
} = require("../controllers/admin");

const {
    adminSignUpValidation,
    adminSignInValidation
} = require("../validator/admin");
const { runValidation } = require("../validator");

const { requireSignin, requireAdmin } = require("../middlewares");

router.get("/", listAdmin);
router.get("/:id", singleAdmin);
router.post("/signup", adminSignUpValidation, runValidation, signUpAdmin);
router.post("/signin", adminSignInValidation, runValidation, loginAdmin);
router.post("/create", adminSignUpValidation, runValidation, createAdmin);
router.post("/update", updateAdmin);
router.post("/check", requireSignin, chekLogin);
module.exports = router;
