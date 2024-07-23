const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Conecte ao MongoDB
mongoose.connect('mongodb+srv://marcomaciel:Valhalla1@cluster0.reumxgk.mongodb.net/MachineLearning', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Defina um esquema e modelo baseado na coleção FullOrders
const fullOrdersSchema = new mongoose.Schema({
  shop_id: Number,
  customer_id: Number,
  user_id: Number,
  type: String,
  code: Number,
  token: String,
  quantity: Number,
  total: Number,
  subtotal: Number,
  discount: Number,
  tax: Number,
  cost: Number,
  status: String,
  payment_status: String,
  fulfillment_status: String,
  device: String,
  extra: {
    utm: String,
    user_agent: String,
    customer_ip: String,
    schedule_delivery: mongoose.Schema.Types.Mixed,
  },
  send_email: Boolean,
  is_subscription: Number,
  checkout_started_at: Date,
  created_at: Date,
  updated_at: Date,
});

const FullOrder = mongoose.model('FullOrder', fullOrdersSchema, 'Modelo Churn');

// Rota para buscar os 20 primeiros itens
app.get('/api/items', async (req, res) => {
  try {
    console.log('Fetching items from database...');
    const items = await FullOrder.find().limit(50);
    console.log('Items fetched:', items);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
