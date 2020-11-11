const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.static('public'))
app.use(express.json({limit: '1mb'}))
app.use(cors())
const PORT = process.env.PORT || 5000;


/*
TODO: when done building change to MongoDB
NEDB used for testing
*/
// const Datastore = require('nedb');

// const database = new Datastore('test.db');
// database.loadDatabase();


const geoLocation = require('./routes/geolocation');
const currentDay = require('./routes/history')
app.get('/', (req, res) => res.send('API Running'));


app.use(geoLocation);
app.use(currentDay)

app.listen(PORT, () => console.log(`> Server Started On: http://localhost:${PORT}`));