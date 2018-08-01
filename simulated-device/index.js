'use strict';

const chalk = require('chalk');
const azureStorage = require('azure-storage');
const blobService = azureStorage.createBlobService();
const intoStream = require('into-stream');

var connectionString = 'HostName=azurehacks.azure-devices.net;DeviceId=azurehacksDevice;SharedAccessKey=UFYOeKQdkKWknPAFqjauJKUO+43b127z4nOVoVoDwxY=';

var Mqtt = require('azure-iot-device-mqtt').Mqtt;
var DeviceClient = require('azure-iot-device').Client
var Message = require('azure-iot-device').Message;

var client = DeviceClient.fromConnectionString(connectionString, Mqtt);

var intervalLoop = null;

function uploadRecording() {
  let containerName = 'buzz';
  let blobName = `${Date.now()}`;
  let buffer = require('fs').readFileSync('sample.mp4');
  let stream = intoStream(buffer);
  let streamLength = buffer.length;

  blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {
    if(err) console.log(err);
    else console.log(`uploaded ${parseFloat(streamLength/(1024*1024)).toFixed(2)} Mb...`)
      process.exit();
  });
}

uploadRecording();
