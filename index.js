import 'dotenv/config';
import express from 'express';
import { initApp } from './src/app.js';
import bodyParser from 'body-parser';
import { Client } from '@elastic/elasticsearch';
import tweetModel from './DB/model/tweet.model.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
initApp(app, express);

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

export default async function handler(req, res) {
  if (req.method === 'GET') {
    res.status(200).json({ message: 'Server is running and connected to Elasticsearch' });
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }

  testConnection();
}
