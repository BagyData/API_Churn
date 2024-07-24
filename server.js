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

// Conexão ao banco de dados MicroServices para a coleção de seguidores
const microServicesDb = mongoose.createConnection('mongodb+srv://marcomaciel:Valhalla1@cluster0.reumxgk.mongodb.net/MicroServices', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const InstagramScrapperSchema = new mongoose.Schema({
  username: { type: String, default: '' },
  user_url: { type: String, default: '' },
  bio_link: { type: String, default: '' },
  bio: { type: String, default: '' },
  followees: { type: Number, default: 0 },
  followers: { type: Number, default: 0 },
  has_public_story: { type: Boolean, default: false },
  is_business_account: { type: Boolean, default: false },
  is_private: { type: Boolean, default: false },
  is_verified: { type: Boolean, default: false },
  media_count: { type: Number, default: 0 },
  register_date: { type: Date, default: Date.now },
  is_new_user: { type: Boolean, default: true },
});


const InstagramScrapper = microServicesDb.model('InstagramScrapper', InstagramScrapperSchema, 'InstagramScrapper');

// Defina um esquema e modelo baseado na coleção FullOrders
const ModeloChurnSchema = new mongoose.Schema({
  _id: Number,
  shop_id: Number,
  'Probabilidade de Cancelamento': Number,
});

const ModeloChurn = mongoose.model('ModeloChurn', ModeloChurnSchema, 'Modelo Churn');

// Rota para buscar os 50 primeiros itens
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
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ message: error.message });
  }
});

// Rota para buscar seguidores ordenados por register_date de forma descendente
app.get('/api/seguidores', async (req, res) => {
  try {
    console.log('Fetching seguidores from database...');
    const seguidores = await InstagramScrapper.find().sort({ register_date: -1 });
    console.log('Seguidores fetched:', seguidores);
    res.json(seguidores);
  } catch (error) {
    console.error('Error fetching seguidores:', error);
    res.status(500).json({ message: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
