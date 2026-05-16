import express from 'express';
import { Kafka } from 'kafkajs'; 

const app = express();
app.use(express.json());


const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const connectToKafka = async () => {
  await producer.connect();
  console.log("Connected to Kafka successfully.");
}


app.post('/payments', async (req, res) => {
  const payment = req.body;
  console.log('Received payment:', payment);

  await producer.send({
    topic: 'payment-successful',
    messages: [
      { value: JSON.stringify(payment) }
    ]
  });

  res.status(201).send({ message: 'Payment processed successfully' });
});

app.listen(8001, () => {
  connectToKafka().catch(console.error);
  console.log('Payment service is running on port 8001');
});
