var AWS = require("aws-sdk");
let awsConfig = {
    "region": "NONE",
    "endpoint": "http://localhost:8000",
    "accessKeyId": "pampam", "secretAccessKey": "pampam"
};
AWS.config.update(awsConfig);

let docClient = new AWS.DynamoDB.DocumentClient();

function scanTable(tableName){
    return new Promise(async  function(resolve,reject)
    {
        const params = {
            TableName: tableName,
        };
        let scanResults = [];
        let items;
        do{
            items =  await docClient.scan(params).promise();
            items.Items.forEach((item) => scanResults.push(item));
            params.ExclusiveStartKey  = items.LastEvaluatedKey;
        }while(typeof items.LastEvaluatedKey != "undefined");
        resolve(scanResults)
    })
}
var global;

var dataPromise = scanTable("Errores");
dataPromise.then(function(data){
    global=data;
    console.log(global);
});

console.log(global);