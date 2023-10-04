const Apply = require("../modal/Apply")

const getApply =async (req, res, next) => {
    try{
        const job =await Apply.find()
        res.send(job)
    }catch(err){
        next(err)
    }
   
}

const apply = async (req, res, next) => {
    const created_by = req.user._id
    try {
        const job = await Apply.create({ ...req.body, created_by: created_by })
        res.send(job)
    } catch (err) {
        nect(err)
    }


}
module.exports = {
    apply, getApply
}