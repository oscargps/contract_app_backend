import express from 'express';
import healthRouter from './modules/core/router/health.router';
const app = express();
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use('/',healthRouter );


app.listen(3000, () => {
  console.log('Server listening in port 3000');
});