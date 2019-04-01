var AWS = require("aws-sdk");
let awsConfig = {
    "region": "NONE",
    "endpoint": "http://localhost:8000",
    "accessKeyId": "pampam", "secretAccessKey": "pampam"
};

AWS.config.update(awsConfig);
let docClient = new AWS.DynamoDB.DocumentClient();
//errores
function create_Error(number,wrong) {

    var input = {
        "No":number,"Descripcion":wrong.descripcion,"Linea":wrong.Linea,"Columna":wrong.columna,
        "Archivo":wrong.archivo,"Tipo":wrong.tipo,"creado":new Date().toString()
    };
    var params = {
        TableName: "Errores",
        Item:  input
    };
    docClient.put(params, function (err, data) {

        if (err) {
            console.log("Errores::save::error - " + JSON.stringify(err, null, 2));                      
        } else {
            console.log("Errores::save::success" );                      
        }
    });
}

module.exports = create_Error;



