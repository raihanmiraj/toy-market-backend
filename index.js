let express = require("express")
let cors = require("cors")

let json = require("./test.json")
let app = express();
app.use(cors())
app.use(express.json())
let port = process.env.PORT || 5000;
// let { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// let uri = "mongodb+srv://raihanmiraj:Bangladesh123@cluster0.dhnvk0f.mongodb.net/?retryWrites=true&w=majority";
// let users = []; 
// let client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//       client.connect();
//     await client.db("toy_market").command({ ping: 1 });
//     let database = client.db("toy_market");
//     let toyGallery = database.collection("gallery")
//     let toys = database.collection("toys")
//     app.get("/gallery", async (req, res) => {
//       let cursor = toyGallery.find();
//       let result = await cursor.toArray();
//       res.send(result)
//     })

//     app.get("/search/:search", async (req, res) => {
//       let cursor = toys.find({
//         toyname:
//           { $regex: req.params.search, $options: "i" }
//       });
//       let result = await cursor.toArray();
//       res.send(result);

//     });

//     app.get("/toys", async (req, res) => {
//       let cursor = toys.find();
//       let result = await cursor.toArray();
//       res.send(result);

//     });

//     app.get("/toys/:limit", async (req, res) => {
//       let cursor = toys.find();
//       let result = await cursor.limit(parseInt(req.params.limit)).toArray();
//       res.send(result);

//     });

//     app.get("/toy/:toyid", async (req, res) => {
//       let toyid = req.params.toyid
//       let cursor = toys.findOne({ _id: new ObjectId(toyid) });
//       let result = await cursor
//       res.send(result)
//     })


//     app.get("/mytoys/:email", async (req, res) => {
//       let cursor = toys.find({ selleremail: req.params.email });
//       let result = await cursor.toArray();
//       res.send(result);

//     });


//     app.put("/toy/update/:id", async (req, res) => {
//       let updateId = req.params.id
//       let filter = {
//         _id: new ObjectId(updateId)
//       }
//       let options = { upsert: true };
//       let updateDoc = {
//         $set: {
//           ...req.body
//         },
//       };
//       let result = await toys.updateOne(filter, updateDoc, options);
//       res.send(JSON.stringify(result))
//     })

// app.delete("/delete/:id", async (req, res) => {

//       let deleteId = req.params.id
//       let query = {
//         _id: new ObjectId(deleteId)
//       }

//       let deleteData = await toys.deleteOne(query);
//       if (deleteData.deletedCount == 1) {
//         let indexToDelete = users.findIndex(item => item._id == deleteId);
//         if (indexToDelete > -1) {
//           users.splice(indexToDelete, 1);
//         }
//         res.send("Succesfully Deleted")
//       } else {
//         res.send(" Deleted Failed")

//       }

//     })


//    app.post("/addtoy", async (req, res) => {
//       let data = { ...req.body }; 
//      let result = await toys.insertOne(data)
//       res.send(JSON.stringify(result))
//     })

 
//     app.get("/mytoys/aesc/:email", async (req, res) => {
//       let cursor = toys.find({ selleremail: req.params.email }).sort({ price: 1 });
//       let result = await cursor.toArray();
//       res.send(result);
//     });
//     app.get("/mytoys/desc/:email", async (req, res) => {
//       let cursor = toys.find({ selleremail: req.params.email }).sort({ price: -1 });
//       let result = await cursor.toArray();
//       res.send(result);
//     });

 

//   } finally { 
//     await client.close();
//   }
// }
// run().catch(console.dir);




app.get("/hello", (req, res) => {
  res.send("hello")
})






app.get("/", (req, res) => {
  res.send("user server running")
})


app.listen(port, () => {
  console.log(`server is running on port ${port}`)
})