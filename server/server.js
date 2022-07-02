//Install express server
const express = require('express');
const path = require('path');

const app = express();

const accountSid = process.env.TWILIO_ACCOUNT_SID || 'ACb5db92822d78c7fc3d35487689671e82';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'a8da47722b8bae119a1787c11339448d';
const client = require('twilio')(accountSid, authToken);

// Serve only the static files form the dist directory
app.use(express.static('/my-app'));

app.get('/*', (req, res) =>
    res.sendFile('index.html', {root: './my-app/'}),
);

app.post('/sendEmail', (req, res) => {

    const {body, from, to} = req.query;
    console.log(body);
    client.messages
    .create({body, from, to})
    .then(message => {
        console.log(message.sid);
        res.send(message.sid)
    })
})



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 3001);