module.exports = function (context, req) {
    context.log('analyzing audio spectrum...');
    context.res = {
        status: 200,
        body: "spectrum analyzer output"
    };
    context.done();
};
