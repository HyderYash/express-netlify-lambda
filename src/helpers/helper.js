const fetch = require("node-fetch").default;

class Helper {
  getCommerceLayerAccessToken = async () => {
    try {
      await fetch(`${process.env.CL_BASE_ENDPOINT}/oauth/token`, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({
          grant_type: "client_credentials",
          client_id: process.env.CL_CLIENT_ID,
          client_secret: process.env.CL_CLIENT_SECRET,
        }),
      }).then(async (response) => {
        let { access_token } = await response.json();
        this.accessToken = access_token;
      });
    } catch (err) {
      throw err;
    }
  };
  clAuthHeader = (additionalHeaders = "") => {
    const authHeaders = {
      headers: {
        Accept: "application/vnd.api+json",
        Authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/vnd.api+json",
      },
    };
    if (additionalHeaders !== "") {
      authHeaders.headers[Object.keys(additionalHeaders)[0]] =
        Object.values(additionalHeaders)[0];
    }
    return authHeaders.headers;
  };

  logger = (msg = "", msgColor = "green", apiURL = "", statusCode = "") => {
    console.log(msg + " =>>>>>>>> " + new Date());
  };

  checkImportStatus = () => {
    return new Promise(async (resolve, reject) => {
      let importCheckUrl = `${process.env.CL_BASE_ENDPOINT}/api/imports?filter[q][status_eq]=in_progress`;
      await fetch(importCheckUrl, {
        headers: this.clAuthHeader(),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            this.logger(data.errors[0].detail);
            reject(data.errors[0].detail);
          }
          resolve(data.meta.record_count);
        });
    });
  };

  listAllSKUS = () => {
    return new Promise(async (resolve, reject) => {
      let importCheckUrl = `${process.env.CL_BASE_ENDPOINT}/api/skus/`;
      await fetch(importCheckUrl, {
        headers: this.clAuthHeader(),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.errors) {
            this.logger(data.errors[0].detail);
            reject(data.errors);
          }
          resolve(data);
        });
    });
  };
}

module.exports = Helper;
