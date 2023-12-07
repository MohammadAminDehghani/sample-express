import express, { Router } from "express";
import User from "./../../app/models/user";

const router: Router = express.Router();

//controllers
import {
  index as indexUserController,
  store as storeUserController,
  show as showUserController,
  edit as editUserController,
  update as updateUserController,
  destroy as destroyUserController,
} from "./../../app/http/controllers/api/admin/userController";

import {
    index as indexArticleController,
    store as storeArticleController,
    show as showArticleController,
    edit as editArticleController,
    update as updateArticleController,
    destroy as destroyArticleController,
  } from "./../../app/http/controllers/api/admin/articleController";

//validators
//import articleValidator from 'app/http/validators/admin/articleValidator';

/////////////////////    user routes   //////////////////////////////////
router.get("/users", indexUserController);
// router.get('/users/create', index);
router.post("/users", storeUserController);
router.get("/users/:id", showUserController);
router.get("/users/:id/edit", editUserController);
router.post("/users/:id/update", updateUserController);
router.delete("/users/:id/delete", destroyUserController);

/////////////////////    article routes   //////////////////////////////////
router.get("/articles", indexArticleController);
// router.get('/users/create', index);
router.post("/articles", storeArticleController);
router.get("/articles/:id", showArticleController);
router.get("/articles/:id/edit", editArticleController);
router.post("/articles/:id/update", updateArticleController);
router.delete("/articles/:id/delete", destroyArticleController);

export default router;
