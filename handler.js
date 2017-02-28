'use strict';

module.exports.authorization = (event, context, callback) => {

  console.log('Q1', event.queryStringParameters);
  console.log('Q2', event.queryStringParameters["hub.mode"]);
    
  if (event.queryStringParameters) {
    const mode = event.queryStringParameters["hub.mode"];
    const challenge = event.queryStringParameters["hub.challenge"];
    const verify_token = event.queryStringParameters["hub.verify_token"];

    if (mode === "subscribe" && verify_token === "secrettoken") {
      // console.log("Validação OK.");
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

    

/*
    if (event.queryStringParameters && event.queryStringParameters.hub.mode === 'subscrible' && event.queryStringParameters.hub.verify_token === 'secret') {
      const response = {
        statusCode: 200,
        body: JSON.stringify({
          input: event
        })
      };
      
    } else {
      console.log('Validação falhou');
      const response = {
        statusCode: 401,
        body: JSON.stringify({
          input: event
        })
      };
    }

  */

  
};