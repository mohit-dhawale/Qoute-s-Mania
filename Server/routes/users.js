const express = require("express");
const config = require("../Utils/config");
const cryptoJs = require("crypto-js");
const multer = require("multer");
const upload = multer({ dest: "uploads" });
const jwt = require("jsonwebtoken");
const db = require("../Utils/db");
const utils = require("../Utils/utils");
const mail =require('../Utils/mailer')

const router = express.Router();

router.post("/register", (request, response) => {
  const { first_name, last_name, email, password, mobile, dob } = request.body;

  const encrytedPassword = String(cryptoJs.SHA256(password));
  let qry = `INSERT INTO users(first_name, last_name, email, password, mobile, dob) VALUES(?,?,?,?,?,STR_TO_DATE(?, '%d %m %Y'))`;
  db.query(
    qry,
    [first_name, last_name, email, encrytedPassword, mobile, dob],
    (error, result) => {
      mail.sendEmail(
        email,
        'Welcome to Quote\'s Mania!!!',
        `
              <html>
              <body style="font-family: Arial, sans-serif; color: #333;">
              <h1 style="color: #007bff;">Welcome to Quote's Mania!</h1>
              <p>Dear ${first_name} ${last_name},</p>
              <p>We are absolutely thrilled to welcome you to the Quote's Mania community!</p>
              <p>At Quote's Mania, we're dedicated to making your experience exceptional.</p>
              <p>As a registered member username ${email}, you now have access to our latest features, exclusive offers, and a community of enthusiastic users just like you.</p>
              <p>Your feedback and engagement are incredibly important to us. Please feel free to share your thoughts and ideas as we constantly strive to improve our services.</p>
              <p>Thank you for joining us on this exciting journey. Should you have any questions, concerns, or just want to say hello, please don't hesitate to reach out to us. We're here to help!</p>
              <p>Once again, welcome aboard!</p>
              <p>Best regards,<br/>The Quote's Mania Team</p>
            </body>
              </html>
              `,
        () => {
          response.send(utils.createResult(error, result))
        }
      )
      // mail.sendEmail(
      //   email,
      //               'Congratulation!! You have Registered Successfully.',
      //               `
      //             <html>
      //             <body>
      //               <h1>Order confirmed!!</h1>
      //               <h3>With this email we are confirming your order placed on ${new Date()}. </h3>
      //               <h3>Please be ready</h3>
      //               <br/>

      //               <p>Thank you.</p>
      //             </body>
      //             </html>
      //             `,() => {
      //               response.send(utils.createResult(error, result))
      //             }

      // )
    }
  );
});

router.post("/login", (request, response) => {
  console.log(request.body)
  const { email, password } = request.body;
  const encryptedPassword = String(cryptoJs.SHA256(password));
  console.log(encryptedPassword);
  let qry = "SELECT id,first_name,last_name FROM users WHERE email=? and password=?";
  db.query(qry, [email, encryptedPassword], (error, result) => {
    if (result.length == 0) {
      response.send(utils.createResult("user does not exits"));
    } else {
      const user = result[0];

      const payload = {
        id: user["id"],
        name: `${user["first_name"]} ${user["last_name"]}`,
        email: user["email"],
      };

      const token = jwt.sign(payload, config.secret);

      response.send(
        utils.createResult(null, {
          id: user["id"],
          first_name: user["first_name"],
          last_name: user["last_name"],
          token: token,
        })
      );
    }
  });
});

router.post(
  "/upload-profile-image/:userId",
  upload.single("image"),
  (request, response) => {
    const { userId } = request.params;
    const filename = request.file.filename;
    let qry = `UPDATE users SET profileImage =? where id =?`;
    db.query(qry, [filename, userId], (error, result) => {
      response.send(utils.createResult(error, result));
    });
  }
);

router.put('/change-password',(request,response)=>{
  const {userId,oldpassword,newpassword} = request.body
  let qry1 = 'SELECT id FROM users WHERE id=? AND password =?'
  let qry2 = 'UPDATE users SET password=? WHERE id=?'

  const oldEncryptedpass = String(cryptoJs.SHA256(oldpassword))
  const newEncryptedpass = String(cryptoJs.SHA256(newpassword))
  db.query(qry1,[userId,oldEncryptedpass],(error,result)=>{
      if(result.length < 0){
          response.send(utils.createResult('incorrect password'))
      }else{
          db.query(qry2,[newEncryptedpass,userId],(error,result)=>{
              response.send(utils.createResult(error,result))
          })
      }
  })
})

router.get("/:userId", (request, response) => {
  const userId = request.params.userId;
  let qry = `SELECT * FROM users WHERE id=?`;
  db.query(qry, [userId],(error, result) => {
    console.log(result)
    if (error) {
      response.send(utils.createResult("user does not exits"));
    }else {
      const user = result[0];
      response.send(
        utils.createResult(null, {user})
      );
    }
  });
});

router.put('/update-profile',(request,response)=>{
  const {userId, first_name, last_name, mobile, dob} = request.body
  let qry1 = `UPDATE users SET first_name=?, last_name=?, mobile=?, dob=STR_TO_DATE(?, '%d %m %Y') WHERE id=?`
  db.query(qry1,[first_name,last_name,mobile,dob,userId],(error,result)=>{
    response.send(utils.createResult(error,result))
  })
})

module.exports = router;
