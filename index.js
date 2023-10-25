const express = require("express");
const cors = require("cors");

const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 5000;

// Username - souravbera515
// Password - Rs2klsMjrJZ1VuVl

// app.get("/",(req,res)=>{
//     res.send("Hello world");
// })

// Mongo DB

const uri = "mongodb+srv://souravbera515:Rs2klsMjrJZ1VuVl@cluster0.i71kgai.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Create Collection services
    const col = await client.db("car-doctor").collection("services");

    app.get("/services",async(req,res)=>{
        let result = await col.find().toArray();
        console.log(result);
        res.send(result); 
    })

    // Create Collection Checkout 

    const colCheckout = await client.db("car-doctor").collection("checkout");

    // Insert Checkout Data
    app.post("/checkout",async(req,res)=>{
        const body = req.body;
        //console.log(body);
        const result = await colCheckout.insertOne(body);
        console.log(result);
        res.send(result);
    })

    // Read Checkout Data

    app.post("/checkoutdata",async(req,res)=>{
        const username = req.body.username;
        console.log(username);
        const result  = await colCheckout.findOne({userId:username})
        console.log(result);
        res.send(result);

    })


    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.listen(PORT,()=>{
    console.log("app is listening on port "+PORT);
})