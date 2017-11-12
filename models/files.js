const pg = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://postgres:pgpass@localhost:5432/files'
const client = new pg.Client(connectionString)
const chalk = require('chalk')

client.connect()
  .catch((err) => { console.log(chalk.red('Error while connecting to db: ', err)) })
  .then(() => {
    return (
      client.query(
        `CREATE TABLE files(
        id SERIAL PRIMARY KEY, 
        dateUploaded TIMESTAMP, 
        originalname VARCHAR(255),
        name CHAR(32),
        extension VARCHAR(255),
        hash CHAR(32),
        size INT,
        mimetype VARCHAR(255)
      )`
      )
    )
  })
  .catch((err) => { console.log(chalk.red('Error while creating table "files": ', err)) })
  .then(() => { return client.end() })
