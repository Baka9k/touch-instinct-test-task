const express = require('express')
const path = require('path')
const md5File = require('md5-file')
const chalk = require('chalk')
const fs = require('fs')
const multer = require('multer')

const files = require('../db/files')

const router = express.Router()
const upload = multer({ dest: 'uploads' })

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

      const file = req.files[0]
      if (!file) {
        console.log(chalk.red('Error in POST /: cannot find file in req.files'))
        return
      }

      let extension = file.originalname.match(/\.\w+$/)[0]
      if (extension) {
        extension = extension.substring(1, 255) // Remove dot and truncate if longer than 255
      } else {
        extension = ''
      }
      file.pathWithExtension = file.path + extension[0]

      fs.rename(file.path, file.pathWithExtension, () => {

        const hash = md5File.sync(file.pathWithExtension)
        const filename = file.filename.substring(0, 255) // Truncate if longer than 255

        // Add entry in DB
        files.addFileToDB(file.originalname, filename, extension, hash, file.size, file.mimetype)
          .then(() => {
            res.json({
              path: file.pathWithExtension,
              success: true
            })
            console.log(chalk.blue('File received:', filename))
          })
          .catch((err) => {
            console.log(chalk.red('Error while adding file to db:', err))
            res.status(500).json({ error: err })
          })

      })

    }
  )

module.exports = router
