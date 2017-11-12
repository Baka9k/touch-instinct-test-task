const pg = require('pg')
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo'
const client = new pg.Client(connectionString)

client.connect()

const query = client.query(
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

query.on('end', () => { client.end() })
