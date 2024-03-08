const express = require('express')
require('dotenv').config()
const app = express()
const bodyParser = require('body-parser');
const {MongoClient,ObjectId} = require('mongodb');
const URL = process.env.url;
app.use(bodyParser.json());

async function main() {
  const client = await MongoClient.connect(URL);
  const db = client.db('todoDb');
  const c = await db.collection('todos');
  console.log('MongoDB bağlantısı başarıyla gerçekleştirildi.');
  return c
}

let collection; // collection değişkenini genel kapsama taşı

main().then((result) => {
    collection = result; // main fonksiyonundan dönen collection değişkenini atama
});

app.post("/todos" , async function(req,res){
    console.log(req.body)
    const result = await collection.insertOne(req.body);
    res.send(result)
})

app.get('/todos', async function (req, res) {
    const result = await collection.find().toArray();
    res.send(result)
})

app.delete("/todos/:id", async function(req,res){
    const id =  req.params.id.substring(1)
    console.log(id)
    let sorgu = {_id:new ObjectId(id)}
    const result = await collection.deleteOne(sorgu);
    res.send(result)

})

app.put("/todos/:id", async function(req,res){
    const id =  req.params.id.substring(1)
    let sorgu = {_id:new ObjectId(id)}
    let yeniDeger = { $set: { todo: req.body.todo} };
    const result = await collection.updateOne(sorgu,yeniDeger);
    res.send(result)
})

app.listen(3000)