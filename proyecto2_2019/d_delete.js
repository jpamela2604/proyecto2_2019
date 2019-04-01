var AWS = require("aws-sdk");
let awsConfig = {
    "region": "NONE",
    "endpoint": "http://localhost:8000",
    "accessKeyId": "pampam", "secretAccessKey": "pampam"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let remove = function () {

    var params = {
        TableName: "Music",
        Key: {
            "Artist": "britney",
            "SongTitle":"radar"
        }
    };
    docClient.delete(params, function (err, data) {

        if (err) {
            console.log("Music::delete::error - " + JSON.stringify(err, null, 2));
        } else {
            console.log("Music::delete::success");
        }
    });
}

remove();   