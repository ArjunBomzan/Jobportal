const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const ApplySchema = new Schema({
job_id:{
    type:ObjectId,
    ref:"Job"
},
created_by:{
    type:ObjectId,
    ref:"User"
}
})
module.exports = mongoose.model("Apply", ApplySchema)
    