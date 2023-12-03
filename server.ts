// Add the root project directory to the app module search path:
require('app-module-path').addPath(__dirname);

import dotenv from 'dotenv'; 

dotenv.config();  // Load environment variables from .env file 

const App = require('./app/index')
new App();


