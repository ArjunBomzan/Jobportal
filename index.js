const express = require("express")
require("./config/databse")
const user_route = require("./routes/user")
const job_route = require("./routes/job")
const order_route=require("./routes/apply")
const { resourceNotfound, handleServererror } = require("./middleware/errorhandle")
const Access = require("./config/access")
require('dotenv').config()
app = express()
app.use(express.json())
app.use(Access);
app.use("/api", user_route)
app.use("/api/job",job_route)
app.use("/api/apply",order_route)




app.use(resourceNotfound)
app.use(handleServererror)

app.listen(8000, () => {
    console.log("Server started at port no 8000")
})