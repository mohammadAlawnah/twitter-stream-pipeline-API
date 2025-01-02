import 'dotenv/config'
import express from 'express'
const app = express();
import { initApp } from './src/app.js';
import bodyParser from 'body-parser';
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

initApp(app,express)
  
app.listen(PORT, () => {
    console.log(`server is running .... port ${PORT}`);
});
  