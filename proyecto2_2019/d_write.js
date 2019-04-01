var AWS = require("aws-sdk");
let awsConfig = {
    "region": "NONE",
    "endpoint": "http://localhost:8000",
    "accessKeyId": "pampam", "secretAccessKey": "pampam"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

let save = function () {

    var input = {
        "Artist": "britney2","SongTitle":"radar2", "created_by": "aa", "created_on": new Date().toString(),
        "updated_by": "clientUser", "updated_on": new Date().toString(), "is_deleted": false
    };
    var params = {
        TableName: "Music",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("Music::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("Music::save::success" );                      
        }
    });
}

save();