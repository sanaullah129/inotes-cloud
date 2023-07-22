
const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://asanaullah921:sanaullah129@inotes-backend.npd4nix.mongodb.net/inotes-database?retryWrites=true&w=majority"

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURL) 
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;