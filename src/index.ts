import express from 'express';
import healthRouter from './modules/core/router/health.router';
import { getVariable } from './config';
import catalogRouter from './modules/contracts/router/catalog.router';
import contractRouter from './modules/contracts/router/contract.router';
var debug = require('debug')('contractApp:launchServer');


(async () => {
  try {
    const port = await getVariable('PORT');
    const app = express();
    app.use(express.json()) // for parsing application/json
    app.use(express.urlencoded({ extended: true }))
    app.use('/', healthRouter);
    app.use('/catalogs', catalogRouter);
    app.use('/contracts', contractRouter);

    app.set('port', port);
    debug(`Port set to ${port}`);

    debug('Server created');


    app.listen(port);
  } catch (error) {
    debug(`[ERROR] Could not start application: ${error}`);
  }
})();