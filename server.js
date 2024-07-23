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
const ModeloChurnSchema = new mongoose.Schema({
  _id: Number,
  shop_id: Number,
  'Probabilidade de Cancelamento': Number,
});

const ModeloChurn = mongoose.model('ModeloChurn', ModeloChurnSchema, 'Modelo Churn');

// Rota para buscar os 20 primeiros itens
app.get('/api/items', async (req, res) => {
  try {
    console.log('Fetching items from database...');
    const items = await ModeloChurn.find().limit(50);
    const formattedItems = items.map(item => ({
      ...item.toObject(),
      'Probabilidade de Cancelamento': (item['Probabilidade de Cancelamento'] * 100).toFixed(2) + '%'
    }));
    console.log('Items fetched:', formattedItems);
    res.json(formattedItems);
    res.json(items);
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
