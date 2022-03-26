const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email: {type: 'string',unique: true, lowercase: true },
    name: String,
    password: String
})

UserSchema.pre('save', function(next) {
    var user = this;
    if(!user.isModified('password')) return next();

    bcrypt.hash(user.password, 10, function(err,hash) {
        if(err) return next(err);

        user.password = hash;
        next();
    });
})

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);