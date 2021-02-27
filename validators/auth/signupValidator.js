const User = require('../../models/User');
const {body} = require('express-validator');
module.exports = [
    body('username')
    .not()
    .isEmpty()
    .withMessage('Username cannot be empty')
    .isLength({min: 2, max: 15})
    .withMessage('Username must be between 2 to 15 character')
    .custom(async username => {
        let user = await User.findOne({username})
        if(user){
            return Promise.reject('Username Already Used')
        }
        return true
    })
    .trim()
    ,
    body('email')
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email must be valid')
    .custom(async email => {
        let user = await User.findOne({email})
        if(user){
            return Promise.reject('Email Already Used')
        }
        return true
    })
    .normalizeEmail()
    ,
    body('password')
    .isLength({min: 6})
    .withMessage('Password must be greater than 6 character')
    ,
    body('confirmpassword')
    .isLength({min: 6})
    .withMessage('Password must be greater than 6 character')
    .custom((confirmpassword, {req}) => {
        if(confirmpassword != req.body.password){
            throw new Error('Password does not match')
        }
        return true
    })
]