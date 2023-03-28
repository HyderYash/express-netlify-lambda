require("dotenv").config();
const express = require("express");
const serverless = require("serverless-http");
const Helper = require("./helpers/helper");
const helper = new Helper();
const app = express();
const router = express.Router();

router.get("/", async (req, res) => {
  helper.logger("Fetching Access Token...");
  await helper.getCommerceLayerAccessToken();
  helper.logger("Access Token fetched...");
  const retVal = await helper.checkImportStatus();
  res
    .status(200)
    .json({
      message: "Working...",
      DATETIME: new Date(),
      IMPORT_RUNNING: retVal,
    });
});

router.get("/listallskus", async (req, res) => {
  helper.logger("Fetching Access Token...");
  await helper.getCommerceLayerAccessToken();
  helper.logger("Access Token fetched...");
  const retVal = await helper.listAllSKUS();
  res
    .status(200)
    .json({ message: "Working...", DATETIME: new Date(), SKUS: retVal });
});

app.use("/.netlify/functions/app", router);

if (process.env.NODE_ENV === "development") {
  app.listen(3000, () => {
    console.log("SERVER IS LISTENING ON http://localhost:3000");
  });
} else {
  module.exports.handler = serverless(app);
}
