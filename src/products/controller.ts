import { Request, Response } from "express";
import * as admin from 'firebase-admin';

const permissions = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(permissions),
  databaseURL: "https://product-3a5fb.firebaseio.com"
});

const db = admin.firestore();

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}

export async function create(req: Request, res: Response) {
    try {
        const { id, code, description, price, active } = req.body;

        if (!id || !code || !description || !price || !active) {
            return res.status(400).send({ message: 'Missing fields' });
        }
        
        await db.collection('products').doc('/' + id + '/')
            .create({
                code: code,
                description: description,
                price: price,
                active: active
            });
                
        return res.status(201).send({ id })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function all(req: Request, res: Response) {
    try {
        const productsRef = db.collection("products").get();
      
        const querySnapshot = await productsRef
        const docs = querySnapshot.docs;

        const products = docs.map((doc) => ({
            id: doc.id,
            code: doc.data().code,
            description: doc.data().description,
            price: doc.data().price,
            active: doc.data().active
        }));

        return res.status(200).send({ products });        
    } catch (err) {
        return handleError(res, err)
    }
}

export async function get(req: Request, res: Response) {
    try {                    
        const { id } = req.params;
        
        const productsRef = db.collection("products");
        
        const doc = productsRef.doc(id);        

        return res.status(200).send({ product: doc });
    } catch (err) {
        return handleError(res, err)
    }
}

export async function patch(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const { code, description, price, active } = req.body;

        if (!id || !code || !description || !price || !active) {
            return res.status(400).send({ message: 'Missing fields' });
        }

        /*await admin.auth().updateUser(id, { displayName, password, email });
        await admin.auth().setCustomUserClaims(id, { role });

        const user = await admin.auth().getUser(id);*/

        const product = undefined;

        return res.status(204).send({ product: product });        
    } catch (err) {
        return handleError(res, err)
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.params;

        const productsRef = db.collection("products");

        const doc = productsRef.doc(id); 
      
        await doc.delete();
                
        return res.status(204).send({});
    } catch (err) {
        return handleError(res, err)
    }
}