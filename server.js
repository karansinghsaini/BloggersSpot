const express = require('express');
const connectDB = require('./DB/connection');
const cors = require("cors");
const path = require('path');

const app = express();

const port = process.env.PORT || 5000;
connectDB();

app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());
app.use(express.json({extended:false}));
app.use('/user', require('./Api/user'));
app.use('/profile',require('./Api/profile'));
app.use('/blogs',require('./Api/blogs'));
app.use('/comments', require('./Api/comments'));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'))
});


app.listen(port, () => console.log(`Listening on port ${port}`));