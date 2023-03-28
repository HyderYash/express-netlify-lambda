const { schedule } = require("@netlify/functions");

const fetch = require("node-fetch").default;

const handler = async () => {
  const baseUrl =
    "https://incredible-cocada-df49b8.netlify.app/.netlify/functions/app/listallskus";
  const response = await fetch(baseUrl, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
exports.handler = schedule("*/1 * * * *", handler);
