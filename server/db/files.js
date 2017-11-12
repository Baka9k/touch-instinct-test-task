const pg = require('pg')
const chalk = require('chalk')
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:pgpass@localhost:5432/files'
const client = new pg.Client(connectionString)
const datetime = require('../utils/datetime')

const files = {}

files.addFileToDB = function (originalname, name, extension, hash, size, mimetype) {

  return new Promise((resolve, reject) => {

    client.connect()
      .catch((err) => {
        reject(err)
      })
      .then(() => {
        const dateUploaded = datetime.getCurrentDateString()
        return (
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
            ]
          )
        )
      })
      .catch((err) => reject(err))
      .then(() => { return client.end() })
      .catch(err => reject(err))
      .then(() => resolve())
  })

}

module.exports = files
