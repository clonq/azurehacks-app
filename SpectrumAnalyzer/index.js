// const storage = require('azure-storage');
// const blobService = storage.createBlobService();

// module.exports = (context, myBlob) => {
module.exports = (context) => {
    // const blobName = context.bindingData.name;
    // const contentType = context.bindingData.properties.contentType;

    // context.log(`analyzing audio spectrum for ${contentType}: ${blobName}`);

    context.log(`analyzing audio spectrum`);

    context.res = {
        status: 200,
        body: "spectrum analyzer output"
    };
    context.done();
};
