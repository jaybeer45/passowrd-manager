const express = require('express')
const app = express()
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
const cors = require('cors')
const bodyParser = require('body-parser')



dotenv.config();
// Connection URL
const url = 'mongodb://localhost:27017/';
const client = new MongoClient(url);

// Database Name
const dbName = 'password';
const port = 3000
app.use(bodyParser.json())
app.use(cors())

client.connect();

//get All Passwords
app.get('/', async (req, res) => {
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.find({}).toArray();
  res.json(findResult)
})

// Save all password
app.post('/', async (req, res) => {
  const password = req.body;
  const db = client.db(dbName);
  const collection = db.collection('passwords');
  const findResult = await collection.insertOne(password);
  res.send({ success: true, result : findResult})
})

// Delete a password
app.delete("/", async (req, res) => {
  const { id } = req.body; // id nikaalo
  const db = client.db(dbName);
  const collection = db.collection("passwords");

  const result = await collection.deleteOne({ id: id });
  res.send({ success: true, result });
}); 

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})