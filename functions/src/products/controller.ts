import { Request, Response } from "express";
import { Firestore } from '@google-cloud/firestore';

function handleError(res: Response, err: any) {
    return res.status(500).send({ message: `${err.code} - ${err.message}` });
}

let db: Firestore;
export async function controller(_db: Firestore) {
    db = _db;
}

export async function findAll(req: Request, res: Response) {    
    try {        
        let query = db.collection("products");
        
        const querySnapshot = await query.get();
        let docs = querySnapshot.docs;

        const response = docs.map((doc) => ({
            id: doc.id,
            code: doc.data().code,
            description: doc.data().description,
            price: doc.data().price,
            active: doc.data().active
        }));

        return res.status(200).send({ response });
    } catch (err) {
        return handleError(res, err)
    }
}

export async function save(req: Request, res: Response) {
    try {
        const { id, code, description, price, active } = req.body

        if (!id || !code || !description || !price || typeof active === "undefined") {
            return res.status(400).send({ message: 'Missing fields' })
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

export async function update(req: Request, res: Response) {
    try {
        const { id } = req.params
        const { code, description, price, active } = req.body

        if (!id || !code || !description || !price || typeof active === "undefined") {
            return res.status(400).send({ message: 'Missing fields' })
        }

        const document = db.collection("products").doc(id);
      
        await document.update({
            code: code,
            description: description,
            price: price,
            active: active,
        });

        return res.status(201).send({ id })
    } catch (err) {
        return handleError(res, err)
    }
}

export async function remove(req: Request, res: Response) {
    try {
        const { id } = req.params

        if (!id) {
            return res.status(400).send({ message: 'Missing fields' })
        }

        const doc = db.collection("products").doc(id);
      
        await doc.delete();

        return res.status(201).send({ id })
    } catch (err) {
        return handleError(res, err)
    }
}