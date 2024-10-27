var mongoose = require('mongoose');

var StudentSchema = new mongoose.Schema({
    name: { type: String, required: true},
    mobile_number: { type: Number, required: true},
    email: { type: String, required: true},
    password: { type: String, reuired: true}
}, { timestamps: true});

module.exports = mongoose.model("student",StudentSchema);