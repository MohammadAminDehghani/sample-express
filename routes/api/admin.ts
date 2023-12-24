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

  import {
    index as indexCategoryController,
    store as storeCategoryController,
    show as showCategoryController,
    edit as editCategoryController,
    update as updateCategoryController,
    destroy as destroyCategoryController,
  } from "./../../app/http/controllers/api/admin/categoryController";

  import {
    index as indexTagController,
    store as storeTagController,
    show as showTagController,
    edit as editTagController,
    update as updateTagController,
    destroy as destroyTagController,
    searchTagsByString as searchTagController,
  } from "./../../app/http/controllers/api/admin/tagController";

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
// router.get('/articles/create', index);
router.post("/articles", storeArticleController);
router.get("/articles/:id", showArticleController);
router.get("/articles/:id/edit", editArticleController);
router.post("/articles/:id/update", updateArticleController);
router.delete("/articles/:id/delete", destroyArticleController);

/////////////////////    category routes   //////////////////////////////////
router.get("/categories", indexCategoryController);
// router.get('/categories/create', index);
router.post("/categories", storeCategoryController);
router.get("/categories/:id", showCategoryController);
router.get("/categories/:id/edit", editCategoryController);
router.post("/categories/:id/update", updateCategoryController);
router.delete("/categories/:id/delete", destroyCategoryController);

/////////////////////    tag routes   //////////////////////////////////
router.get("/tags", indexTagController);
// router.get('/tags/create', index);
router.post("/tags", storeTagController);
router.get("/tags/:id", showTagController);
router.get("/tags/:id/edit", editTagController);
router.post("/tags/:id/update", updateTagController);
router.delete("/tags/:id/delete", destroyTagController);
router.get("/tags/:query/search", searchTagController);

export default router;
