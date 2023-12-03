import { Router, RequestHandler } from 'express';
import webRoutes from './web/index';
import apiRoutes from './api/index';
import webMiddleware from './middleware/web/index';
import apiMiddleware from './middleware/api/index';

const indexRouter: Router = Router();

indexRouter.use('/', webMiddleware.handle as RequestHandler, webRoutes);
indexRouter.use('/api', apiMiddleware.handle as RequestHandler, apiRoutes);

export default indexRouter;