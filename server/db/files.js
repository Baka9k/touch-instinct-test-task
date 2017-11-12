const pg = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:pgpass@localhost:5432/files'
const client = new pg.Client(connectionString)
const datetime = require('../utils/datetime')

const files = {}

files.addFileToDB = function (originalname, name, extension, hash, size, mimetype) {

  return new Promise((resolve, reject) => {

    client.connect()
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
      .then(() => { return client.end() })
      .then(() => resolve())
      .catch(err => reject(err))
  })

}

module.exports = files
