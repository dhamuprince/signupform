const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    age:Number,
    dob:Date,
    email:String
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);