const mongoose = require('mongoose');
const app = require('./app');
const startSerialListener = require('./utils/serialListener');
const { setRFIDGetter } = require('./controller/readRifdController');

const PORT = 5000;


// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/arduinoDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('✅ Connected to MongoDB');

  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });

}).catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});
