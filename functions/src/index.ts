import * as functions from "firebase-functions";
import * as express from "express";
import * as cors from "cors";
import * as bodyParser from "body-parser";

import {routesConfig} from "./products/routes-config";

// create ExpressJS Server and configure it
const app = express();

app.use(bodyParser.json());
app.use(cors({origin: true}));

// initialize API routes
routesConfig(app);

export const api = functions.https.onRequest(app);
