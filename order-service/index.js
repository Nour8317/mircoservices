import express from 'express';
const app = express();
app.use(express.json());


app.post('/orders', (req, res) => {
  const order = req.body;
  console.log('Received order:', order);
  res.status(201).send({ message: 'Order created successfully' });
});

app.listen(8000, () => {
  console.log('Order service is running on port 8000');
});