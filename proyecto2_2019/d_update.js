var AWS = require("aws-sdk");
let awsConfig = {
    "region": "NONE",
    "endpoint": "http://localhost:8000",
    "accessKeyId": "pampam", "secretAccessKey": "pampam"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let modify = function () {

    
    var params = {
        TableName: "Music",
        Key: { "Artist": "Acme Band" ,"SongTitle":"Happy Day"},
        UpdateExpression: "set updated_by = :byUser, is_deleted = :boolValue",
        ExpressionAttributeValues: {
            ":byUser": "updateUser",
            ":boolValue": true
        },
        ReturnValues: "UPDATED_NEW"

    };
    docClient.update(params, function (err, data) {

        if (err) {
            console.log("Music::update::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("Music::update::success "+JSON.stringify(data) );
        }
    });
}

modify();