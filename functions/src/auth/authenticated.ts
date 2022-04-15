import { Request, Response } from "express";

export async function isAuthenticated(req: Request, res: Response, next: Function) {
    const { authorization } = req.headers

    if (!authorization)
        return res.status(401).send({ message: 'Unauthorized' });

    if (!authorization.startsWith('Bearer'))
        return res.status(401).send({ message: 'Unauthorized' });

    const split = authorization.split('Bearer ')
    if (split.length !== 2)
        return res.status(401).send({ message: 'Unauthorized' });

    const token = split[1]

    try {            
        console.log("decodedToken", JSON.stringify(token))
        
        if (token !== 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJNYW5nbyIsIlVzZXJuYW1lIjoib3duZXIiLCJpYXQiOjE2NDg4MzA3NzJ9.-2fEbjElWdNT4FW6e19HmxuteUALN1dxXEyCF9BuFQg')
            return res.status(401).send({ message: 'Unauthorized' });
        
        return next();
    }
    catch (err) {
        console.error(`${err.code} -  ${err.message}`)
        return res.status(401).send({ message: 'Unauthorized' });
    }
}