const User = require("../modal/User")
const Joi = require("joi")
const bcrypt = require("bcrypt")
const Jwt = require("jsonwebtoken")

const schema = Joi.object({
    name: Joi.string().required(),
    password: Joi.string().required().min(8)
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
    // password_confirmation: bJoi.required().ref('password'),
    email: Joi.string().email().required()
})

const signup = async (req, res, next) => {

    try {
        let { error } = schema.validate(req.body,
            {
                abortEarly: false,
                allowUnknown: true,
            })
        if (error) {
            res.status(400).send(error?.details)
            return
        }

        let hashed = await bcrypt.hash(req.body.password, 10);
        const user = await User.create({ ...req.body, password: hashed })
        if (user) {
            console.log("user registered")
            res.send(user)
        }

    } catch (err) {
        next(err)
    }

}
//  for login
const LoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})

const login = async (req, res, next) => {
    try {
        let { error } = LoginSchema.validate(req.body,
            {
                abortEarly: false,
            })
        if (error) {
            res.status(400).send(error?.details)
            return
        }
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            const matched = await bcrypt.compare(req.body.password, user.password);
            if (matched) {

                let userObj = user.toObject()
                delete userObj.password;
                let token = Jwt.sign({ user }, process.env.SECRET_KEY);
                res.send({
                    message: "User Loged in",
                    token
                })
            } else {
                res.status(401).send({
                    msg: "Invalid Credentaions"
                })
            }
        }
    }
    catch (err) {
        next(err)
    }
}

module.exports = {
    signup,
    login
}