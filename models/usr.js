let mongoose = require("mongoose")

let UsrSchema = new mongoose.Schema({
    username:{
        unique: true,
        type: String,
    },
    password: String,
},
{ collection: "usr" })

module.exports = mongoose.model("Usr", UsrSchema)
