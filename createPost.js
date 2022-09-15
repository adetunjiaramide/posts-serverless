const  { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');
const TABLENAME = process.env.AppTableName;
const { marshall } = require("@aws-sdk/util-dynamodb");


module.exports.createPost = async(event) => {
    
    const client = new DynamoDBClient();
    const params = {
        TableName: TABLENAME,
        Item: marshall({
            post_id: event.post_id,
            title: event.title
        })
    }

    try {
        const data = await client.send(new PutItemCommand(params))
        console.log(data)
        return response = {
            statusCode: 200,
            body: data
        }
    } catch (err) {
        console.log(err)
        return response = {
            statusCode: 400,
            body: err
        }
    }
}