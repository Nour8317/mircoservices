import express from 'express';

const app = express();
app.use(express.json());

import { Kafka } from 'kafkajs'; 

const kafka = new Kafka({
  clientId: "payment-service",
  brokers: ['localhost:9092']
});

const producer = kafka.producer();

const connectToKafka = async () => {
  await producer.connect();
  console.log("Connected to Kafka successfully.");
}


app.post('/payments', (req, res) => {
  const payment = req.body;
  console.log('Received payment:', payment);
  res.status(201).send({ message: 'Payment processed successfully' });
});

app.listen(8001, () => {
  connectToKafka().catch(console.error);
  console.log('Payment service is running on port 8001');
});
