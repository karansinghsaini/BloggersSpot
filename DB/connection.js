const mongoose = require('mongoose');

const uri = "mongodb+srv://dbUser:Linkinpark@1@react-blog.vzg80.mongodb.net/reactblogdb?retryWrites=true&w=majority";

const connectDB = async () => {
    await mongoose.connect(uri, { useUnifiedTopology: true,useNewUrlParser: true });
    console.log("db connected");
}

module.exports = connectDB;