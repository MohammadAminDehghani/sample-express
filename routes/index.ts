import { Router, RequestHandler } from 'express';
import webRoutes from './web/index';
import apiRoutes from './api/index';
import webMiddleware from './middleware/web/index';
import apiMiddleware from './middleware/api/index';
import AuthWebMiddleware from './middleware/web/auth';
import AuthApiMiddleware from './middleware/api/auth';


const indexRouter: Router = Router();

indexRouter.use('/', webMiddleware.handle as RequestHandler, webRoutes);
indexRouter.use('/api', apiMiddleware.handle as RequestHandler, apiRoutes);

// Public web routes
// const publicWebRoutes = Router();
// publicWebRoutes.use('/', webMiddleware.handle, webRoutes);

// // Protected web routes
// const protectedWebRoutes = Router();
// protectedWebRoutes.use('/', AuthWebMiddleware.handle as RequestHandler);
// protectedWebRoutes.use('/', webRoutes);

// // Public API routes
// const publicApiRoutes = Router();
// publicApiRoutes.use('/api', apiMiddleware.handle, apiRoutes);

// // Protected API routes
// const protectedApiRoutes = Router();
// protectedApiRoutes.use('/api', AuthApiMiddleware.handle as RequestHandler, apiRoutes);

export default indexRouter;