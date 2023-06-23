// const mongoose = require("mongoose");
// const mongoURI = "mongodb://localhost:27017/"
// const connectToMongoose = () =>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("connected to mongoose")
//     })
// }
// module.exports = connectToMongoose;
const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/"
const mongoURI = "mongodb://127.0.0.1:27017/"

const connectToMongo = async () => {
try {
    mongoose.set('strictQuery', false)
    mongoose.connect(mongoURI) 
    console.log('Mongo connected')
}
catch(error) {
    console.log(error)
    process.exit()
}
}
module.exports = connectToMongo;