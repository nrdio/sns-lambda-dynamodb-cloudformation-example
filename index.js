const AWS = require("aws-sdk");
const uuid = require("uuid");
AWS.config.update({region: "us-west-2"});

// Create DynamoDB document client
const dynamoDb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
    try {
        // Extract message
        const message = JSON.parse(event.Records[0].Sns.Message);

        // Prepare account item
        const accountItem = {
            TableName: "Account",
            Item: {
                id: uuid.v1(),
                name: message.name,
                iban: message.iban
            }
        };

        // insert account in DynamoDB
        await dynamoDb.put(accountItem).promise();

        return "Registered new account with id " + accountItem.Item.id;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
