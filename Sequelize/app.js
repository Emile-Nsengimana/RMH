import 'regenerator-runtime';
import express from 'express';
import bodyParser from 'body-parser';
import routes from './src/route/router';
import cors from 'cors';

const app = express(); // setup express application

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(routes);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server running at ${port}`);
});

export default app;
