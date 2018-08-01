const _ = require('lodash');
const AudioContext = require('web-audio-api').AudioContext;
const fft = require('fft-js').fft;
const fftUtil = require('fft-js').util;
const sgMail = require('@sendgrid/mail');

module.exports = function(context) {
    context.log(`analyzing audio spectrum`);
    let audioContext = new AudioContext();
    audioContext.decodeAudioData(context.bindings.mp4, audioBuffer => {

        let signal = new Array(Math.pow(2, 16))
        for(i=0; i<signal.length; i++) {
            signal[i] = buf[i];
        }
        let phasors = fft(signal);
        let magnitudes = fftUtil.fftMag(phasors); 
        let frequencies = fftUtil.fftFreq(phasors, audioBuffer.sampleRate);

        let data = []
        let precision = 10;
        for(i=0; i<frequencies.length; i++) {
            data.push({
                freq: frequencies[i],
                amp: magnitudes[i]
            });
        }

        let completeSpecter = _.groupBy(data, it => precision * Math.floor(it.freq/precision));
        let specter = _.mapValues(completeSpecter, it => {
            let amps = it.map(o => Math.round(Number(o.amp)));
            let ret = amps.reduce(function (a, b) { return Math.max(a, b) });
            return ret;
        });
        delete specter['0'];
        let topFreq = _.values(specter).sort().slice(-1).map(amp => {
            let freq = Number(_.findKey(specter, (val, key) => {
                return val === amp;
            }));
            return {
                freq: freq,
                amp: amp
            }
        });
        let hiveStatus = analyze(topFreq);
        sendmail(`status: ${hiveStatus}`);
        context.done();
    });
}

function analyze(freq) {
    let ret = '';
    if(around(freq, 250)) ret += 'healthy swarm.';
    if(around(freq, 340)) ret += 'queen free.';
    if(around(freq, 450)) ret += 'queen confinement.';
    if(around(freq, 3000)) ret += 'potential threat.';
    if(range(freq, 225, 285)) ret += 'fanning.';
    return ret;
}

function around(actual, expected) {
    let precision = 10//Hz;
    return ((actual > (expected - precision)) && (actual < (expected + precision)));
}

function range(actual, from, to) {
    let precision = 10//Hz;
    return ((actual > (from - precision)) && (actual < (to + precision)));
}

function sendmail(text) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: process.env.SENDGRID_TO,
      from: process.env.SENDGRID_FROM,
      subject: 'hive status',
      text: text
    };
    sgMail.send(msg);
}
