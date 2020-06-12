const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
var springedge = require('springedge');
const details = require("./details.json");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.get("/", (req, res) => {
  res.send(
    "<h1 style='text-align: center'>Welcome to Kuldeep Websoft Pvt Ltd </h1>"
  );
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  console.log(user);
  sendMail(user, info => {
    console.log(`The message has beed send 😃 and the id is ${info.messageId}`);
    res.send(info);
  });
});

app.post("/sendmessage", (req, res) => {
  console.log("request came");
  let params = req.body;

  
springedge.messages.send(params, 5000, function (err, response) {
  if (err) {
    return console.log(err);
  }
  res.send(response);
  console.log(response);

});
});

async function sendMail(user, callback) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: details.email,
      pass: details.password
    }
  });

  let mailOptions = {
    from: '"Fun Of Heuristic"<example.gimail.com>', // sender address
    to: user.email, // list of receivers
    subject: "Wellcome to Fun Of Heuristic 👻", // Subject line
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for joining us</h4>`
  };

  // send mail with defined transport object
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}


async function sendMessage(params, callback){

springedge.messages.send(params, 5000, function (err, response) {
    if (err) {
      return console.log(err);
    }
    response;
    console.log(response);

  });
  callback(info);
}

// main().catch(console.error);
