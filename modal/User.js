const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: async function (req_value) {
                const count = await mongoose.models.User.countDocuments({ email: req_value })
                if (count) {
                    return false
                } else {
                    return true
                }
            },
            message: "this email is already in use"

        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["company", "jobseeker"],
        set: function (value) {
            return value.toLowerCase()
        },
        required: true
    },
    website:{
        teype:String
    },
    image:{
        type:String
    }
}
    , {
        timestamps: true
    })

module.exports = mongoose.model("User", UserSchema)