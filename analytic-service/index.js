import {Kafka} from 'kafkajs';

const kafka = new Kafka({
  clientId: 'analytic-service',
  brokers: ['localhost:9092']
});

const consumer = kafka.consumer({ groupId: 'analytic-group' });

const run = async () => {
  await consumer.connect();
  console.log("Connected to Kafka successfully. Subscribing to topics...");
    await consumer.subscribe({ topic: 'payment-successful', fromBeginning: true });
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const payment = JSON.parse(message.value.toString());
        console.log('Received payments:', payment);
        
      }
    });
}

run().catch(console.error);