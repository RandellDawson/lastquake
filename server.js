const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))
app.use(cors())

//const connectDB = require('./database/mainDB')

//connectDB()

const PORT = process.env.PORT || 5000;


/*
TODO: when done building change to MongoDB
NEDB used for testing
*/
const Datastore = require('nedb');

const database = new Datastore('test.db');
database.loadDatabase();



const currentDay = require('./routes/history')
const search = require('./routes/search')
const register = require('./routes/auth/register')
const login = require('./routes/auth/signin')

app.get('/', (req, res) => res.send('API Running'));



app.use(currentDay)
app.use(search)

//login and register
app.use(register)
app.use(login)

app.listen(PORT, () => console.log(`> Server Started On: http://localhost:${PORT}`));