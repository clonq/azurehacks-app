const _ = require('lodash');
const AudioContext = require('web-audio-api').AudioContext;

module.exports = function(context) {
    context.log(`analyzing audio spectrum`);
    let audioContext = new AudioContext();
    context.log(context.bindings.wav);
}
