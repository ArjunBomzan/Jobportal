const express = require("express")
require("./config/databse")
const user_route = require("./routes/user")
const job_route = require("./routes/job")
const { resourceNotfound, handleServererror } = require("./middleware/errorhandle")
app = express()
app.use(express.json())
app.use("/api", user_route)
app.use("/api/job",job_route)
require('dotenv').config()



app.use(resourceNotfound)
app.use(handleServererror)

app.listen(8000, () => {
    console.log("Server started at port no 8000")
})