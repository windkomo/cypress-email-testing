const express = require('express');
const rp = require('request-promise');
const quotedPrintable = require('quoted-printable');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

// transporter that will send emails to mailhog
const transporter = nodemailer.createTransport({
  host: 'localhost',
  port: 1025,
  tls: {
    ciphers: 'SSLv3',
  },
});

const app = new express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/', (req, res) => {
  transporter.sendMail({
    from: 'Humbledev <contact@humble.dev>',
    to: req.body.email,
    subject: 'Email verification',
    html: '<a href="http://localhost:4003/verification.html">Click me!</a>',
  });

  res.redirect('/sent.html');
});

// Endpoint called by cypress to fetch last email for a given email address
app.get('/last-email', async (req, res) => {
  // Query mailhog API
  const { items } = await rp({
    method: 'GET',
    url: 'http://localhost:8025/api/v2/search',
    headers: {
      'content-type': 'application/json',
    },
    qs: {
      kind: 'to',
      query: decodeURIComponent(req.query.email),
    },
    json: true,
  });

  const lastEmail = items[0];

  if (lastEmail) {
    res.send(lastEmail.Content.Body);
  } else {
    res.send(null);
  }
});

const server = app.listen(4003, function() {
  console.log('-------------------------------');
  console.log(`Express server ready on port ${server.address().port}`);
  console.log('-------------------------------');
});
