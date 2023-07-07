const Job = require("../modal/Job")
const Joi = require("joi")
const GetJob = async (req, res) => {
    const job = await Job.find()
    res.send(job)
}




const Jobschema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().required()
})

const createJob = async (req, res, next) => {
    try {

        let { error } = Jobschema.validate(req.body,
            {
                abortEarly: false,
                allowUnknown: true,
            })
        if (error) {
            res.status(400).send(error?.details)
            return
        }
        let created = await Job.create({ ...req.body, created_by: req.user._id })
        if (created) {
            res.send({
                message: "Job creation success",
                created
            })
        }
    } catch (err) {
        next(err)
    }
}
module.exports = {
    createJob,
    GetJob
}