import 'dotenv/config'
import express from 'express'
const app = express();
import { initApp } from './src/app.js';
import bodyParser from 'body-parser';
app.use(bodyParser.json());
const PORT = process.env.PORT || 3001;

initApp(app,express)

import  {Client } from '@elastic/elasticsearch';
import tweetModel from './DB/model/tweet.model.js';



export const client = new Client({
    node: 'https://bdab407b152a42d59c48e800b3ecd638.us-central1.gcp.cloud.es.io:443',
    auth: {
      username: 'elastic',
      password: '4BPva9H5To7r0KsYu8jxXDr9'
    }
  });
  
  async function testConnection() {
    try {
      const response = await client.info();
      console.log('Connected to Elasticsearch:', response);
    } catch (error) {
      console.error('Error connecting to Elasticsearch:', error);
    }
  }
  

  
  app.listen(PORT, () => {
    console.log(`server is running .... port ${PORT}`);
    testConnection();
  });
  