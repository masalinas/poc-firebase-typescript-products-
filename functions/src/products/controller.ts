import {Request, Response} from "express";

import { db } from '../utils/db'

function handleError(res: Response, err: any) {
  return res.status(500).send({message: `${err.code} - ${err.message}`});
}

export async function findAll(req: Request, res: Response) {
  try {
    const collectionRef = db.collection("products");

    const querySnapshot = await collectionRef.get();

    const docs = querySnapshot.docs;
    const response = docs.map((doc) => ({
      id: doc.id,
      code: doc.data().code,
      description: doc.data().description,
      price: doc.data().price,
      active: doc.data().active,
    }));

    return res.status(200).send({response});
  } catch (err) {
    return handleError(res, err);
  }
}

export async function findByCode(req: Request, res: Response) {
  try {
    const {code} = req.params;

    if (!code) {
      return res.status(400).send({message: "Missing fields"});
    }

    const collectionRef = db.collection("products");

    const querySnapshot = await collectionRef.where("code", "==", code).get();

    const docs = querySnapshot.docs;
    const response = docs.map((doc) => ({
      id: doc.id,
      code: doc.data().code,
      description: doc.data().description,
      price: doc.data().price,
      active: doc.data().active,
    }));

    return res.status(200).send({response});
  } catch (err) {
    return handleError(res, err);
  }
}

export async function save(req: Request, res: Response) {
  try {
    const {id, code, description, price, active} = req.body;

    if (!id || !code || !description || !price || typeof active === "undefined") {
      return res.status(400).send({message: "Missing fields"});
    }

    const documentRef = db.collection("products").doc("/" + id + "/");

    await documentRef.create({
          code: code,
          description: description,
          price: price,
          active: active,
        });

    return res.status(201).send({id});
  } catch (err) {
    return handleError(res, err);
  }
}

export async function update(req: Request, res: Response) {
  try {
    const {id} = req.params;
    const {code, description, price, active} = req.body;

    if (!id || !code || !description || !price || typeof active === "undefined") {
      return res.status(400).send({message: "Missing fields"});
    }

    const documentRef = db.collection("products").doc(id);

    await documentRef.update({
      code: code,
      description: description,
      price: price,
      active: active,
    });

    return res.status(201).send({id});
  } catch (err) {
    return handleError(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    const {id} = req.params;

    if (!id) {
      return res.status(400).send({message: "Missing fields"});
    }

    const documentRef = db.collection("products").doc(id);

    await documentRef.delete();

    return res.status(201).send({id});
  } catch (err) {
    return handleError(res, err);
  }
}
