const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const JobSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
    },
    location: {
        type: String,
     
    },
    experience: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ['fulltime', 'parttime', 'contract'],
        set: function (value) {
            return value.toLowerCase()
        },
        required: true
    },

    salaryRange: {
        from: {
            type: Number
        },
        to: {
            type: Number
        }

    },
    created_by: {
        type: ObjectId,
        ref: "User"
    }



}, {
    timestamps: true
})

module.exports = mongoose.model("Job", JobSchema)