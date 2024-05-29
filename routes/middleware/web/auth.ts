import { Request, Response, NextFunction } from "express";
import Middleware from "./../middleware";
import config from "../../../config";

import jwt, { JwtPayload } from "jsonwebtoken";

// import property user to request for line:
// req.user = decoded as JwtPayload;
import "./../../../app/types/addUser";

class AuthWebMiddleware extends Middleware {
  constructor() {
    super(); // Call the constructor of the parent class
    this.handle = this.handle.bind(this); // Bind the handle method to the current instance
  }

  handle(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ error: "No token provided" });
    }

    jwt.verify(token, config.jwt.secretKey, (err, decoded) => {
      if (err) {
        return res.status(403).json({ error: "Failed to authenticate token" });
      }
      req.user = decoded as JwtPayload;
      next();
    });
  }
}

export default new AuthWebMiddleware();