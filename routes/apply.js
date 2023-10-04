
const express=require("express")
const { apply, getApply } = require("../controller/apply")
const { checkLogin, isJobseeker } = require("../middleware/auth")



const router=express.Router()
router.get("",getApply)
router.post("",checkLogin,isJobseeker,apply)





module.exports= router
