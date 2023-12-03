import express, { Router } from 'express';
const router: Router = express.Router();

import adminRoutes from './admin';
import panelRoutes from './panel';
import publicRoutes from './public';
import authRoutes from './auth';

//middlewares
// import redirectAuthenticated from 'app/http/middleware/redirectAuthenticated';
// import adminAuthCheck from 'app/http/middleware/adminAuthCheck';
// import checkRegularErrors from 'app/http/middleware/checkRegularErrors';

router.use('/', publicRoutes);
router.use('/admin', adminRoutes);
router.use('/panel', panelRoutes);
router.use('/auth', authRoutes);

// router.all('*', checkRegularErrors.handle)
// router.use(checkRegularErrors.handle)

export default router;