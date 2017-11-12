const express = require('express')
const path = require('path')
const multer = require('multer')
const md5File = require('md5-file')
const chalk = require('chalk')
const fs = require('fs')
const morgan = require('morgan')

const app = express()
const upload = multer({ dest: 'uploads' })

const port = process.env.PORT || 9000

app.use('/', express.static('dist'))
app.use('/static', express.static('static'))
app.use('/uploads', express.static('uploads'))
app.use(morgan('dev')) // log requests to the console

// ====== DB ======

const addFileToDB = function (originalname, name, hash, size, mimetype) {
  return new Promise((resolve, reject) => {
    
  })
}

// ====== ROUTER =====

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
      // console.log(req.files)
      const file = req.files[0]
      if (!file) {
        console.log(chalk.red('Error in POST /: cannot find file in req.files'))
        return
      }
      let extension = file.originalname.match(/\.\w+$/)
      file.pathWithExtension = file.path + extension[0]
      fs.rename(file.path, file.pathWithExtension, () => {
        const hash = md5File.sync(file.pathWithExtension)
        let name = file.pathWithExtension.replace(/uploads\//, '')
        // Add entry in DB
        addFileToDB(file.originalname, name, hash, file.size, file.mimetype)
          .then(() => res.json({
            path: file.pathWithExtension,
            success: true
          }))
          .catch((err) => {
            res.status(500).json({ error: err })
          })
      })
    }
  )

app.use('/', router)

app.listen(port)
console.log(chalk.green('File uploader listening on port ' + port))
