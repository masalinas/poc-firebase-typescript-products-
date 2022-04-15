import { Application } from "express";

import { create, all, get, patch, remove } from "./controller";
import { isAuthenticated } from "../auth/authenticated";
import { isAuthorized } from "../auth/authorized";

export function routesProductsConfig(app: Application) {
    app.post('/api/products',
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        create
    );

    app.get('/api/products', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'] }),
        all
    ]);

    app.get('/api/products/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        get
    ]);

    app.patch('/api/products/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        patch
    ]);
    
    app.delete('/api/products/:id', [
        isAuthenticated,
        isAuthorized({ hasRole: ['admin', 'manager'], allowSameUser: true }),
        remove
    ]);
}