import 'babel-polyfill';
import * as path from 'path';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/config';
import log from './services/Logging';

import PriceRoutes from './routes/PriceRoutes';

mongoose.Promise = global.Promise;
mongoose.connect(
  config.mongoURI,
  { useMongoClient: true },
  err => {
    if (err) log.error(err);
    else {
      console.log('MongoDB connected!');
      process.on('SIGINT', () => {
        console.log('Bye bye!');
        process.exit();
      });
    }
  }
);

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// BACKEND ROUTES
app.use('/api/prices', PriceRoutes);

// test route
app.get('/test', (req, res) => {
  res.status(200).send({ result: 'GET: /test' });
});

// FRONTEND
app.use(express.static('client/build'));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});

app.listen(config.port, () => {
  console.log(`Server running (port: ${config.port})`);
});

process.on('SIGINT', () => {
  console.log('Bye bye!');
  process.exit();
});
