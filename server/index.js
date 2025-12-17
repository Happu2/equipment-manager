const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const equipmentRoutes = require('./routes/equipmentRoutes');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/equipment', equipmentRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
