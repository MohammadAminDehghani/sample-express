import express, {
  Express,
  Request,
  Response,
  Application,
  application,
  Router,
} from "express";

import * as http from "http";
import mongoose from "mongoose";
import config from "../config";
import cors from 'cors';

import indexRouter from "../routes";

const app: Application = express();
const port = process.env.PORT || 3001;

module.exports = class Application {
  constructor() {
    this.configServer();
    this.configDatabase();
    this.setConfig();
    this.setRoutes();
  }

  configServer() {


    app.use(
      cors({
        origin: 'http://localhost:3000', // Replace with the origin of your front-end application
        credentials: true, // Allow credentials (cookies) to be sent
      })
    );

    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  }

  configDatabase() {
    //global.AbortControllerPromise = mongoose.Promise;
    console.log(config.databaseConfig.url);
    mongoose.connect(config.databaseConfig.url);

    // Listen for the 'connected' event
    mongoose.connection.on("connected", () => {
      console.log("Connected to the database");
    });

    // Listen for the 'error' event
    mongoose.connection.on("error", (err) => {
      console.error("Failed to connect to the database:", err);
    });
  }

  setConfig() {}

  setRoutes() {


    // app.use(cors());
    app.use(indexRouter);
    

    app.get("/", (req: Request, res: Response) => {
      res.send("Welcome to Express & TypeScript Server");
    });

    app.get("/test", (req: Request, res: Response) => {
      res.send("Welcome to Test page");
    });
  }
};
