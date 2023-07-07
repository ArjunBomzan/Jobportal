const express=require("express")
const { createJob, GetJob } = require("../controller/job")
const { checkLogin, isCompany } = require("../middleware/auth")


const router=express.Router()
router.get("",GetJob)
router.post("",checkLogin,isCompany,createJob)

module.exports= router
