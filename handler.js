'use strict';

module.exports.authorization = (event, context, callback) => {
    const response = {
      statusCode: 200,
      body: {},
    };

    if(event.queryStringParameters && event.queryStringParameters.hub.mode === 'subscrible' && event.queryStringParameters.hub.verify_token === 'secret') {
      response.body =  JSON.stringify( event.queryStringParameters.hub.challenge );
    } else {
      console.log('Validação falhou');
      response.statusCode = 401;
    }

  

  callback(null, response);
};