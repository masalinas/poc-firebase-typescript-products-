import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as cors from 'cors';
import * as bodyParser from 'body-parser';

import { routesProductsConfig } from './products/routes-config';

admin.initializeApp();

const app = express();

app.use(bodyParser.json());
app.use(cors({ origin: true }));

routesProductsConfig(app);

export const api = functions.https.onRequest(app);
