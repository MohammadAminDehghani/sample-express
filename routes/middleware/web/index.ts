import { Request, Response, NextFunction } from 'express';
import Middleware from './../middleware';

class WebMiddleware extends Middleware {
    constructor() {
        super(); // Call the constructor of the parent class
        this.handle = this.handle.bind(this); // Bind the handle method to the current instance
    }

    handle(req: Request, res: Response, next: NextFunction) {
        next();
    }
}

export default new WebMiddleware();