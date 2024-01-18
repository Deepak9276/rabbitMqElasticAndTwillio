const amqp = require('amqplib');

var channel, connection;  //global variables
const queueName = 'create_data';
const rabbitMqUrl = process.env.rabbitMq;
exports.send=async()=> {
    try {
        connection = await amqp.connect(rabbitMqUrl);
        channel    = await connection.createChannel()
        await channel.assertQueue(queueName, { durable: true });
        
    } catch (error) {
        console.log(error)
    }
  }

  exports.sendData =async (data)=> {
    // send data to queue
    return await channel.sendToQueue('create_data', Buffer.from(JSON.stringify(data)),{deliveryMode:true});
    // close the channel and connection
    // await channel.close();
    // await connection.close(); 
}