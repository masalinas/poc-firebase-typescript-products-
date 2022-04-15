import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import {routesConfig} from "./products/routes-config";

// initializ App
const firebaseConfig = require("./firebaseConfig.json");

admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  databaseURL: "https://product-3a5fb.firebaseio.com",
});

// crete firestore connection
const db = admin.firestore();

// create ExpressJS Server and configure it
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: true}));

// initialize API routes
routesConfig(app, db);

export const api = functions.https.onRequest(app);
