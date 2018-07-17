// const storage = require('azure-storage');
// const blobService = storage.createBlobService();

// module.exports = function (context, req) {
//     // const blobName = context.bindingData.name;
//     // const contentType = context.bindingData.properties.contentType;

//     context.log(`analyzing audio spectrum`);

//     context.res = {
//         status: 200,
//         body: "spectrum analyzer output"
//     };
//     context.done();
// };

const SubscriptionValidationEvent = "Microsoft.EventGrid.SubscriptionValidationEvent";
const StorageBlobCreatedEvent = "Microsoft.Storage.BlobCreated";
const CustomTopicEvent = "Contoso.Items.ItemReceivedEvent";

module.exports = function (context, req) {

    var parsedReq = JSON.parse(req['rawBody']);
    context.log('request:' + parsedReq);

    parsedReq.forEach(eventGridEvent => {
        var eventData = eventGridEvent.data; 
        // Deserialize the event data into the appropriate type based on event type using if/elif/else
        if (eventGridEvent.eventType == SubscriptionValidationEvent) {
            context.log('Got SubscriptionValidation event data, validationCode: ' + eventData.validationCode + ', topic: ' + eventGridEvent.topic); 
            context.res = {
                validationResponse: eventData.validationCode
            };
        } else if (eventGridEvent.eventType == StorageBlobCreatedEvent) {
            context.log('Got Blobcreated event data, blob URI ' + eventData.url);
        } else if (eventGridEvent.eventType == CustomTopicEvent) {
            context.log('Got ContosoItemReceived event data, item SKU ' + eventData.itemSku);
        }
    });

    context.done();
    

    // const blobName = context.bindingData.name;
    // const contentType = context.bindingData.properties.contentType;

    // console.log(`analyzing audio spectrum, blobName: ${blobName}, contentType: ${contentType}`);
    // // context.log(`analyzing audio spectrum, blobName: ${blobName}, contentType: ${contentType}`);

    // context.res = {
    //     status: 200,
    //     body: "spectrum analyzer output"
    // };
};




