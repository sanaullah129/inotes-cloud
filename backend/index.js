const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');


connectToMongo();


const app = express();
const port = 4000;

app.use(cors());
app.use(express.json()); //middleware
// Available Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));


app.listen(port, () => {
  console.log(`iNotes-Cloud backend is running on port http://localhost:${port}`)
})