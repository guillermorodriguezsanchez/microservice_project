const amqp = require('amqplib');


//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class Eventos {
    channel;

    async createChannel() {
      const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
      this.channel = await connection.createChannel();
      await  this.channel.assertQueue("Events");
    }

    async createChannelT() {
      const connectionT = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
      this.channelT = await connectionT.createChannel();
      await  this.channelT.assertQueue("Tickets");
    }
    
    async publishMessage(eventos) {
      if (!this.channel) {
        await this.createChannel();
      }

      this.channel.sendToQueue(
        "Events",
        Buffer.from(
            JSON.stringify(eventos)
        )
    );
  
      console.log(
        `add new  Event is sent to exchange ${eventos}`
      );
    }

    async consumeMessages() {
      
      if (!this.channelT) {
        await this.createChannelT();
      }
      
      var eventfromrabbit;
    
      await this.channelT.consume("Tickets", (data) => {
        console.log("data:",data.content.toString());
        eventfromrabbit = data.content.toString();
        
      });

      console.log(eventfromrabbit);
      return eventfromrabbit;

      
    }





  }



module.exports = Eventos;