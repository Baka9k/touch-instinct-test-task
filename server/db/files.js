const pg = require('pg')
const chalk = require('chalk')
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:pgpass@localhost:5432/files'
const datetime = require('../utils/datetime')

const files = {}

files.addFileToDB = function (originalname, name, extension, hash, size, mimetype) {

  return new Promise((resolve, reject) => {

    // Get a Postgres client from the connection pool
    pg.connect(connectionString, (err, client, done) => {

      // Handle connection errors
      if (err) {
        done()
        console.log(chalk.red(err))
        reject(err)
      }

      const dateUploaded = datetime.getCurrentDateString()

      const query = client.query(`INSERT INTO files
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
        ]
      )

      query.on('end', () => {
        done()
        resolve()
      })
    })

  })

}

module.exports = files
