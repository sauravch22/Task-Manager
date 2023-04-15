const express = require("express")
const router = express.Router()
const {createUser, login, access} = require("../Controllers/userController")
const auth = require("../middleware/auth")

router.post("/createuser",createUser)
router.post("/login",login)
router.post("/giveaccess",auth,access)

module.exports = router