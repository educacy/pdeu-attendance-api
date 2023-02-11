const admin = require("firebase-admin");

const serviceAccount = require("./key/project-x76a-firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin;
