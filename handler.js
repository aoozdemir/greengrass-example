'use-strict';

const ggSdk = require('aws-greengrass-core-sdk');

const iotClient = new ggSdk.IotData();
const util = require('util');

let counter = 0;

module.exports.handler = (event, context, callback) => {
  counter++;

  try {
    iotClient.publish({
      topic: 'sample/counter',
      payload: JSON.stringify({
        message: util.format('Sent from Greengrass Core. Invocation Count: %s', counter)
      }),
      queueFullPolicy: 'AllOrError',
    }, () => {
      callback(null, true);
    });
  } catch (error) {
    console.log(error);
  }

  return;
};
