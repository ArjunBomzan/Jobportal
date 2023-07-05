const express=require("express")
const { createJob } = require("../controller/job")
const { checkLogin, isCompany } = require("../middleware/auth")


const router=express.Router()
router.post("",checkLogin,isCompany,createJob)

module.exports= router

