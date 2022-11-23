const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const morgan = require("morgan");
require("dotenv").config();
require("colors");

const app = express();
const port = process.env.PORT || 3000;

app.use(morgan("dev"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === "development" ? true : false,
  })
);

app.listen(port, () =>
  console.log(`Server is running on http://localhost:${port}`.cyan.underline)
);
