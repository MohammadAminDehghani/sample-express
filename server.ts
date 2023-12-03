// Add the root project directory to the app module search path:
require('app-module-path').addPath(__dirname);

import dotenv from 'dotenv'; 

dotenv.config();  // Load environment variables from .env file 
const appName = process.env.My_APP_Name;  // Retrieve the environment variable 
console.log('API Key!:', appName);  // Use the environment variable as needed

const App = require('./app/index')
new App();


