require('./models/User');
// which means it only run models user once 
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const bodyParser = require('body-parser');
// help lib that automatically pass info associated with the body property fo incomming request
const requireAuth = require('./middlewares/requireAuth');
const port = process.env.PORT || 3000

const app = express();

app.use(bodyParser.json());// all the json info must parse first before authRoutes, so that info which are parsed will be into req obj
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri = 'mongodb+srv://admin:lyy6756867@mapcluster-cgwb6.mongodb.net/test?retryWrites=true&w=majority'
mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
})
// the object avoid appearing some warnning message inside of our terminal

//when successful
mongoose.connection.on('connected', () => {
    console.log('Connected to mongo instance');
})
//when fail
mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', error);
})

app.get('/', requireAuth, (req,res) => {
    res.send(`your email: ${req.user.email}`)// user defined in requireAuth
})

app.listen(port,()=>{
    console.log('listening on port 3000')
})
// JWT : json web token encoded string has some info inside of it, it prove that the 
// email or smear of the user is the person who provided the email