// const storage = require('azure-storage');
// const blobService = storage.createBlobService();

module.exports = function (context, req) {
    // const blobName = context.bindingData.name;
    // const contentType = context.bindingData.properties.contentType;

    context.log(`analyzing audio spectrum`);

    context.res = {
        status: 200,
        body: "spectrum analyzer output"
    };
    context.done();
};
