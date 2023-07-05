const jwt = require("jsonwebtoken")
let { COMPANY, JOBSEEKER } = require("../constansts/role")
const checkLogin = (req, res, next) => {
    let user = null
    let token = req.headers?.authorization?.split(" ")[1]
    try {
        user = jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        next(err)
    }
    if (user) {
        req.user = user
        next()
    }
    else {
        res.status(401).send({ message: "unautorized" })
    }
}


const isCompany = (req, res, next) => {
    let { user } = req.user
    if (user.role === COMPANY) {
        next()
    } else {
        res.status(403).send({
            message: "Forbidden"
        })
    }


}
const isJobseeker = (req, res, next) => {
    let { user } = req.user
    console.log(user.role)

    if (user.role === JOBSEEKER) {
        next()
    } else {
        res.status(403).send({
            message: "Forbidden"
        })
    }


}


module.exports = {
    checkLogin,
    isCompany,
    isJobseeker
}