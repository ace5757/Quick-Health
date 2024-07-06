const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/quick-health'

const connectToMongo =()=>{
    mongoose.connect(url).then(()=>console.log("connected to mongo succesfully"))
}

module.exports = connectToMongo