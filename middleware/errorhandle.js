const resourceNotfound = (req, res) => {
    res.status(404).send({
        message: "Resource not found"
    })
}

const handleServererror = (err, req, res, next) => {

    let statuscode = 500
    let errmessage = "Server Error"
    if (err.name == "ValidationError") {
        statuscode = 400
        errmessage = "Bad request"
    }
    else if (err.name == "CastError") {
        statuscode = 404
        errmessage = "Resource not found"
    }

    let errors = []
    if (err.errors)
        errors = Object.entries(err.errors).map(err => {
            return {
                params: err[0],
                message: err[1].message
            }
        })

    res.status(statuscode).send({
        msg: errmessage + " " + err.message,
        errors
    })

}


module.exports = {
    resourceNotfound,
    handleServererror
}