import express from 'express';

const app = express();
app.use(express.json());

app.post('/payments', (req, res) => {
  const payment = req.body;
  console.log('Received payment:', payment);
  res.status(201).send({ message: 'Payment processed successfully' });
});

app.listen(8001, () => {
  console.log('Payment service is running on port 8001');
});
