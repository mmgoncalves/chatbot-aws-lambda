'use strict';

module.exports.authorization = (event, context, callback) => {

  if (event.queryStringParameters) {
    const mode = event.queryStringParameters["hub.mode"];
    const challenge = event.queryStringParameters["hub.challenge"];
    const verify_token = event.queryStringParameters["hub.verify_token"];

    if (mode === "subscribe" && verify_token === "secrettoken") {
      const response = {
        statusCode: 200,
        body: challenge
      };

      callback(null, response);
    }
  } else {
    const response = {
        statusCode: 401,
        body: JSON.stringify({
          input: event
        })
      };

      callback(null, response);
  }
};