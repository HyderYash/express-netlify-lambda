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
  res.status(200).json({ message: "Working...", IMPORT_RUNNING: retVal });
});

router.get("/listallskus", async (req, res) => {
  helper.logger("Fetching Access Token...");
  await helper.getCommerceLayerAccessToken();
  helper.logger("Access Token fetched...");
  const retVal = await helper.listAllSKUS();
  res.status(200).json({ message: "Working...", SKUS: retVal });
});

app.use("/.netlify/functions/app", router);

module.exports.handler = serverless(app);
