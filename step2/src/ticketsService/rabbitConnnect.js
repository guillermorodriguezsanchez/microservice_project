const amqp = require('amqplib');
const { addEvent } = require('./controllers/events');


//step 1 : Connect to the rabbitmq server
//step 2 : Create a new channel on that connection
//step 3 : Create the exchange
//step 4 : Publish the message to the exchange with a routing key

class Tickets {
    channel;
    
    async createChannel() {
      const connection = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
      this.channel = await connection.createChannel();
    }

    async createChannelT() {
      const connectionT = await amqp.connect('amqp://guest:guest@rabbitmq:5672');
      this.channelT = await connectionT.createChannel();
      await  this.channelT.assertQueue("Tickets");
    }
  
    

    async publishMessage(evento) {
      if (!this.channelT) {
        await this.createChannelT();
      }

      this.channelT.sendToQueue(
        "Tickets",
        Buffer.from(
            evento
        )
    );
  
      console.log(
        `add new  Event is sent to exchange ${evento}`
      );
    }
    
    async consumeMessages(name_event) {
      console.log(name_event);
      if (!this.channel) {
        await this.createChannel();
      }
      var eventfromrabbit;
    
      await this.channel.consume("Events", (data) => {
        eventfromrabbit = JSON.parse(data.content.toString());
        console.log("nameEv:", eventfromrabbit.name);
        addEvent(eventfromrabbit.name, eventfromrabbit.date);
      });

      
    }
    
    processEvent(event, name_event) {
      for (let i in event) {
        if (event[i].name == name_event) {
          console.log(`event: ${event[i].name}`);
          return true;
        }
      }
      console.log(`Event with name ${name_event} not found`);
      return false;
    }
    
  }



module.exports = Tickets;