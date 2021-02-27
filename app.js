const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')


//Import Routes
const authRoutes = require('./routes/authRoutes')

const app = express()

//View Setup
app.set('view engine', 'ejs')
app.set('views', 'views')


//Middleware Array
const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json()
]

app.use(middleware)

app.use('/auth', authRoutes)

app.use('/', (req, res) => {
    res.json({
        message: "Welcome to our website new change"
    })
})
mongoose.connect('mongodb+srv://test:M0EQ59I3nSX3@blog.owd1q.mongodb.net/blog?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const PORT = process.env.PORT || 3000

        app.listen(PORT, () => {
            console.log(`Server is listening on ${PORT}`);
        });
    })
    .catch((e) => {
        console.log(e)
    })
