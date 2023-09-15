const process = require("process");
const mongoose = require("mongoose");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("UNCAUGHT EXPRESSION, SHUTTING DOWN ....");
  process.exit(1);
});

const app = require("./app");
const port = process.env.PORT || 5050;

const URI = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection established");
  });

const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UNHANDLED REJECTION SHUTTING DOWN......");
  server.close(() => {
    process.exit(1);
  });
});
