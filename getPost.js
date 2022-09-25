const  { DynamoDBClient, ScanCommand } = require('@aws-sdk/client-dynamodb');
const TABLENAME = process.env.AppTableName;
const { unmarshall } = require("@aws-sdk/util-dynamodb");


module.exports.getPost = async(event) => {

    console.log('event', event);
    const client = new DynamoDBClient();
    let response = {}

    const params = {
        TableName: TABLENAME
    }

    try {
        const data = await client.send(new ScanCommand(params))
        console.log(unmarshall(data.Items));
        response = {
            statusCode: 200,
            body: JSON.stringify(data)
        }
        
    } catch (err) {
        console.log(err)
        response = {
            statusCode: 400,
            body: err
        }
    }
    return response;
}