const pg = require('pg')
const datetime = require('../utils/datetime')
// pools will use environment variables
// for connection information
const pool = new pg.Pool()

const files = {}

files.addFileToDB = function (originalname, name, extension, hash, size, mimetype) {

  return new Promise((resolve, reject) => {

    const dateUploaded = datetime.getCurrentDateString()

    pool.connect((err, client, release) => {
      if (err) {
        reject(err)
      }
      client.query(
        `INSERT INTO files
          (
            dateUploaded,
            originalname,
            name,
            extension,
            hash,
            size,
            mimetype
          ) values(
            $1, $2, $3, $4, $5, $6, $7
          )`,
        [
          dateUploaded,
          originalname,
          name,
          extension,
          hash,
          size,
          mimetype
        ],
        (err, result) => {
          release()
          if (err) {
            reject(err)
          } else {
            resolve(result)
          }
        }
      )
    })

  })
}

module.exports = files
