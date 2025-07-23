require("dotenv").config();
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const ingredientsRouter = require("./routes/ingredients");
const macrosRouter = require("./routes/macronutrients");

const app = express();
const tf = require("@tensorflow/tfjs-converter");
const fs = require("node:fs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api", ingredientsRouter);
app.use("/api", macrosRouter);

const customIOHandler = {
  load: async function () {
    // Load and parse model.json
    const modelJSON = JSON.parse(fs.readFileSync("./model/model.json", "utf8"));

    // Load binary weight files listed in model.json
    const weightDataBuffers = modelJSON.weightsManifest[0].paths.map((p) => {
      const fullPath = path.join("./model/", p);
      return fs.readFileSync(fullPath);
    });

    const weightData = Buffer.concat(weightDataBuffers);
    // console.log(weightData);

    return {
      modelTopology: modelJSON.modelTopology,
      weightSpecs: modelJSON.weightsManifest[0].weights,
      weightData: weightData,
    };
  },
};

customIOHandler.load();

async function foo() {
  const model = await tf.loadGraphModel(customIOHandler);
}

foo();

module.exports = app;
