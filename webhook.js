'use strict';

var request = require('request');

module.exports.execute = (event, context, callback) => {

  const data = JSON.parse(event.body);
  
  if (data && data.object === 'page') {

    data.entry.forEach(function(entry) {
      const pageID = entry.id;
      const timeOffEvent = entry.time;

      entry.messaging.forEach(function(event) {
        if (event.message) {
          messageManager(event);
        } else if (event.postback && event.postback.payload) {
          switch (event.postback.payload) {
            case "button_start":
              sendTextMessage(event.sender.id, "Como posso ajudar? Escolha uma das opçoes abaixo");
              sendFirstMenu(event.sender.id);
              break;
            default:
          }
        }
      });
    });    
  } 
  
  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: 'Go Serverless v1.0! Your function executed successfully!',
      input: event
    }),
  };

  callback(null, response);
};

const sendFirstMenu = (recipientId) => {
  var messageData = {
    recipient: {
      id: recipientId
    },

    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: "O que vc procura?",
          buttons: [
            {
              type: "web_url",
              url: "https://www.google.com",
              title: "Acesse nosso site"
            },
            {
              type: "postback",
              title: "Preço da entrada",
              payload: "click_price"
            },
            {
              type: "postback",
              title: "Banda de hoje",
              payload: "click_band"
            }
          ]
        }
      }
    }
  }

  callSendAPI(messageData);
};

const messageManager = (event) => {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const message = event.message;

  console.log('MENSAGEM 2: ', message);

  const messageID = message.mid;
  const messageText = message.text;
  const attachments = message.attachments;

  if (messageText) {
    switch(messageText) {
      case 'oi':
        sendTextMessage(senderID, 'Oi, tudo bem com vc?');
        break;
      case 'ola':
        sendTextMessage(senderID, 'Ola, como vai?');
        break;
      default:

    }
  } else if (attachments) {
    console.log('attachments');
  }
};

const sendTextMessage = (recipientId, messageText) => {
  const messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
};

const callSendAPI = (messageData) => {
  request({
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAACEjCDreAsBAAWQvZBHy1lDYdt2NZBvkNzQLYM8Gt0pv2GeR8XcqrV1pKZCtTGkJm6QcAuk5kv1KfCJDTrnxBHAvBgFh4KrCbuGFXfIy8jeFucjekRvjr2XkQaPznanJsUPY2DLCqJHBCYZCAmmIH9KKJbUJE8PhlSEn9xi3AZDZD' },
    method: 'POST',
    json: messageData
  }, (error, resp, body) => {

    if (!error && resp.statusCode == 200) {
      console.log('msg enviada com sucesso', body);
    } else {
      console.log('Não foi possivel enviar msg', error);
    }
  });
};