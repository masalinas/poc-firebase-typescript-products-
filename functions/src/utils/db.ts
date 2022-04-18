import * as admin from "firebase-admin";

const firebaseConfig = require("../firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: "https://product-3a5fb.firebaseio.com",
});

const db = admin.firestore();

export { db }