const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const multer = require('multer')
const md5File = require('md5-file')
const chalk = require('chalk')
const morgan = require('morgan')

const app = express()
const upload = multer({ dest: 'uploads' })

const port = process.env.PORT || 9000

app.use('/', express.static('dist'))
app.use('/static', express.static('static'))
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev')) // log requests to the console
// configure body parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const router = express.Router()

router.route('/')

  .get((req, res) => {
    res.sendFile(path.join(__dirname, '/dist/index.html'))
  })

  .post(
    upload.array('file', 1),
    // req.files is array of files
    // req.files[i] looks like:
    /*
      {
        fieldname: 'myfile',                              // file field in form
        originalname: '123_hello.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: 'uploads/',
        filename: '2b0831e79589b8cd722568c9e5259b63',
        path: 'uploads/2b0831e79589b8cd722568c9e5259b63',
        size: 54728
      }
    */
    (req, res) => {
      console.log(req.files, req.body)
    }
  )

app.use('/', router)

app.listen(port)
console.log(chalk.green('App listening on port ' + port))
