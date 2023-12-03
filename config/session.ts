import mongoose from 'mongoose';
import session, { SessionOptions } from 'express-session';
import MongoStore from 'connect-mongo';


//todo : ghesmat store nabayad comment bashe, error midad felan commant kardam
const sessionConfig: SessionOptions = {
  secret: 'amin-agha',
  resave: true,
  saveUninitialized: true,
//   store: new MongoStore({
//     mongooseConnection: mongoose.connection,
//   }),
  cookie: { secure: false }, // it's true on https
};

export default sessionConfig;