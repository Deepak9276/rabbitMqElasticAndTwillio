const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./GraphQl/studentSchema");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
console.log(numCPUs);

//Cluster Making
if (cluster.isMaster) {
  // Master process logic
  console.log(`Master ${process.pid} is running`);

  // Fork workers (one for each CPU core)
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  // Listen for worker exit event and respawn a new one if needed
  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died. Respawning...`);
    cluster.fork();
  });
} else {
  console.log(`Worker ${process.pid} started`);
  const router = require("./routes");
  // require('./Crons/studentCron');

  require("dotenv").config();

  function mongoConnection() {
    const MONGODB_URL = process.env.MONGODB_URL;
    mongoose
      .connect(MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB connected successfully!"))
      .catch((err) => console.log("MongoDB connection error:", err));
  }
  mongoConnection();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors());

  // GraphQL endpoint
  app.use(
    "/graphql",
    graphqlHTTP({
      schema,
      graphiql: true, // Enable GraphiQL interface
    })
  );

  app.use("/api", router);
  app.listen("3000", () => {
    console.log("http://localhost:3000");
  });
}
