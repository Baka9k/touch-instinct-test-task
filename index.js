const express = require('express')
const chalk = require('chalk')
const morgan = require('morgan')

const port = process.env.PORT || 9000

// configure app
const app = express()
app.use('/', express.static('dist'))
app.use('/static', express.static('static'))
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev')) // log requests to the console

const router = require('./server/routes/index')
app.use('/', router)

app.listen(port)
console.log(chalk.green('File uploader listening on port ' + port))
