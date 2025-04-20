const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
require("dotenv").config(); //configure dotenv

// console.log(process.env.DB_USER)
// console.log(process.env.DB_PASSWORD)

//Middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Gardener Connect API!");
});

app.listen(port, () => {
  console.log(`Server is running on PORT: http://localhost:${port}`);
});

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const uri = `mongodb+srv://${user}:${password}@main-cluster.t0sqgn6.mongodb.net/?retryWrites=true&w=majority&appName=main-cluster`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const userCollection = client.db("userDB").collection("users");
const eventCollection = client.db("eventDB").collection("events");
const gardenerCollection = client.db("gardenerDB").collection("gardeners");
const tipsCollection = client.db("tipDB").collection("tips");

// USER PART:
// Create a user (Create)
app.post("/users", async (req, res) => {
  const newUser = req.body;
  // console.log(newUser);
  const result = await userCollection.insertOne(newUser);
  res.send(result);
});

// Get All user info (Read)
app.get("/users", async (req, res) => {
  const result = await userCollection.find().toArray();
  res.send(result);
});

// Get user logged info (Update)
app.patch("/users/login", async (req, res) => {
  const { email, lastSignInTime } = req.body;
  // console.log(email, lastSignInTime)
  const filter = { email: email };
  const updateDoc = {
    $set: {
      lastSignInTime: lastSignInTime,
    },
  };
  const result = await userCollection.updateOne(filter, updateDoc);
  res.send(result);
});

// Update partial user info (Update)
app.patch("/users/update-profile", async (req, res) => {
  const { name, photo } = req.body;
  // console.log(name, photo)
  const filter = { photo: photo };
  const updateDoc = {
    $set: {
      name: name,
      photo: photo,
    },
  };
  const result = await userCollection.updateOne(filter, updateDoc);
  res.send(result);
});

//EVENTS PART:
// Get all events data
app.get("/events", async (req, res) => {
  const result = await eventCollection.find().toArray();
  // console.log(result)
  res.send(result);
});

//GARDENER PART:
// Get all genders data
app.get("/gardeners", async (req, res) => {
  const result = await gardenerCollection.find().toArray();
  // console.log(result)
  res.send(result);
});
// Get featured genders data
app.get("/featured-genders", async (req, res) => {
  const result = await gardenerCollection
    .find({ status: "Active" })
    .limit(6)
    .toArray();
  // console.log(result)
  res.send(result);
});

//TIPS PART:
//Get all tips data
app.get("/tips", async (req, res) => {
  const result = await tipsCollection.find().sort({ difficulty: 1 }).toArray();
  // console.log(result)
  res.send(result);
});

//Get a single tip data
app.get("/tips/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const filter = { _id: new ObjectId(id) };
  const result = await tipsCollection.findOne(filter);
  // console.log(result)
  res.send(result);
});

//Get Trending Tip data
app.get("/trending-tips", async (req, res) => {
  const result = await tipsCollection
    .find({ availability: "Public" })
    .sort({ totalLiked: -1 })
    .limit(6)
    .toArray();
  res.send(result);
});

//Create a tips data
app.post("/add-tip", async (req, res) => {
  const tipInfo = req.body;
  // console.log(tipInfo)
  const result = await tipsCollection.insertOne(tipInfo);
  res.send(result);
});

//Get all user tips data
app.get("/my-tips", async (req, res) => {
  const email = req.query.email;
  // console.log(email)
  const result = await tipsCollection.find({ userEmail: email }).toArray();
  res.send(result);
});

//Delete a user tip data
app.delete("/my-tips/:id", async (req, res) => {
  const id = req.params.id;
  // console.log(id)
  const filter = { _id: new ObjectId(id) };
  const result = await tipsCollection.deleteOne(filter);
  res.send(result);
});

//Update tip like
app.patch("/tip-details/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const { newLikes } = req.body;
  // console.log(newLikes, id)
  const updateDoc = {
    $set: {
      totalLiked: newLikes,
    },
  };
  const result = await tipsCollection.updateOne(filter, updateDoc);
  // console.log(result)
  res.send(result);
});

//Update partial user tip
app.patch("/my-tips/:id/update", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const { title,
    plantType,
    difficulty,
    description,
    imageUrl,
    category,
    availability,
  } = req.body;
  const updateDoc = {
    $set: {
      title: title,
      plantType: plantType,
      difficulty: difficulty,
      description: description,
      imageUrl: imageUrl,
      category: category,
      availability: availability,
    },
  };
  const result = await tipsCollection.updateOne(filter, updateDoc);
  res.send(result);
});