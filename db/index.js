const { connect } = require('mongoose')

const URI = "mongodb+srv://vinod:hqDrM7klt4yDWJSN@cluster0.su13v.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

connect(URI)
    .then(conn => console.log("MongoDB Connected...."))
    .catch(console.log)