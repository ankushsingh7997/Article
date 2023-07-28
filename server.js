const express = require('express');
const http = require('http');
const cluster = require('cluster');
const os = require('os');
const helmet = require('helmet');
const morgan = require('morgan');
const { dbConnection } = require('./src/db/dbConnection');
const route = require('./src/routes/router');
require('dotenv').config();
const PORT = process.env.PORT || 4000;

if (cluster.isMaster) {
  // Fork workers based on the number of CPU cores
  const numCPUs = os.cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Replace the dead worker
    cluster.fork();
  });
} else {
  const app = express();

  // middlewares
  app.use(express.json());
  app.use(helmet());
  app.use(morgan('dev'));

  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

  // db connection
  dbConnection();

  // test
  app.get('/', function (req, res) {
    return res.status(200).send({ status: true, message: 'working fine 🚀 🚀 🚀' });
  });

  app.use('/', route);

  // Start the server using http module instead of app.listen
  const server = http.createServer(app);
  server.listen(PORT, () => {
    console.log(`Worker ${process.pid} is running on ${PORT} 🟢`);
  });
}
