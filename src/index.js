const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const User = require('../models/user');
const Contacts = require('../models/contact')
const token_utils = require('../utils/token')


let app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Rest API Example");
})

// User registration and Login Endpoints

app.post('/register', async (req, res) => {
    let data = await User.registerUser(req.body);
    res.send(data);
});

app.post('/login', async (req, res) => {
    let data = await User.Login(req.body);
    res.send(data);
})

// Contact Features Endpoints
//  Requestarrives => verify auth-token received in header Header => Process Request

app.post('/addContact', token_utils.verifyToken, async (req, res) => {
    req.body.user_id = res.locals.user_id;
    let result = await Contacts.addContact(req.body)
    res.status(200).send(result);

})

app.delete('/deleteContact', token_utils.verifyToken, async (req, res) => {
    let result = await Contacts.deleteContact(req.body)
    res.status(200).send(result);
})

app.put('/updateContact', token_utils.verifyToken, async (req, res) => {
    let result = await Contacts.updateContact(req.body)
    res.status(200).send(result);
})

// get single contact
app.get('/getContact', token_utils.verifyToken, async (req, res) => {
        let result = await Contacts.getContact(req.body);
        res.status(200).send(result);
})

// get List of Contacts
app.get('/getAllContacts', token_utils.verifyToken, async (req, res) => {
    let result = await Contacts.getAllContact({user_id:res.locals.user_id});
        res.status(200).send(result);
})

// Starting Server
app.listen(process.env.PORT, () => {
    console.log('Server started on port number ' + process.env.PORT);
})

