//username, email, password, profile
const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
},
{
    timestamps: true
})

const User = model('User', userSchema)

module.exports = User// new comment added 0;// new comment added 3;