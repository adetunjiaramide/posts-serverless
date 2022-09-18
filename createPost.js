const  { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const TABLENAME = process.env.AppTableName;
const { marshall } = require("@aws-sdk/util-dynamodb");


module.exports.createPost = async(event) => {

    console.log('event', event);
    const client = new DynamoDBClient();
    let parseData = JSON.parse(event.body);
    let response = {}
    const params = {
        TableName: TABLENAME,
        Item: marshall({
            post_id: parseData.post_id,
            title: parseData.title
        })
    }

    try {
        const data = await client.send(new PutItemCommand(params))
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