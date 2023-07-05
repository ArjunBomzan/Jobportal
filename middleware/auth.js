const jwt = require("jsonwebtoken")
let { COMPANY, JOBSEEKER } = require("../constansts/role")
const checkLogin = (req, res, next) => {
    let user = null
    const token = req.headers?.authorization?.split(" ")[1]
    try {
        verified_user = jwt.verify(token, process.env.SECRET_KEY);
        user = verified_user.user
    } catch (err) {
        next(err)
    }
    if (user) {
        req.user = user
        delete req.user.password
        next()
    }
    else {
        res.status(401).send({ message: "unautorized" })
    }
}


const isCompany = (req, res, next) => {
    console.log(req.user)
    let { role } = req.user
    if (role === COMPANY) {
        next()
    } else {
        res.status(403).send({
            message: "Forbidden"
        })
    }


}
const isJobseeker = (req, res, next) => {
    let { role } = req.user
    if (role === JOBSEEKER) {
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