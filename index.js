const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

const json = require("./test.json");

const app = express();
const corsConfig = {
  origin: '',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};

app.use(cors(corsConfig));
app.options("", cors(corsConfig));
app.use(express.json());

const port = process.env.PORT || 5000;
const uri = "mongodb+srv://raihanmiraj:Bangladesh123@cluster0.dhnvk0f.mongodb.net/?retryWrites=true&w=majority";

let client;

async function run() {
  try {
    client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    await client.connect();
    await client.db("toy_market").command({ ping: 1 });

    const database = client.db("toy_market");
    const toyGallery = database.collection("gallery");
    const toys = database.collection("toys");

    app.get("/gallery", async (req, res) => {
      const cursor = toyGallery.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/search/:search", async (req, res) => {
      const cursor = toys.find({
        toyname: { $regex: req.params.search, $options: "i" }
      });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/toys", async (req, res) => {
      const cursor = toys.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/toys/:limit", async (req, res) => {
      const cursor = toys.find();
      const result = await cursor.limit(parseInt(req.params.limit)).toArray();
      res.send(result);
    });

    app.get("/toy/:toyid", async (req, res) => {
      const toyid = req.params.toyid;
      const cursor = toys.findOne({ _id: new ObjectId(toyid) });
      const result = await cursor;
      res.send(result);
    });

    app.get("/mytoys/:email", async (req, res) => {
      const cursor = toys.find({ selleremail: req.params.email });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.put("/toy/update/:id", async (req, res) => {
      const updateId = req.params.id;
      const filter = {
        _id: new ObjectId(updateId)
      };
      const options = { upsert: true };
      const updateDoc = {
        $set: { ...req.body }
      };
      const result = await toys.updateOne(filter, updateDoc, options);
      res.send(JSON.stringify(result));
    });

    app.delete("/delete/:id", async (req, res) => {
      const deleteId = req.params.id;
      const query = {
        _id: new ObjectId(deleteId)
      };
      const deleteData = await toys.deleteOne(query);
      if (deleteData.deletedCount === 1) {
        const indexToDelete = users.findIndex(item => item._id == deleteId);
        if (indexToDelete > -1) {
          users.splice(indexToDelete, 1);
        }
        res.send("Successfully Deleted");
      } else {
        res.send("Delete Failed");
      }
    });

    app.post("/addtoy", async (req, res) => {
      const data = { ...req.body };
      const result = await toys.insertOne(data);
      res.send(JSON.stringify(result));
    });

    app.get("/mytoys/aesc/:email", async (req, res) => {
      const cursor = toys.find({ selleremail: req.params.email }).sort({ price: 1 });
      const result = await cursor.toArray();
      res.send(result);
    });

    app.get("/mytoys/desc/:email", async (req, res) => {
      const cursor = toys.find({ selleremail: req.params.email }).sort({ price: -1 });
      const result = await cursor.toArray();
      res.send(result);
    });
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } 
  catch (error) {
    console.error("Error occurred while connecting to MongoDB:", error);
    process.exit(1); // Exit the process with a non-zero status code to indicate failure
  }
  finally {
    await client.close();
  }
}

run().catch(console.dir);

app.get("/hello", (req, res) => {
  res.send("hello");
});

app.get("/", (req, res) => {
  res.send("user server running");
});



module.exports = app;
