//user, title, bio, profilePic, links: {fb, twi}, posts, bookmarks

const { Schema, model } = require('mongoose')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        trim: true,
        maxlength: 30
    },
    title: {
        type: String,
        trim: true,
        maxlength: 30
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 100
    },
    profilePic: String,
    links: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    posts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ],
    bookmarks: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
},
{
    timestamps: true
})

const Profile = model('Profile', profileSchema)

module.exports = Profile