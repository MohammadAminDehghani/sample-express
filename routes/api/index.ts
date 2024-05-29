import express, { Router, RequestHandler } from "express";
const router: Router = express.Router();

import adminRoutes from "./admin";
import panelRoutes from "./panel";
import publicRoutes from "./public";
import authRoutes from "./auth";

//middlewares
import AuthApiMiddleware from "./../middleware/api/auth";
// import adminAuthCheck from 'app/http/middleware/adminAuthCheck';
// import checkRegularErrors from 'app/http/middleware/checkRegularErrors';

router.use("/", publicRoutes);
router.use("/admin", AuthApiMiddleware.handle as RequestHandler, adminRoutes);

router.use("/panel", panelRoutes);
router.use("/auth", authRoutes);

// router.all('*', checkRegularErrors.handle)
// router.use(checkRegularErrors.handle)

export default router;
