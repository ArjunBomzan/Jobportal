const Job = require("../modal/Job")
const Joi = require("joi")
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
        let job = req.body
        console.log(job)

        let created = await Job.create({job})

    } catch (err) {
        next(err)
    }
}
module.exports = {
    createJob
}