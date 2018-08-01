const _ = require('lodash');
const AudioContext = require('web-audio-api').AudioContext;

module.exports = function(context) {
    context.log(`analyzing audio spectrum`);
    let audioContext = new AudioContext();
    audioContext.decodeAudioData(context.bindings.mp4, audioBuffer => {
        context.log(`channels: ${audioBuffer.numberOfChannels}`);
        context.log(`samplerate: ${audioBuffer.sampleRate}`);
        context.log(`length: ${audioBuffer.length}`);
        context.log(`duration: ${audioBuffer.duration}`);
        context.done();
    });
}
