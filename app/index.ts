import express, {
  Express,
  Request,
  Response,
  Application,
  application,
  Router,
} from "express";

import * as http from "http";

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
    const server = http.createServer(app);

    server.listen(port, () => {
      console.log(`Server is Fire at http://localhost:${port}`);
    });
  }

  configDatabase() {}

  setConfig() {}

  setRoutes() {
    app.get("/", (req: Request, res: Response) => {
      res.send("Welcome to Express & TypeScript Server");
    });

    app.get("/test", (req: Request, res: Response) => {
      res.send("Welcome to Test page");
    });
  }
};
