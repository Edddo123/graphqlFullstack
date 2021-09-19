const express = require("express");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const schema = require("./schema/schema");

const app = express();

app.use(cors({}));

app.use("/graphql", (req, res) =>
  graphqlHTTP({
    graphiql: true,
    schema,
  })(req, res)
);

app.get("/cookie", (req, res) => {
  res.cookie("myCook", "hey");
  res.send("done");
});

mongoose.connect("mongodb://localhost:27017/graphqlMongoose", () => {
  app.listen(4002, () => {
    console.log("listening on 4002");
  });
});
