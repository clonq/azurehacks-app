const _ = require('lodash');
const AudioContext = require('web-audio-api').AudioContext;

let audioContext = new AudioContext();

module.exports = function(context, wav) {
    context.log(`analyzing audio spectrum`);
    audioContext.decodeAudioData(wav, audioBuffer => {
        context.log(`channels: ${audioBuffer.numberOfChannels}`);
        context.log(`samplerate: ${audioBuffer.sampleRate}`);
        context.log(`length: ${audioBuffer.length}`);
        context.log(`duration: ${audioBuffer.duration}`);
        context.done();
    });
}
