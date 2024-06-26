import express, { Router } from 'express';
const router: Router = express.Router();

//controllers
import {
    register as registerAuthController,
    login as loginAuthController,
    resetPassword as resetPasswordAuthController,
  } from "../../app/http/controllers/api/auth/authController";

//controllers
//import articleController from 'app/http/controllers/admin/articleController';

//validators
//import articleValidator from 'app/http/validators/admin/articleValidator';

/////////////////////    article routes   //////////////////////////////////
router.post('/register', registerAuthController);
router.post('/login', loginAuthController);
router.post('/rest-password', resetPasswordAuthController);
// router.get('/articles', articleController.index);
// router.get('/article/:id/show', articleController.show);

// router.get('/article/create', articleController.create);
// router.post('/article', articleValidator.handle(), articleController.post);

// router.get('/article/:id/edit', articleController.edit);
// router.post('/article/:id', articleValidator.handle(), articleController.update);

// router.post('/article/:id', articleController.delete);

export default router;