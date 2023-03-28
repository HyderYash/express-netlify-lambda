const fetch = require("node-fetch").default;

export const handler = async () => {
  const baseUrl =
    "https://incredible-cocada-df49b8.netlify.app/.netlify/functions/app/listallskus";
  const response = await fetch(baseUrl, {
    method: "GET",
  })
    .then((res) => res.json())
    .catch((err) => console.error(err));
  console.log(response);
  return {
    statusCode: 200,
    body: JSON.stringify(response),
  };
};
