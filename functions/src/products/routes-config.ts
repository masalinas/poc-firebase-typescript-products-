import {Firestore} from "@google-cloud/firestore";
import {Application} from "express";

import {controller, findAll, save, update, remove} from "./controller";
import {isAuthenticated} from "../auth/authenticated";

export function routesConfig(app: Application, db: Firestore) {
  controller(db);

  app.get("/products", [isAuthenticated, findAll]);

  app.post("/products", [isAuthenticated, save]);

  app.put("/products/:id", [isAuthenticated, update]);

  app.delete("/products/:id", [isAuthenticated, remove]);
}
