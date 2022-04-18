import {Application} from "express";

import {isAuthenticated} from "../auth/authenticated";
import {findAll, findByCode, save, update, remove} from "./controller";

export function routesConfig(app: Application) {
  app.get("/products", [isAuthenticated, findAll]);

  app.get("/products/:code", [isAuthenticated, findByCode]);

  app.post("/products", [isAuthenticated, save]);

  app.put("/products/:id", [isAuthenticated, update]);

  app.delete("/products/:id", [isAuthenticated, remove]);
}
