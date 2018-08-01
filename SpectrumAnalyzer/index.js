const _ = require('lodash');
const AudioContext = require('web-audio-api').AudioContext;

let audioContext = new AudioContext();

module.exports = function(context, wav) {
    context.log(`analyzing audio spectrum`);
    audioContext.decodeAudioData(wav, audioBuffer => {
    console.log(`channels: ${audioBuffer.numberOfChannels}`);
    console.log(`samplerate: ${audioBuffer.sampleRate}`);
    console.log(`length: ${audioBuffer.length}`);
    console.log(`duration: ${audioBuffer.duration}`);
    context.done();
}
