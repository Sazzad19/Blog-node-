const User = require('../models/User')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const errorFormatter = require('../utils/validationErrorFormatter')


exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', { title: 'Login Here', error: {} })
}

exports.loginPostController = async (req, res, next) => {
    let { email, password } = req.body
    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        res.render('pages/auth/login',
            {
                title: 'Login Here',
                error: errors.mapped()
            })
    }
    else {
        try {
            let user = await User.findOne({ email })
            if (user) {
                let match = await bcrypt.compare(password, user.password)
                if (match) {
                    console.log("Logged In Successfully")
                    res.render('pages/auth/login', { title: 'Login Here', error: {} })
                }
                else {
                    res.json({
                        message: "Password is incorrect"
                    })
                }
            }
            else {
                res.json({
                    message: "Email is incorrect"
                })
            }
        }
        catch (e) {
            next(e)
        }
    }

}

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', { title: 'Signup Here', error: {}, value: {} })
}

exports.signupPostController = async (req, res, next) => {

    let { username, email, password } = req.body

    const errors = validationResult(req).formatWith(errorFormatter)
    if (!errors.isEmpty()) {
        console.log(errors.mapped())
        res.render('pages/auth/signup',
            {
                title: 'Signup Here',
                error: errors.mapped(),
                value: {
                    username,
                    email
                }
            })
    }
    else {
        try {
            let hashedPassword = await bcrypt.hash(password, 11)
            let user = new User({
                username,
                email,
                password: hashedPassword
            })
            let createUser = await user.save()
            console.log("User Created Successfully", createUser)
            res.render('pages/auth/signup', { title: 'Signup Here', error: {}, value: {} })
        }
        catch (e) {
            next(e)
        }
    }



}

exports.logoutController = (req, res, next) => {

}